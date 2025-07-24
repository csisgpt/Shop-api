const db = require('../models');

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const category = await db.Category.create({ name, slug });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Get all categories including their related products
exports.getCategoriesWithProducts = async (req, res, next) => {
  try {
    const categories = await db.Category.findAll({
      include: [{ model: db.Product }],
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
