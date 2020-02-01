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
