const heroesData = require('./heroesData')

const getAllHeroes = () => {
    return heroesData
}

const getOneHero = (cleansedSlug) => {
    const foundHero = heroesData.find((hero) => {
        return hero.slug === cleansedSlug
    })

    return foundHero
}

const addHero = (hero) => {
    heroesData.push(hero)
    return heroesData
}

module.exports = { getAllHeroes, getOneHero, addHero } 