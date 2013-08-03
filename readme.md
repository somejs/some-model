# [some-model](http://somejs.org/model) [![Build Status](https://secure.travis-ci.org/somejs/some-model.png)](http://travis-ci.org/somejs/some-model)

Язык декларативного моделирования реляционной модели данных.

 
## Установка и использование
```
npm install https://github.com/somejs/some-model/archive/master.tar.gz
npm test
```
Зависит от **[some-schema](https://github.com/somejs/some-schema)** и **[some-service](https://github.com/somejs/some-service)**. Для тестирования необходимы **[mocha]()** и **[chai]()**.

Требует гармонию. Установите флаг запуска ```--harmony``` или ```--harmony_proxies```.

 
### Определение моделей

Пример определения базовой модели предметной области (домена):
```js

/**
 * Базовая модель.
 */
var Model= require('some-model')('Model', {

    'id': Number,

})
```
В результате:
```js
console.log(Model, Model.properties)
```
```
[object Function] {
    id: { type: [Function: Number] }
}
```

 
### Определение производных моделей

Производная модель наследует свойства базовой модели. Пример определения производных моделей:
```js

/**
 * Модель автора.
 */
var Author= Model('Author', {

    'title': String,

})

/**
 * Модель книги.
 */
var Book= Model('Book', {

    'isbn': Number,

    'title': String,

    'authoredAt': Date,
    'author': /* Модель автора */ Author,

    'publishedAt': Date,
    'publisher': /* Модель издателя */ Model('Publisher', {

        'title': String,

    })
})
```
В результате:
```js
console.log('модель книги:', Book, Book.properties)
```
```
модель книги: [object Function] {
    id: { type: [Function: Number] },
    isbn: { type: [Function: Number] },
    title: { type: [Function: String] },
    authoredAt: { type: [Function: Date] },
    author: { type: [Function: Author] },
    publishedAt: { type: [Function: Date] },
    publisher: { type: [Function: Publisher] }
}
```

 
### Инстанцирование моделей

Определенные модели можно инстанцировать:
```js

var book= new Book({

    id: 2701,
    isbn: '380973464',

    title: 'Cryptonomicon',

    authoredAt: '1999',
    author: {
        title: 'Neal Stephenson'
    },

    publishedAt: '1999',
    publisher: {
        title: 'Avon'
    },
})
```
В результате:
```js
console.log('экземпляр книги:', book)
```
```
экземпляр книги: {
    id: 2701,
    isbn: 380973464,
    title: 'Cryptonomicon',
    authoredAt: Fri Jan 01 1999 00:00:00,
    author: { id: null, title: 'Neal Stephenson' },
    publishedAt: Fri Jan 01 1999 04:00:00,
    publisher: { id: null, title: 'Avon' }
}
```
