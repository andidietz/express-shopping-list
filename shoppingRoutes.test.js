const request = require('supertest')

const app = require('./app')
let cats = require('./fakeDb')

let candy = {name: 'chocolate', price: 3.99}

beforeEach(function() {
    items.push(candy)
})

afterEach(function() {
    items.length = 0
})

describe('GET /items', function() {
    test('Gets a list of items', async function() {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([{name: 'chocolate', price: 3.99}])
    })
})

describe('GET /items/:name', function() {
    test('Get item details', async function() {
        const resp = await request(app).get(`/items/${candy.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({name: 'chocolate', price: 3.99})
    })

    test('Respond with 404 if Invalid Name', async function() {
        const resp = await request(app).get('/items/3')
        expect(resp.statusCode).toBe(404)
    })
})

describe('POST /items', function() {
    test('Creates a new item', async function() {
        const resp = await request(app)
            .post('/items')
            .send({
                name: 'chocolate', price: 3.99
            })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({added: {name: 'chocolate', price: 3.99}})
    })
})

describe('PATCH /items/:name', function() {
    test('Update item', async function() {
        const resp = await request(app)
            .patch(`/items/${candy.name}`)
            .send({
                name: 'chocolate frog',
                price: 2.20
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({update: {name: 'chocolate frog', price: 2.20}})
    })

    test('Response with 404 if Invalid Name', async function() {
        const resp = await request(app).patch(`/items/${3}`)
        expect(resp.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', function() {
    test('Delete item', async function() {
        const resp = await request(app).delete(`/items/${candy.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"message": "Deleted"})
    })

    test('Response with 404 if Invalid Name', async function() {
        const resp = await request(app).delete(`/items/${3}`)
        expect(resp.statusCode).toBe(404)
    })
})