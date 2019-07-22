const http = require('http');
const util = require('../common/util');
const config = require('../common/config');

const serverHttpWithoutAuth = http.createServer().listen(config.httpWithoutAuth.port);

const getHttpWithoutAuth = () => {
  serverHttpWithoutAuth.on('connect', (req, socket) => {
    util.setAccessSocket(req, socket);
  });
};

module.exports = {
  getHttpWithoutAuth
};
