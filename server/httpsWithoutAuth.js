const https = require('https');
const util = require('../common/util');
const config = require('../common/config');

const ssl = util.getSslInformation();
const serverHttps = https.createServer(ssl).listen(config.httpsWithoutAuth.port);

const getHttpsWithoutAuth = () => {
  serverHttps.on('connect', (req, socket) => {
    util.setAccessSocket(req, socket);
  });
};

module.exports = {
  getHttpsWithoutAuth
};