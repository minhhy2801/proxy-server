const http = require('http');
const util = require('../common/util');
const config = require('../common/config');

const serverHttp = http.createServer().listen(config.httpWithAuth.port);

const getHttpWithAuth = () => {
  serverHttp.on('connect', (req, socket) => {
    const credential = util.getCredential(req);
    const checkValidAuth = util.checkAuth(credential.name, credential.pass, config.httpWithAuth.username, config.httpWithAuth.password);
    if (!credential || !checkValidAuth) {
      util.setAccessDeniedSocket(socket);
    } else {
      util.setAccessSocket(req, socket);
    }
  });
};

module.exports = {
  getHttpWithAuth
};
