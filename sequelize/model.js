const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  primaryImage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  videoEmbed: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

const Thumbnail = sequelize.define('thumbnail', {
  thumbId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  thumb1: {
    type: Sequelize.STRING
  },
  thumb2: {
    type: Sequelize.STRING
  },
  thumb3: {
    type: Sequelize.STRING
  },
  thumb4: {
    type: Sequelize.STRING
  },
  thumb5: {
    type: Sequelize.STRING
  }
});

module.exports = {Product, Thumbnail}
