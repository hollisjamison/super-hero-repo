// step 1: import all our libraries
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it, afterEach, beforeEach, after, before } = require('mocha')

// step 2: pull in any functions we are testing
const { getAllHeroes } = require('../../models/heroesModel')
const { getAllHeroesController, getOneHeroController, addHeroController } = require('../../controllers/controllers')
const { heroesModel } = require('../../models/index.js')

// step 2b: pull in any mock data
const { heroesList, singleHero, invalidHero } = require('./heroes.mocks')

// step 3: tie sinonChai to chai, and import expect
chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - heroes', () => {
    let stubbedSend
    let sandbox
    let stubbedStatus
    let stubbedSendStatus
    let response
    let stubbedFindAll
    let stubbedFindOne
    let stubbedCreate

    before(() => {
        sandbox = sinon.createSandbox()

        stubbedSend = sandbox.stub()
        stubbedStatus = sandbox.stub()
        stubbedSendStatus = sandbox.stub()

        stubbedFindAll = sandbox.stub(heroesModel, 'findAll')
        stubbedFindOne = sandbox.stub(heroesModel, 'findOne')
        stubbedCreate = sandbox.stub(heroesModel, 'create')

        response = {
            send: stubbedSend,
            status: stubbedStatus,
            sendStatus: stubbedSendStatus
        }
    })

    // after()

    // beforeEach()

    afterEach(() => {
        sandbox.reset()
    })

    describe('getAllHeroesController', () => {
        it('retrieve a list of heroes from the database, then returns that list in res.send()', async () => {
            stubbedFindAll.returns(heroesList)

            await getAllHeroesController({}, response)

            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSend).to.have.been.calledWith(heroesList)
        })

        it('returns a 500 error when the database call does not work', async () => {
            stubbedFindAll.throws('ERROR!')

            await getAllHeroesController({}, response)

            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSendStatus).to.have.been.calledWith(500)
        })
    })

    describe('getOneHeroController', () => {
        it('finds the hero assoiated  with the slug, then calls res.send with that hero', async () => {
            stubbedFindOne.returns(singleHero)

            const request = { params: { slug: 'iron-man'} }

            await getOneHeroController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: {slug: 'iron-man'}})
            expect(stubbedSend).to.have.been.calledWith(singleHero)
        })

        it('Hero is not found in the database, so it returns a 404', async () => {
            stubbedFindOne.returns({})

            const request = { params: { slug: 'not-found'} }

            await getOneHeroController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({where: {slug: 'not-found'}})
            expect(stubbedSendStatus).to.have.been.calledWith(404)
        })

        it('When the database fails, it should return a 500 to the user', async () => {
            stubbedFindOne.throws('ERROR!')

            const request = { params: { slug: 'not-found'} }

            await getOneHeroController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({where: {slug: 'not-found'}})
            expect(stubbedSendStatus).to.have.been.calledWith(500)
        })
    })

    describe('addHeroController', () => {
        it('acepts a new hero and saves them, then returns it with a 201 status', async () => {
            stubbedCreate.returns(singleHero)
            stubbedStatus = sinon.stub().returns({ send: stubbedSend})

            response = { status: stubbedStatus }
            const request = { body: singleHero }

            await addHeroController(request, response)

            expect(stubbedCreate).to.have.been.calledWith(singleHero)
            expect(stubbedStatus).to.have.been.calledWith(201)
            expect(stubbedSend).to.have.been.calledWith(singleHero)
        })

        it('Lets the user know that they did not provide accurate data, when we dont have a full hero', async () => {
            stubbedStatus = sinon.stub().returns({ send: stubbedSend })

            response = { status: stubbedStatus }
            const request = { body: invalidHero}

            await addHeroController(request, response)

            expect(stubbedStatus).to.have.been.calledWith(400)
            expect(stubbedSend).to.have.been.calledWith('You did not send a full hero object')
        })
    })
})