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
- [Работа без callback](#работа-без-callback)

## Установка

Это модуль [Node.js](https://nodejs.org/en/) доступный через
[npm](https://www.npmjs.com/).
```bash
$ npm install get-data-router
```

## Принцип работы


Этот модуль преднозначен для создания маршрутизации из файлов. Название вашего файла автоматически становится название маршрута. Вы можете создавать в вашем маршруте все возможные матоды http протакола

Подключение модуля происходит через стандарную функцию в Node.js require

```js
const getDataFile = require('get-data-router')
```
<p>В константу <b>getDataFile</b> экспортируется функция.</p>

Вызывается функция и она принимает на себя 2 аргумента (path - обязательный, callback - необязательный)

* path - путь к папке с вашими файлами для создания маршрутов

## Работа без callback

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
На примере файла <b>./routers/user.js</b> расмотри создания маршрута

В примере для загрузки фалов и создания дополнительного промежуточного слоя (middleware) используется модуль [multer](https://www.npmjs.com/package/multer)

## Работа с использованием callback

```js


const upload = require('multer')

async function getUser(req, res) {
    res.send('Route works')
}

async function postUser(req, res) {
    res.send('Route works')
}

module.exports = {
    get: getUser,
    post: {
        fn: postUser,
        mw: [ upload.single('file') ]
    }
}
```