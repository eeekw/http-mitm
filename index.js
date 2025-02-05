const http = require('http')
const http2 = require('http2')
const fs = require('fs')

// 创建 HTTP 服务器
const httpServer = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, HTTP!\n')
})

const httpPort = 80
httpServer.listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`)
})

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  allowHTTP1: true,
}

// 创建 HTTPS 服务器
const httpsServer = http2.createSecureServer(options, (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, HTTPS/1.x and HTTPS/2!\n')
})

const httpsPort = 443
httpsServer.listen(httpsPort, () => {
  console.log(
    `Server running on port ${httpsPort}, supporting HTTP/1.x and HTTP/2`
  )
})
