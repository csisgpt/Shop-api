const { Op } = require('sequelize');
const db = require('../models');

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, image, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: 'name, price and categoryId are required' });
    }

    const product = await db.Product.create({
      name,
      price,
      stock,
      image,
      categoryId,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all active products with pagination, filters and search
exports.getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    const where = { isActive: true };

    if (req.query.categoryId) {
      where.categoryId = req.query.categoryId;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      where.price = {};
      if (req.query.minPrice) where.price[Op.gte] = req.query.minPrice;
      if (req.query.maxPrice) where.price[Op.lte] = req.query.maxPrice;
    }

    if (req.query.search) {
      where.name = { [Op.like]: `%${req.query.search}%` };
    }

    const { rows, count } = await db.Product.findAndCountAll({
      where,
      include: [{ model: db.Category }],
      limit,
      offset,
    });

    res.json({
      products: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Update a product by id
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete a product by id
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
