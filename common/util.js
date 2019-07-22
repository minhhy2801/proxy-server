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
const setAccessDeniedSocket = (socket) => {
  socket.statusCode = 401;
  socket.write('WWW-Authenticate Basic realm="example"\r\n');
  socket.end('Access denied');
};

const setAccessSocket = (req, socket) => {
  console.log('Receiving reverse proxy request for:' + req.url);
  // eslint-disable-next-line node/no-deprecated-api
  const serverUrl = url.parse('https://' + req.url);
  const srvSocket = net.connect(serverUrl.port, serverUrl.hostname, () => {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
      'Proxy-agent: Node-Proxy\r\n' +
      '\r\n');
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
};


module.exports = {
  getSslInformation,
  checkAuth,
  getCredential,
  setAccessDeniedSocket,
  setAccessSocket
};
