const express = require('express');
const db = require('./models');

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use(errorHandler);

const start = async () => {
  try {
    await db.sequelize.sync();
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
};

start();

module.exports = app;
