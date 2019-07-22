const http = require('http'),
  https = require('https'),
  net = require('net'),
  url = require('url');
const util = require('./util');
const config = require('./config');

const ssl = util.getSslInformation();

const serverHttpsWithAuth = https.createServer(ssl).listen(config.httpsWithAuth.port);

serverHttpsWithAuth.on('connect', (req, socket) => {
  console.log(1111);

  const credential = util.getCredential(req);
  console.log(credential);
  const checkValidAuth = util.checkAuth(credential.name, credential.pass, config.httpsWithAuth.username, config.httpsWithAuth.password);

  if (!credential || !checkValidAuth) {
    util.setAccessDeniedSocket(socket);
  } else {
    console.log('Receiving reverse proxy request for:' + req.url);
    const serverUrl = url.parse('https://' + req.url);

    const srvSocket = net.connect(serverUrl.port, serverUrl.hostname, () => {
      socket.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-agent: Node-Proxy\r\n' +
                '\r\n');
      srvSocket.pipe(socket);
      socket.pipe(srvSocket);
    });
  }
});