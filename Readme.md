<p align="center" style="font-size: 40px; font-weight: bold">Get Data Router</p>

<p align="center">Create routes quickly and easily with the independent get-data-router module</p>
<p align="center">Создавайте маршруты быстро и легко с независимым модулем get-data-router</p>
<p align="center">
    <img src="https://img.shields.io/badge/node-%3E%3D10-green">
    <img src="https://img.shields.io/badge/code%20size-12.4%20kB-blue">
    <img src="https://img.shields.io/badge/v-1.0.5-red">
    <img src="https://img.shields.io/badge/easy-routes-orange">
    
</p>
- [En](#en)
- [Ru](#ru)
## En
- [installation](#installation)
- [Principle of operation](#principle-of-operation)
- [Work without callback](#Work-without-callback)
- [Work using callback](#work-using-callback)
- [Route creation](#route-creation)

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm](https://www.npmjs.com/).
```bash
$ npm install get-data-router
```
## Principle of operation


This module is designed to create routing from files. The name of your file automatically becomes the name of the route. You can create all possible http protocol protocols in your route

The module is connected through a standard function in Node.js require

```js
const getDataFile = require('get-data-router')
```
<p> The function is exported to the <b> getDataFile </b> constant. </p>

The function is called and it takes on 2 arguments (path - required, callback - optional)

* path - path to the folder with your files for creating routes


## Work without callback

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
If you do not use callback, you must call the function in a variable or constant and it will give you, for example, the following object:

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
## Work using callback

Pros of using <b> callback: </b>
* Speeds up the development process 
* Gives the finished route result


callback takes 4 arguments:
* <b>path</b> - route path. Gives the finished path:
    *  <b>./routers/index.js</b>       -> <b>/</b>
    *  <b>./routers/user.js </b>       -> <b>/user</b>
    *  <b>./routers/user.js </b>       -> <b>/user/:id</b>
    *  <b>./routers/user/add.js </b>   -> <b>/user/add</b>
    *  <b>./routers/user/edit.js  </b> -> <b>/user/edit</b>

* <b>method</b> - protocol method http
* <b>fn</b> - function for route work
* <b>mw</b> - middleware

Callback example uses framework express

```js
const app = require('express'),

      rout = app.Router(),

      getDateFile = require('get-date-router')

getDateFile('./routers', (path, method, fn, mw) => {

    if(mw != undefined) {
        rout[method](path, ...mw, fn)
    } else {
        rout[method](path, fn)
    }

})

module.exports = rout
```
## Route creation

Using the <b> ./routers/user.js </b> file as an example, consider creating a route

The example uses the [multer](https://www.npmjs.com/package/multer) module to download files and create an additional middleware.
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
        mw: [ upload.single('file') ] /* Middleware - must always be an array */
    }
}
```
```js


const upload = require('multer')

async function getUser(req, res) {
    res.send('Route works')
}

async function postUser(req, res) {
    res.send('Route works')
}

module.exports = {
    get: {
        params: ':id', /* Rises after the main route  */
        fn: getUser
    },
    post: {
        fn: postUser,
        mw: [ upload.single('file') ] /* Middleware - must always be an array */
    }
}
```


## Ru
- [Установка](#установка)
- [Принцип работы](#принцип-работы)
- [Работа без callback](#работа-без-callback)
- [Работа с использованием callback](#работа-с-использованием-callback)
- [Создание маршрутов](#создание-маршрутов)

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




## Работа с использованием callback

Плюсы использования <b>callback:</b>
* Ускоряет процесс разработки 
* Отдаёт готовый результат маршрута


callback принимает на себя 4 аргумента:
* <b>path</b> - путь маршрута. Отдает готовый путь:
    *  <b>./routers/index.js</b>       -> <b>/</b>
    *  <b>./routers/user.js </b>       -> <b>/user</b>
    *  <b>./routers/user.js </b>       -> <b>/user/:id</b>
    *  <b>./routers/user/add.js </b>   -> <b>/user/add</b>
    *  <b>./routers/user/edit.js  </b> -> <b>/user/edit</b>

* <b>method</b> - метод http протокола
* <b>fn</b> - функцию для работы маршрута
* <b>mw</b> - промежуточный слой (middleware)

В примере работы callback используется framework express

```js
const app = require('express'),

      rout = app.Router(),

      getDateFile = require('get-date-router')

getDateFile('./routers', (path, method, fn, mw) => {

    if(mw != undefined) {
        rout[method](path, ...mw, fn)
    } else {
        rout[method](path, fn)
    }

})

module.exports = rout
```
## Создание маршрутов

На примере файла <b>./routers/user.js</b> расмотри создания маршрута

В примере для загрузки фалов и создания дополнительного промежуточного слоя (middleware) используется модуль [multer](https://www.npmjs.com/package/multer)

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
        mw: [ upload.single('file') ] /* Middleware - всегда должен быть массивом */
    }
}
```
```js


const upload = require('multer')

async function getUser(req, res) {
    res.send('Route works')
}

async function postUser(req, res) {
    res.send('Route works')
}

module.exports = {
    get: {
        params: ':id', /* Встает после основного маршрута  */
        fn: getUser
    },
    post: {
        fn: postUser,
        mw: [ upload.single('file') ] /* Middleware - всегда должен быть массивом */
    }
}
```