const port = require('get-port-sync')()
const request = require('supertest')
const server = require('../server')({ port })
const logger = require('../services/logger')

beforeAll(() => {
  logger.info('Running Test Suites ****************')
})

describe('System endpoint tests', () => {
  it('GET / route should return success version and name', async () => {
    const expectedResponse = {
      success: true,
      version: '1.0.0',
      name: 'lets-learn-git'
    }
    const { statusCode, body } = await request(server).get('/')
    expect(statusCode).toEqual(200)
    expect(body).toEqual(expectedResponse)
  })

  it('GET /health should return status UP and message OK', async () => {
    const { body } = await request(server).get('/health')
    expect(body.message).toBe('OK')
    expect(body.status).toBe('UP')
  })

  it('GET /unknown should return not found', async () => {
    const response = await request(server).get('/unknown')
    const expectedError = {
      error: 'Not Found'
    }
    expect(response.status).toBe(404)
    expect(response.body).toEqual(expectedError)
  })

  it('POST /graphql should return 200 and object', async () => {
    const response = await request(server).post('/graphql')
      .send({
        query: `{
        getAllUsers{
          _id
        }
      }`
      })

    const expectedBody = {
      data: {
        getAllUsers: [
          { _id: '2101-2015' },
          { _id: '2030-2015' }
        ]
      }
    }
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expectedBody)
  })
})

afterAll((done) => {
  logger.info('Ending Test Suites ****************')
  done()
  server.close()
})
