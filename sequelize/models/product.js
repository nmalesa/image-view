module.exports = (sequelize, type) => {
  return sequelize.define('product', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(50),
      allowNull: false
    },
    primaryImage: {
      type: type.STRING,
      allowNull: false
    },
    videoEmbed: type.STRING,
    description: type.STRING
  });
};
