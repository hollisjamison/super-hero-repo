// step 1: import all our libraries
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')

// step 2: pull in any functions we are testing
const { getAllHeroes } = require('../../models/heroesModel')
const { getAllHeroesController, getOneHeroController, addHeroController } = require('../../controllers/controllers')
const { heroesModel } = require('../../models/index.js')

// step 2b: pull in any mock data
const { heroesList, singleHero } = require('./heroes.mocks')

// step 3: tie sinonChai to chai, and import expect
chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - heroes', () => {
    describe('getAllHeroesController', () => {
        it('retrieve a list of heroes from the database, then returns that list in res.send()', async () => {
            // step 1: stubbing any external API or database functions
            // (usually this is anything that is awaited)
            const stubbedFindAll = sinon.stub(heroesModel, 'findAll').returns(heroesList)
            const stubbedSend = sinon.stub()

            // step 2: define our output data
            const response = { send: stubbedSend }

            // step 3: run our function with the mock data
            await getAllHeroesController({}, response)

            // step 4: make assertions
            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSend).to.have.been.calledWith(heroesList)
        })
    })

    describe('getOneHeroController', () => {
        it('finds the hero asso iated  with the slug, then calls res.send with that hero', async () => {
            const stubbedSend = sinon.stub()
            const stubbedFindOne = sinon.stub(heroesModel, 'findOne').returns(singleHero)

            const response = { send: stubbedSend }
            const request = { params: { slug: 'iron-man'} }

            await getOneHeroController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: {slug: 'iron-man'}})
            expect(stubbedSend).to.have.been.calledWith(singleHero)
        })
    })

    describe('addHeroController', () => {
        it('acepts a new hero and saves them, then returns it with a 201 status', async () => {
            const stubbedSend = sinon.stub()
            const stubbedCreate = sinon.stub(heroesModel, 'create').returns(singleHero)
            const stubbedStatus = sinon.stub().returns({ send: stubbedSend})

            const response = { status: stubbedStatus }
            const request = { body: singleHero }

            await addHeroController(request, response)

            expect(stubbedCreate).to.have.been.calledWith(singleHero)
            expect(stubbedStatus).to.have.been.calledWith(201)
            expect(stubbedSend).to.have.been.calledWith(singleHero)
        })
    })
})