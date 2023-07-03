const express = require('express')
const { addHeroController, renderHeroesPageController, getOneHeroController, getAllHeroesController, verifySlug } = require('./controllers/controllers')

const app = express()

app.set('view engine', 'pug')

// GET: All heroes route
app.get('/api/heroes', getAllHeroesController)

// controller
app.get('/heroes', renderHeroesPageController)

// GET: Get ONE hero
app.get('/api/heroes/:slug', verifySlug, getOneHeroController)

// POST: Add one hero
app.post('/api/heroes', express.json(), addHeroController)

app.listen(1338, () => {
    console.log("Now listening on http://localhost:1338")
})
