const Sequelize = require('sequelize')
const { heroesTemplate } = require ('./heroesTemplate')

const connection = new Sequelize('h_heroesdb', 'h_heroes_user', 'superheroes', {host: '173.230.134.130', dialect: 'mysql'})

const heroesModel =  heroesTemplate(connection, Sequelize)

module.exports = { heroesModel }