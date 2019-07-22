# proxy-server

## Overview
This tool for building proxies server:
- http/https proxy without auth
- http/https proxy with auth

Required environment
- OS: centos 7
- nodejs: v10.16.0  

## Install 
- Clone this repository
- Run `npm i`

## Usage
### Run all servers proxy
`npm start`

**Run server proxy http without authentication**  
`npm run http`  
**Test**  
`curl --proxy http://localhost:3128 https://www.google.com`  

**Run server proxy http with authentication**  
`npm run http-auth`  
**Test**  
`curl --proxy http://cybozu:cybozu@localhost:13128 https://www.google.com`   

**Run server proxy https without authentication**  
`npm run https`  
**Test**  
`curl --proxy curl --proxy-insecure --proxy https://localhost:443 https://www.google.com`  

**Run server proxy https with authentication**   
`npm run https-auth`  
**Test**   
`curl --proxy-insecure --proxy https://kintone:kintone@localhost:1443 https://www.google.com`

## Config
Go to file **./common/config.js** to modify information of server proxy
```
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
    dir: './common/ssl/',
    key: 'key.pem',
    cert: 'cert.pem',
    callback: 'utf8',
  }
};
```


