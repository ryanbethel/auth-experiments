import arc from '@architect/functions'
// View documentation at: https://docs.begin.com

export async function handler (event) {
  const payload = JSON.parse(event?.Records?.[0]?.Sns?.Message)
  const { magicId, magicQueryId, magicVerifyId ,email}=payload
  const sessionDb = (await arc.tables()).magicsessions
  await sessionDb.put({id:magicId, magicId, magicQueryId,magicVerifyId,email})
  await sessionDb.put({id:magicVerifyId, magicId, magicQueryId,magicVerifyId,email})
  console.log("Magic Link", `http://localhost:3333/auth/magic-verify?magic=${encodeURIComponent(magicVerifyId)}`)


  return
}
