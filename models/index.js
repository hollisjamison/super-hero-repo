const Sequelize = require('sequelize')
const { heroesTemplate } = require ('./heroesTemplate')
const configs = require('../config/sequelize')

const environment = process.env.NODE_ENV || 'development'
const config = configs[environment]
const { database, username, password, host, dialect } = config

const connection = new Sequelize(database, username, password, {host, dialect})

const heroesModel =  heroesTemplate(connection, Sequelize)

module.exports = { heroesModel }