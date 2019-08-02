const http = require('http');
const util = require('../common/util');
const config = require('../common/config');

const serverHttp = http.createServer().listen(config.httpWithAuth.port);

const getHttpWithAuth = () => {
  serverHttp.on('connect', (req, socket, head) => {
    if (!req.headers['proxy-authorization']) {
      console.log('Unauthorized proxy request. Requesting authorization.');
      util.requestProxyAuth(socket);
    } else {
      console.log('Received reverse proxy request for:' + req.url);
      const credential = util.getCredential(req);
      const checkValidAuth = util.checkAuth(credential.name, credential.pass, config.httpWithAuth.username, config.httpWithAuth.password);
      if (!credential || !checkValidAuth) {
        console.log('Crendentials provided are invalid. Ending connection.');
        util.denyAccess(socket);
      } else {
        util.proxyRequest(req, socket, head);
      }
    }
  });
};

module.exports = {
  getHttpWithAuth
};
