const app = require(`./app`)
const supertest = require(`supertest`)
const request = supertest(app)

let id

describe(`POST /people`, () => {
    test(`Added person returns added person`, async () => {
        const data = { name: `Trevor`, occupation: `IS`, age: 102 }
        const response = await request.post(`/people`).send(data)
        id = response.body._id

        expect(response.status).toBe(200)
        expect(response != null).toBe(true)
    })
    test(`Added person with wrong body returns error 500`, async () => {
        const data = { name: `Trevor`, occupation: `IS` }
        const response = await request.post(`/people`).send(data)

        expect(response.status).toBe(500)
        expect(response != null).toBe(true)
    })
})

describe(`GET /people`, () => {
    test(`Get all people returns all people `, async () => {
        const response = await request.get(`/people`)

        expect(response.status).toBe(200)

        expect(Array.isArray(response.body)).toBe(true)
        const containId = (response.body).some(i => i._id.includes(id))
        expect(containId).toBe(true)
    })
})

describe(`GET  /people/:id `, () => {
    test(`Get Specific Person with correct ID returns correct person`, async () => {
        const response = await request.get(`/people/${id}`)
        expect(response.status).toBe(200)
    })
    test(`Get Specific Person with wrong id returns error 404`, async () => {
        const response = await request.get(`/people/44`)
        expect(response.status).toBe(404)
    })
})

describe(`PUT /people/:id`, () => {
    test(`Changed person with existing ID returns Changed person`, async () => {
        const data = { name: `Trevor`, occupation: `Supreme Leader of the world`, age: 100000000 }
        const response = await request.put(`/people/${id}`).send(data)

        expect(response.status).toBe(200)
    })
    test(`Changed person with wrong body returns 500 error`, async () => {
        const data = { name: `Trevor`, occupation: `Supreme Leader of the world` }
        const response = await request.put(`/people/${id}`).send(data)

        expect(response.status).toBe(500)
    })
})

describe(`PATCH /people/:id`, () => {
    test(`1`, async () => {
        const data = { name: `Trevor`, occupation: `Supreme Leader of the world`, age: 100000000 }
        const response = await request.patch(`/people/${id}`).send(data)

        expect(response.status).toBe(200)
    })
})

describe(`DELETE /people/:id`, () => {
    test(`Delete Person with existing ID deletes the test person`, async () => {
        const response = await request.delete(`/people/${id}`)
        expect(response.status).toBe(200)
    })
    test(`Delete Person with wrong ID return 404 error`, async () => {
        const response = await request.delete(`/people/wrongID`)
        expect(response.status).toBe(404)
    })
})