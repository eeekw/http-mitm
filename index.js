const http = require('http')
const url = require('url')

const proxy = http.createServer((req, res) => {
  const { path } = url.parse(req.url)
  const options = {
    hostname: req.headers.host.split(':')[0],
    port: req.headers.host.split(':')[1] ?? 80,
    path,
    method: req.method,
    headers: req.headers,
  }
  const proxyReq = http.request(options, (proxyRes) => {
    console.log(
      `Proxy request to: ${options.hostname}:${options.port}${options.path}`
    )
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res)
  })

  proxyReq.on('error', (error) => {
    console.error(`Proxy request error: ${error.message}`)
    res.statusCode = 500
    res.end('Proxy request error')
  })

  req.pipe(proxyReq)
})

const port = 8888
proxy.listen(port, () => {
  console.log(`HTTP proxy server running on port ${port}`)
})
