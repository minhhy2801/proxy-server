const ssl = require('./config').ssl,
  auth = require('basic-auth'),
  compare = require('tsscmp'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  net = require('net');

const getSslInformation = () => {
  return {
    key: fs.readFileSync(path.resolve(ssl.dir + ssl.key), ssl.callback),
    cert: fs.readFileSync(path.resolve(ssl.dir + ssl.cert), ssl.callback),
  };
};

const checkAuth = (inputName, inputPass, validName, validPass) => {
  let isValid = true;
  isValid = compare(inputName, validName) && isValid;
  isValid = compare(inputPass, validPass) && isValid;

  return isValid;
};

const getCredential = (req) => {
  return auth.parse(req.headers['proxy-authorization']);
};

const requestProxyAuth = (socket) => {
  socket.write('HTTP/1.1 407 Proxy Authentication required\r\n' +
  'Proxy-Authenticate: Basic\r\n' +
  'Proxy-Authenticate: Negotiate\r\n' +
  '\r\n');
  socket.pipe(socket);
};

const denyAccess = (socket) => {
  socket.write('HTTP/1.1 401 Unauthorized\r\n');
  socket.end();
};

const proxyRequest = (req, socket, head) => {
  console.log('Proxying request for:' + req.url);
  // eslint-disable-next-line node/no-deprecated-api
  const serverUrl = url.parse('https://' + req.url);
  const srvSocket = net.connect(serverUrl.port, serverUrl.hostname, () => {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
      'Proxy-agent: node-simple-proxy\r\n' +
      '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
};


module.exports = {
  getSslInformation,
  checkAuth,
  getCredential,
  requestProxyAuth,
  denyAccess,
  proxyRequest
};
