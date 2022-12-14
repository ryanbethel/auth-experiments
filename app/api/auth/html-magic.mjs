import arcOauth from 'arc-plugin-oauth'
const checkAuth = arcOauth.checkAuth

export async function get(req) {
    const authenticated = checkAuth(req)
    if (authenticated) {
      return {
        json: { account: authenticated }
      }
    } else {
      return {
        session:{redirectAfterAuth:"/auth/html-magic"},
        location: "/auth/magic-login"
      }
    }
}