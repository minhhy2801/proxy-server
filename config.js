module.exports = {
  httpWithoutAuth: {
    port: 3127
  },
  httpWithAuth: {
    port: 3128,
    username: 'cybozu',
    password: 'cybozu'
  },
  httpsWithoutAuth: {
    port: 432
  },
  httpsWithAuth: {
    port: 433,
    username: 'kintone',
    password: 'kintone'
  },
  ssl: {
    dir: './',
    key: 'key.pem',
    cert: 'cert.pem',
    callback: 'utf8',
  },
};

