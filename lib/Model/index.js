/* Использует */

var Schema= require('../../../some-schema')
  , EventEmitter= require('events').EventEmitter

  , inherits= require('util').inherits



/**
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



/**
 * Загружает данные в назагруженные свойства модели
 *
 * Передает карту незагруженных свойств загрузчику, получает от него
 * карту успешно загруженных свойств и передает ее в функцию обратного вызова,
 * которая должна иметь сигнатуру — callback(err, loaded, model)
 *
 * Если загружать нечего, или все незагруженные свойства успешно загружены,
 * переключает свойство модели `loaded` в `true`, и передает `null`
 * в функцию обратного вызова
 *
 * Порождает событие `load`, если требуется что-нибудь загрузить
 * Порождает событие `loaded` после переключения свойства модели `loaded` в `true`
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

    if (unloaded) { // если что-то не загружено

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

    } else { // если ничего загружать не требуется

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

/**
 * Экспортирует конструктор свойства схемы как конструктор свойства модели
 * 
 * @exports Model.Property as Schema.Property
 */
Model.Property= Schema.Property