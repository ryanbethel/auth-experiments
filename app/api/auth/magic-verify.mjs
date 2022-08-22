import arc  from '@architect/functions'
export async function get(req){
  const sessionDb = (await arc.tables()).magicsessions
  const magicVerifyId = req.query.magic
  const sessionInfo = await sessionDb.get({ id: magicVerifyId })
  //1. Verify query param is volid
  //2. Change DB session to verified
  if (sessionInfo) {
    await sessionDb.put({...sessionInfo, id:sessionInfo.magicId, verified:true})
  }
  //3. Send WS message to the waiting session
  const connectionId = (await sessionDb.get({id:sessionInfo.magicQueryId})).connectionId
  console.log("connectionId from /auth/magic-verify",connectionId)
  await arc.ws.send({id:connectionId,payload:{verified:true}})
  //4. Show that session is verfied and screen can be closed
  return {
    html:`<p>Verified, Close window</p>`
  }
}