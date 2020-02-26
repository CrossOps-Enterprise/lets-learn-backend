const port = require('get-port-sync')()
const request = require('supertest')

const server = require('../server')({ port })

describe('System endpoints', () => {
  it('should create a new post', async () => {
    const expectedResponse = {
      success: true,
      version: '1.0.0',
      name: 'lets-learn-git'
    }
    const { statusCode, body } = await request(server).get('/')
    expect(statusCode).toEqual(200)
    expect(body).toEqual(expectedResponse)
  })
})

afterAll((done) => {
  done()
  server.close()
})
