const username = 'yangeok'
const sharedLink = 'http://localhost:8080'

async function generateIframe(data) {
  let url = new URL(sharedLink)
  url.pathname = '/trusted/' + data.ticket + url.pathname

  let iframe = document.createElement('iframe')
  iframe.src = url.href
  iframe.width = '800px'
  iframe.height = '600px'

  document.getElementById('containerDiv').appendChild(iframe)
}

window.onload = async () => {
  const body = new URLSearchParams()
  body.append('username', username)
  body.append('share_link', sharedLink)

  const result = await fetch(`${sharedLink}/api`, {
    method: 'POST',
    body
  })

  const data = await result.json()
  document.getElementById('response').innerText = JSON.stringify(data)

  if (data.ticket === '-1') return
  await generateIframe(data)
}