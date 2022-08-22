// get the web socket url from the backend
let url = window.WS_URL
let magicSocketId = window.magicSocketId

// all the DOM nodes this script will mutate
let main = document.getElementsByTagName('main')[0]
let msg = document.getElementById('message')

// setup the web socket
let ws = new WebSocket(url)
ws.onopen = open
ws.onclose = close
ws.onmessage = message
ws.onerror = console.log

setTimeout(() => ws.send(JSON.stringify({ magicQueryId }) ),1000)

// connect to the web socket
function open() {
  let ts = new Date(Date.now()).toISOString()
  main.innerHTML = `<p>waiting...</p>`
}

// report a closed web socket connection
function close() {
  main.innerHTML = 'Closed <a href=/magic-login >reload</a>'
}

// write a message into main
function message(e) {
  let msg = JSON.parse(e.data)
  console.log(msg.verified)
  if (msg.verified) {

    console.log("page should reload")
  setTimeout(()=>location.reload(),1000)
  }
}
