export default function({html,state}) {
    const user = state?.store?.account
    return html`<p>It's Magic ${ user?.email } is Logged In.</p>`
  }