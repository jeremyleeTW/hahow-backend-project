Hahow api server written in Node.js    
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Building and test](#building-and-test)
- [Run](#run)
- [Test](#test)
- [Architecture](#architecture)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

Prerequisite
-----
* Nodejs >= v12
* Yarn

Building and test
-----

* Build
  
```bash
$ yarn install --frozen-lockfile
```

Run
-----

* For development

```bash
$ yarn run dev
```

* For production

```bash
$ yarn start
```

Test
-----

```bash
$ yarn test
```

Architecture
-----

By design, this service provides two apis as following:

`/heros`  
`/heros/:heroId`  

It authenticates user with credential if username and password passed as header  
Once authenticated, it returns hero info with its profile info

This server leverages express web framework to be able to set up route paths, middleware...

For ease of codebase maintainance, it seperates authentication phase in every api from business logic scope as middleware handler called `authMiddleware`

Each api request handled by their own controller

Dependencies
-----

- Express (Web framework, which is mainly for the use of server setup and its functionalities e.g. routers, middlewares)
- Nodemon (Live-reloading server in dev mode)
- Axios (Http client request)
- Body parser (Json parser middleware in Express)
- Http Status Code (Http response code for better coding)
- Typescript (Typescript enabler)
- Ts node (Load Node.js project written in Typescript without explicit compilation)
- Winston (Styled logging in asynchronous mechanisms))
- @types/* (Typescript declarations)
- @babel/* (Babel plugins to enable typescript. Babel is needed by Jest, which is used for testing unit and integration testing)
- Eslint (Code linter for Javascript)
- prettier (Code stylier plugin needed by vscode)
- supertest (http agent to test http)

Author
-----
Jeremy Li

License
-----
MIT License
