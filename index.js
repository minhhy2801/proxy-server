const httpsWithAuth = require('./httpsWithAuth');
const httpWithAuth = require('./httpWithAuth');
const httpsWithoutAuth = require('./httpsWithoutAuth');
const httpWithoutAuth = require('./httpWithoutAuth');

httpsWithAuth.getHttpsWithAuth();
httpWithAuth.getHttpWithAuth();
httpsWithoutAuth.getHttpsWithoutAuth();
httpWithoutAuth.getHttpWithoutAuth();

/**
 * TEST
 * HTTP without auth: curl --proxy http://localhost:3127 https://www.google.com
 * HTTP with auth: curl --proxy http://cybozu:cybozu@localhost:3128 https://www.google.com
 * HTTPS without auth: curl --proxy-insecure --proxy https://localhost:432 https://www.google.com
 * HTTPS with auth: curl --proxy-insecure --proxy https://kintone:kintone@localhost:433 https://www.google.com
 */

