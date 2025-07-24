const db = require('../models');
const { Sequelize } = require('sequelize');

// Place an order with transaction
exports.placeOrder = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, products } = req.body;
    if (!userId || !Array.isArray(products) || !products.length) {
      await transaction.rollback();
      return res.status(400).json({ message: 'userId and products are required' });
    }

    let total = 0;
    const orderItemsData = [];

    for (const item of products) {
      const product = await db.Product.findByPk(item.productId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }

      total += product.price * item.quantity;
      orderItemsData.push({ product, quantity: item.quantity });
    }

    const order = await db.Order.create({ userId, total }, { transaction });

    for (const { product, quantity } of orderItemsData) {
      await db.OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity,
        price: product.price,
      }, { transaction });

      await product.update({ stock: product.stock - quantity }, { transaction });
    }

    await transaction.commit();

    const createdOrder = await db.Order.findByPk(order.id, {
      include: [{
        model: db.OrderItem,
        include: [db.Product],
      }],
    });

    res.status(201).json(createdOrder);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

// Get all orders for the authenticated user
exports.getOrdersForUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await db.Order.findAll({
      where: { userId },
      include: [{
        model: db.OrderItem,
        include: [db.Product],
      }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'paid', 'shipped', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ status });
    res.json(order);
  } catch (err) {
    next(err);
  }
};
