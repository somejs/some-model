var Schema= require('some-schema')



/**
 * Модель. Конструктор модели.
 *
 * Инстанцирует экземпляр модели, объявляет свойства
 * и инициализирует их значения.
 *
 * @class
 * @namespace
 * @param {object} data
 * @returns {Model}
 */
var Model= module.exports= function Model() {

    // конструктор схемы
    Schema.apply(this, arguments)

}



/**
 * Свойство модели.
 *
 * @class
 * @memberof Model
 */
Model.Property= Schema.Property



/**
 * Прототип модели.
 */
Model.prototype= Object.create(Schema.prototype)

Model.constructor= Model
