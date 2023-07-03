'use strict';
const heroesData = require('../heroesData')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('heroes', heroesData)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('heroes')
  }
};
