import arc from "@architect/functions"
let wsScriptUrl = arc.static('magic-ws.mjs')
let wsUrl = getWS()
//1. check temp session to see if it is verified
//2. if not 

export async function get(req) {
  const magicQueryId = req.query?.magic
  const session = req?.session
  const {redirectAfterAuth='/',...newSession}=session
  const sessionDb =    (await arc.tables()).magicsessions

  let sessionInfo
  try {
    sessionInfo = await sessionDb.get({id:session.magicId})
  } catch (e) {
    console.log(e)
  }
  if (sessionInfo?.verified) {

    //TODO: connect to app users 
    return {
      session: { ...newSession, account: { name: 'FIX THIS' ,email:sessionInfo.email} },
      location:redirectAfterAuth
    }
  } else {
      return {
        json: { wsUrl,wsScriptUrl,magicQueryId }
      }
  }
}

function getWS() {
  let env = process.env.ARC_ENV
  let testing = 'ws://localhost:3333'
  let staging = 'fixme: these urls are printed after create'
  let production = 'fixme: these urls are printed after create'
  if (env === 'testing')
    return testing
  if (env === 'staging')
    return staging
  if (env === 'production')
    return production
  return testing
}