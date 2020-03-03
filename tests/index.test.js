const port = require('get-port-sync')()
const request = require('supertest')
const server = require('../server')({ port })

describe('System endpoints', () => {
  it('Home route should return success version and name', async () => {
    const expectedResponse = {
      success: true,
      version: '1.0.0',
      name: 'lets-learn-git'
    }
    const { statusCode, body } = await request(server).get('/')
    expect(statusCode).toEqual(200)
    expect(body).toEqual(expectedResponse)
  })

  it('Health check should return status UP and message OK', async () => {
    const { body } = await request(server).get('/health')
    expect(body.message).toBe('OK')
    expect(body.status).toBe('UP')
  })
})

afterAll((done) => {
  done()
  server.close()
})
