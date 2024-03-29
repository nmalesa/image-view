module.exports = (sequelize, type) => {
  return sequelize.define('thumbnail', {
    thumbId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    thumb1: type.STRING,
    thumb2: type.STRING,
    thumb3: type.STRING,
    thumb4: type.STRING,
    thumb5: type.STRING,
    createdAt: {
      type: type.DATE,
      allowNull: false
    },
    updatedAt: type.DATE,
    productId: {
      type: type.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      },
      allowNull: false
    }
  });
};
