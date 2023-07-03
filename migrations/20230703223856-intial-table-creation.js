'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('heroes', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      name: { type: Sequelize.STRING },
      realname: { type: Sequelize.STRING },
      firstappearance: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')},
      deletedAt: { type: Sequelize.DATE }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('heroes')
  }
};
