const https = require('https');
const util = require('../common/util');
const config = require('../common/config');

const ssl = util.getSslInformation();
const serverHttps = https.createServer(ssl).listen(config.httpsWithoutAuth.port);

const getHttpsWithoutAuth = () => {
  serverHttps.on('connect', (req, socket, head) => {
    console.log('Received reverse proxy request for:' + req.url);
    util.proxyRequest(req, socket, head);
  });
};

module.exports = {
  getHttpsWithoutAuth
};