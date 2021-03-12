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
- [Q & A](#q--a)
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

Q & A
-----

* 選擇註解的時機
  
通常會需要註解的時候，有可能是該邏輯本身有歷史淵源，會特別放上去，方便未來有機會接手的人理解。另外，如果有不可避免的原因，導致程式碼難理解抽象化的意義是什麼，無法清楚用程式碼的語意快速了解的狀態下，也會註解

* 遇到最大的問題

第三方 api 文件細節部份比較沒有提到，例如 200 response code 有出現上頭範例 response body 以外的內容。這部份我會第一尋求第三方的窗口協助，進一部了解可能的情形。並且進一步來處理例外情形

Author
-----
Jeremy Li

License
-----
MIT License
