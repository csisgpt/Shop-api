const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;

db.Category = require('./category')(sequelize);
db.Product = require('./product')(sequelize);
db.User = require('./user')(sequelize);
db.Order = require('./order')(sequelize);
db.OrderItem = require('./orderItem')(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
