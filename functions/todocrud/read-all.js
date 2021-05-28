/* Import faunaDB sdk */
const process = require('process')
require('dotenv').config();

const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const handler = async () => {
  console.log('Function `read-all` invoked')

  try {
    let result = await client.query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("Todo"))),
        query.Lambda(x => query.Get(x))
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    }
  }catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
