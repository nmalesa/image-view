'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define('Thumbnail', {
    thumbId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
    thumb1: DataTypes.STRING,
    thumb2: DataTypes.STRING,
    thumb3: DataTypes.STRING,
    thumb4: DataTypes.STRING,
    thumb5: DataTypes.STRING
  }, {});
  Thumbnail.associate = function(models) {
    // associations can be defined here
    Thumbnail.belongsTo(models.Product);
  };
  return Thumbnail;
};
