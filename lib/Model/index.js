/* Использует */

var Schema= require('../../../some-schema')
  , EventEmitter= require('events').EventEmitter

  , inherits= require('util').inherits



/*
 * Конструктор модели
 *
 * Если вызывается как конструктор, возвращает экземпляр модели
 *
 * Если вызывается как функция, возвращает дочерний конструктор 
 * с соответствующим прототипом и определением родителя,
 * расширенного переданным определением
 *
 * @params {Object} descriptor — определение схемы
 * @returns {Schema|Function}
 */
var Model= module.exports= Schema({
    type:'model',
    events: new EventEmitter,

    loaded: false,
    saved: true,

    db: Schema.Property({ enumerable:false, require:true }),
    key: Schema.Property({ enumerable:false, require:true }),

    title: Schema.Property({ verbose:'название' }),
    created: Schema.Property({ verbose:'дата создания' }),
    updated: Schema.Property({ verbose:'дата обновления' }),
})



/* События модели */

/*
 * Подписаться на событие
 */
Model.prototype.on= function() {
    return this.events.on.apply(this.events, arguments)
}

/*
 * Подписаться на одно единственное событие
 *
 * Потом отписаться
 */
Model.prototype.once= function() {
    return this.events.once.apply(this.events, arguments)
}



/*
 * Определяет и возвращает карту незагруженных свойств
 *
 * Если указана функция обратного вызова, возвращает карту свойств
 * и саму модель в нее. Функция обратного вызова должна иметь
 * сигнатуру — callback(err, properties, model)
 *
 * @params {Function} callback — функция обратного вызова
 * @returns {Model}
 */
Model.prototype.load= function(callback) {

    var unloaded= null

    if (!this.loaded) {
        Object.keys(this.properties).map(function (k) {

            if (!this.properties[k].enumerable) return

            if (!this.properties[k].loaded) { if (!unloaded) unloaded= {}

                unloaded[k]= this.properties[k]
                unloaded[k].loaded= false

            }

        }, this)
    }

    if (!unloaded) this.loaded= true

    if (!callback) return unloaded

    callback(null, unloaded, this)
    return this
}



/* Экспортирует */

Model.Property= Schema.Property