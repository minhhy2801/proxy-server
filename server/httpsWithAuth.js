const https = require('https');
const util = require('../common/util');
const config = require('../common/config');

const ssl = util.getSslInformation();
const serverHttpsWithAuth = https.createServer(ssl).listen(config.httpsWithAuth.port);

const getHttpsWithAuth = () => {
  serverHttpsWithAuth.on('connect', (req, socket) => {
    const credential = util.getCredential(req);
    const checkValidAuth = util.checkAuth(credential.name, credential.pass, config.httpsWithAuth.username, config.httpsWithAuth.password);

    if (!credential || !checkValidAuth) {
      util.setAccessDeniedSocket(socket);
    } else {
      util.setAccessSocket(req, socket);
    }
  });
};

module.exports = {
  getHttpsWithAuth
};
