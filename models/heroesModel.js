const {heroesModel} = require('./index')

const getAllHeroes = async () => {
    try{
        const heroesData = await heroesModel.findAll()

        return heroesData
    } catch (error) {
        throw new Error('ERROR!')
    }

}

const getOneHero = async (searchSlug) => {
    try{
        const foundHero = await heroesModel.findOne({ where: { slug: searchSlug } })

        return foundHero
    } catch(error) {
        throw new Error('Database error')
    }

}

const addHero = async (newHero) => {
    const addedHero = await heroesModel.create(newHero)

    return addedHero
}

module.exports = {addHero, getOneHero, getAllHeroes}