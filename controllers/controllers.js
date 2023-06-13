const { getAllHeroes, getOneHero, addHero } = require('../models/heroesModel')

const verifySlug = (request, response, next) => {
        let { slug } = request.params

        if(!slug) return response.sendStatus(404)

        slug = slug.toLowerCase()

        next()
}

const getAllHeroesController = async (request, response) => {
    const heroesData = await getAllHeroes()

    return response.send(heroesData)
}

const renderHeroesPageController = (request, response) => {
    // access data from model
    const heroesData = getAllHeroes()

    // render the model data, with my view, and present to the user
    response.render('heroesView', { heroesData })
}

const getOneHeroController = async (request, response) => {
    // use model to find our hero
    const foundHero = await getOneHero(request.params.slug)

    // error checking, after you find the data
    if(!foundHero) return response.status(404).send("Hero was not found")

    return response.send(foundHero)
}

const addHeroController = async (request, response) => {
    // make sure that they have sent over a valid hero
    const { name, realname, firstappearance, slug } = request.body

    // we are going to create a new object from the data they sent for the hero
    if(!name || !realname || !firstappearance || !slug ) return response.status(400).send('You did not send a full hero object')

    let newHero = { name, realname, firstappearance, slug }

    // push that hero into our heroes data (This is the job of the model
    const newHeroes = await addHero(newHero)

    // we then send over a list of the new heroes list, with the new hero included
    return response.status(201).send(newHeroes)
}

module.exports = { renderHeroesPageController, getOneHeroController, getAllHeroesController, verifySlug, addHeroController }