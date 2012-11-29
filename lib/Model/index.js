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
 * @constructor
 *
 * @this {Model}
 * @param {Object} descriptor — определение схемы
 * @return {Model|Function}
 */
var Model= module.exports= Schema({
    type:'model',

    db: Schema.Property({ enumerable:false, require:true }),
    key: Schema.Property({ enumerable:false, require:true }),

    loaded: false,
    loader: Schema.Property({ enumerable:false,

        /**
         * Вызывается по событию модели `load`
         *
         * @event
         * @param {Object} unloaded
         * @param {Model} model
         * @param {Function} callback
         */
        value: function (unloaded, model, callback) {
            model.db.load(
                model.key, unloaded, model,
                callback
            )
        }

    }),

    saved: true,
    saver: Schema.Property({ enumerable:false,

        /**
         * Вызывается по событию модели `save`
         *
         * @event
         * @param {Object} unsaved
         * @param {Model} model
         * @param {Function} callback
         */
        value: function (unsaved, model, callback) {
            model.db.save(
                model.key, unsaved, model,
                callback
            )
        }

    }),

    events: new EventEmitter,
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
 * Порождает событие `load`, если требуется что-нибудь загрузить
 * Порождает событие `loaded` после переключения флага `model.loaded` в `true`
 *
 * @param {Function} callback — функция обратного вызова
 * @return {Model}
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

    if (unloaded) {

        this.events.trigger('load', {
            properties: loaded,
            model: model
        })

        this.loader(unloaded, this, function (err, loaded, model) {
            if (err) {

                this.events.trigger('error', {
                    err: err,
                    properties: loaded,
                    model: model
                })

            } else {

                // if (loaded == unloaded)
                this.loaded= true

                this.events.trigger('loaded', {
                    err: err,
                    properties: loaded,
                    model: model
                })

            }
            callback(err, loaded, model)
        })

    } else {

        this.loaded= true

        this.events.trigger('loaded', {
            err: err,
            properties: loaded,
            model: model
        })

        callback(null, null, model)
    }

    return this
}



/* Экспортирует */

/** @exports Model.Property as Schema.Property */
Model.Property= Schema.Property