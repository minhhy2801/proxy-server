module.exports = {
  // http proxy without authentication information
  httpWithoutAuth: {
    port: 3128 
  },

  // http proxy with authentication information
  httpWithAuth: {
    port: 13128,
    username: 'cybozu',
    password: 'cybozu'
  },

  // https proxy without authentication information
  httpsWithoutAuth: {
    port: 443
  },

  // https proxy with authentication information
  httpsWithAuth: {
    port: 1443,
    username: 'kintone',
    password: 'kintone'
  },

  // openssl information for https proxy
  ssl: {
    dir: './',
    key: 'key.pem',
    cert: 'cert.pem',
    callback: 'utf8',
  }
};

