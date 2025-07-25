require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASS || '',
  DB: process.env.DB_NAME || 'shop_db',
  dialect: 'mysql',
};
