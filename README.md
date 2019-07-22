# proxy-server

## Overview
Create 4 server proxy: 
- Http without authentication
- Http with authentication
- Https without authentication
- Https with authentication

## Usage
### Run all servers proxy
`npm start`

**Run server proxy http without authentication**  
`node httpWithoutAuth.js`  
**Test**  
`curl --proxy http://localhost:3127 https://www.google.com`  

**Run server proxy http with authentication**  
`node httpWithAuth.js`  
**Test**  
`curl --proxy http://cybozu:cybozu@localhost:3128 https://www.google.com`   

**Run server proxy https without authentication**  
`node httpsWithoutAuth.js`  
**Test**  
`curl --proxy curl --proxy-insecure --proxy https://localhost:432 https://www.google.com`  

**Run server proxy https with authentication**   
`node httpsWithAuth.js`  
**Test**   
`curl --proxy-insecure --proxy https://kintone:kintone@localhost:433 https://www.google.com`

## Config
Go to file **config.js** to modify information of server proxy
```
module.exports = {
  // http proxy without authentication information
  httpWithoutAuth: {
    port: 3127 
  },

  // http proxy with authentication information
  httpWithAuth: {
    port: 3128,
    username: 'cybozu',
    password: 'cybozu'
  },

  // https proxy without authentication information
  httpsWithoutAuth: {
    port: 432
  },

  // https proxy with authentication information
  httpsWithAuth: {
    port: 433,
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
```


