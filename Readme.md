<p align="center" style="font-size: 40px; font-weight: bold">Get Data Router</p>

<p align="center">Create routes quickly and easily.</p>

- [En](#en)
- [Ru](#ru)
## En
- [installation](#installation)

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm](https://www.npmjs.com/).
```bash
$ npm install get-data-router
```
## Ru
- [Установка](#установка)
- [Принцип работы](#принцип-работы)

## Установка

Это модуль [Node.js](https://nodejs.org/en/) доступный через
[npm](https://www.npmjs.com/).
```bash
$ npm install get-data-router
```

## Принцип работы

Подключение модуля происходит через стандарную функцию в Node.js require

```js
const getDataFile = require('get-data-router')
```
<p>В константу getDataFile экспортируется функция.</p>
Вызывается функция и она принимает на себя 2 аргумента (path - обязательный, callback - необязательный)

```text
project/
├── node_modules/
├── public
├── routers
│   ├── user/
│   │   ├── add.js
│   │   └── edit.js
│   ├──user.js
│   └──index.js
├── router.js
└── index.js
```
```js
const getDataFile = require('get-data-router')
const data = getDataFile('./routers')
```
Если вы не используете callback то должны вызвать функцию в переменной или константе и она отдаст вам к примеру следующий объект:

```js
{
    './routers/index.js': { get: [AsyncFunction: getIndex] },
    './routers/user.js': { 
                            get: { params: ':id', fn: [AsyncFunction: getUser] }, 
                            post: { fn: [AsyncFunction: postUser], mw: [ [Function: multerMiddleware] ] }  
                          },
    './routers/user/add.js': { post: [AsyncFunction: setUser] },
    './routers/user/edit.js': { put: [AsyncFunction: editUser] }

}
```