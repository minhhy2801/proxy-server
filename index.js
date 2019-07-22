const httpsWithAuth = require('./server/httpsWithAuth');

const httpWithAuth = require('./server/httpWithAuth');
const httpsWithoutAuth = require('./server/httpsWithoutAuth');
const httpWithoutAuth = require('./server/httpWithoutAuth');

httpsWithAuth.getHttpsWithAuth();
httpWithAuth.getHttpWithAuth();
httpsWithoutAuth.getHttpsWithoutAuth();
httpWithoutAuth.getHttpWithoutAuth();
