# proxy-server

## Overview
Create 4 server proxy: 
- Http without authentication
- Http with authentication
- Https without authentication
- Https with authentication

## Usage
**Run all servers proxy**  
`npm start`

### Http without authentication
>Run server proxy http without authentication  
`node httpWithoutAuth.js`  
>Test  
`curl --proxy http://localhost:3127 https://www.google.com`  

### Http with authentication
> Run server proxy http with authentication  
`node httpWithAuth.js`  
> Test    
`curl --proxy http://cybozu:cybozu@localhost:3128 https://www.google.com`   

### Https without authentication
>Run server proxy http without authentication  
`node httpsWithoutAuth.js`  
>Test  
`curl --proxy curl --proxy-insecure --proxy https://localhost:432 https://www.google.com`  

### Https with authentication
> Run server proxy http with authentication  
`node httpsWithAuth.js`  
> Test    
`curl --proxy-insecure --proxy https://kintone:kintone@localhost:433 https://www.google.com`

## Config
Go to file **config.js** to modify information of server proxy



