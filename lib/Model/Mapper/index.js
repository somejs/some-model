var Schema= require('some-schema')
var type= 'mapper'

var cache= {}

/*/
 * Интерфейс маппера модели
 *
 * @constructor
 * @param {Object} properties
 * @return {Function|Object}
 */
var Mapper= module.exports= Schema({

    type: Schema.Property({ enumerable: false,
        value: type,
    }),

    cache: Schema.Property({ enumerable: false,
        type: Object,
        value: cache,
    }),

})

Mapper.type= type

/*/
 *
 *
 * Загрузка и сохранение моделей
 */

/*/
 * Ищет и загружает данные в модели
 *
 * @param {Function} Model — Конструктор модели
 * @param {String} prefix — префикс для ключей к моделируемым данным
 * @param {String|Array} keys — один или несколько ключей
 * @param {Function} callback
 */
Mapper.prototype.find= function (Model, prefix, keys, callback) {
    var cache= this.cache

    if (!(keys instanceof Array)) {
        keys= [keys]
    }

    var found= {}
    keys.map(function (k) {
        var key= [prefix, k].join(':')
        found[k]= cache[key] && new Model(
            cache[key]
        )
    }, this)

    callback(null, found)
    return this
}

/*/
 * Загружает данные в модель
 *
 * @param {Object} unloaded — карта незагруженных свойств
 * @param {Model} model — загружаемая модель
 * @param {Function} callback
 */
Mapper.prototype.load= function (unloaded, model, callback) {
    var key= [model.prefix, model.key].join(':')
    var cache= this.cache

    if (cache[key]) {
        Object.keys(unloaded).map(function (k) {
            model[k]= cache[key][k]
        }, this)
        model.loaded= true
    }

    callback(null, model)
    return this
}

/*/
 * Сохраняет данные модели
 *
 * @param {Object} unsaved — карта несохраненных свойств
 * @param {Model} model — сохраняемая модель
 * @param {Function} callback
 */
Mapper.prototype.save= function (unsaved, model, callback) {
    var key= [model.prefix, model.key].join(':')
    var cache= this.cache

    cache[key]= cache[key] || {}
    Object.keys(unsaved).map(function (k) {
        cache[key][k]= model[k]
    }, this)

    model.loaded= true

    callback(null, model)
    return this
}