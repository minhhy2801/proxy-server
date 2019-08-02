const https = require('https');
const util = require('../common/util');
const config = require('../common/config');

const ssl = util.getSslInformation();
const serverHttpsWithAuth = https.createServer(ssl).listen(config.httpsWithAuth.port);

const getHttpsWithAuth = () => {
  serverHttpsWithAuth.on('connect', (req, socket, head) => {
    if (!req.headers['proxy-authorization']) {
      console.log('Unauthorized proxy request. Requesting authorization.');
      util.requestProxyAuth(socket);
    } else {
      console.log('Received reverse proxy request for:' + req.url);
      const credential = util.getCredential(req);
      const checkValidAuth = util.checkAuth(credential.name, credential.pass, config.httpsWithAuth.username, config.httpsWithAuth.password);
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
  getHttpsWithAuth
};
