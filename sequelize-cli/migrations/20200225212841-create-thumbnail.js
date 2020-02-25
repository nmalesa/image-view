'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Thumbnails', {
      thumbId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Thumbnails');
  }
};
