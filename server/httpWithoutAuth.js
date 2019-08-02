const http = require('http');
const util = require('../common/util');
const config = require('../common/config');

const serverHttpWithoutAuth = http.createServer().listen(config.httpWithoutAuth.port);

const getHttpWithoutAuth = () => {
  serverHttpWithoutAuth.on('connect', (req, socket, head) => {
    console.log('Received reverse proxy request for:' + req.url);
    util.proxyRequest(req, socket, head);
  });
};

module.exports = {
  getHttpWithoutAuth
};
