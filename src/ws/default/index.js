let arc = require('@architect/functions')

/**
 * append a timestamp and echo the message back to the connectionId
 */
exports.handler = async function ws(event) {
  const sessionDb = (await arc.tables()).magicsessions
  const connectionId = event.requestContext.connectionId
  let magicQueryId = JSON.parse(event.body).magicQueryId
  await sessionDb.put({id:magicQueryId, connectionId})

  return {statusCode: 200}
}