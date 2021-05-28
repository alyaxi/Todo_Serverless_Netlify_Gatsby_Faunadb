/* Import faunaDB sdk */
const process = require('process')
require('dotenv').config();


const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const handler = async (event) => {
  const data = JSON.parse(event.body)
  const { id } = event
  console.log(`Function 'update' invoked. update id: ${id}`)
  try {
    const response = await client.query(query.Update(query.Ref(query.Collection('Todo'), id), { data }))
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
