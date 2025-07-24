const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
  };

  return Category;
};
