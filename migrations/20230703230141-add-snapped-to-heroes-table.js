'use strict';
const models = require('../models/index')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('heroes', 'snapped', { type: Sequelize.BOOLEAN , defaultValue: 0})

    return models.heroesModel.bulkCreate([
      { slug: 'spider-man', snapped: true }
    ], { updateOnDuplicate: ['snapped'] })

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('heroes', 'snapped')
  }
};
