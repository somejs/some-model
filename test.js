describe('/', require('./spec/tests')(
    require('./index')
))



describe('Model /', require('./spec/tests/Model')(
    require('./lib/Model')
))

describe('ModelService /', require('./spec/tests/ModelService')(
    require('./lib/ModelService')
))



/**
 * Базовая модель.
 */
var Model= require('./index')('Model', {

    'id': Number,

})

console.log(Model, Model.properties)

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

console.log('модель книги:', Book, Book.properties)

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

console.log('экземпляр книги:', book)
