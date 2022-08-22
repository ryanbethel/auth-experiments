export default function({html,state}) {
  return html`
<html>
<body>
<h1>Web sockets echo server demo</h1>
<main>Loading...</main>
<input id=message type=text placeholder="Enter message" autofocus>
<script>
window.WS_URL = '${state?.store?.wsUrl}'
window.magicQueryId = '${state?.store?.magicQueryId}'
</script>
<script type=module src=${state?.store?.wsScriptUrl}></script>
</body>
</html>`
  }