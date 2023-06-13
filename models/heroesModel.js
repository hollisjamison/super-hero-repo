const {heroesModel} = require('./index')

const getAllHeroes = async () => {
    const heroesData = await heroesModel.findAll()

    return heroesData
}

const getOneHero = async (searchSlug) => {
    const foundHero = await heroesModel.findOne({ where: { slug: searchSlug } })

    return foundHero
}

const addHero = async (newHero) => {
    const addedHero = await heroesModel.create(newHero)

    return addedHero
}

module.exports = {addHero, getOneHero, getAllHeroes}