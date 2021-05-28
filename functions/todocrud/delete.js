/* Import faunaDB sdk */
// const process = require('process')
require('dotenv').config();

const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'delete' invoked. delete id: ${id}`)
  try {
    const response = await client.query(query.Delete(query.Ref(query.Collection('Todo'), id)))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
