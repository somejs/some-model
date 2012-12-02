/* Использует */

var Schema= require('../../../some-schema')
  , EventEmitter= require('events').EventEmitter



/**
 * Конструктор модели
 *
 * @constructor
 *
 * @this {Model}
 * @param {Object} values — значения свойств
 */
var Model= function (values) {
    Schema.apply(this, arguments)

    this.loaded= false

    //this.events= new EventEmitter
}
Model.prototype= Schema.prototype



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



/* Загрузка и сохранение */

/**
 * Загружает данные в назагруженные свойства модели
 *
 * Передает карту незагруженных свойств загрузчику, получает от него
 * карту успешно загруженных свойств и вызывает функцию обратного вызова,
 * которая должна иметь сигнатуру — callback(err, model)
 *
 * Порождает событие `load`, если требуется что-нибудь загрузить
 * Порождает событие `loaded` после переключения свойства модели `loaded` в `true`
 *
 * @param {Function} callback — функция обратного вызова
 * @return {Model}
 */
Model.prototype.load= function(callback) {

    if (this.loaded) {
        return callback(null, null, this)
    }

    var unloaded= null
    Object.keys(this.properties).map(function (k) {
        if (!this.properties[k].enumerable) return
        if (!this.properties[k].loaded) { if (!unloaded) unloaded= {}
            unloaded[k]= this.properties[k]
            unloaded[k].loaded= false
        }
    }, this)

    //this.events && this.events.emit('load', unloaded, this)

    this.loader(unloaded, this, function (err, model) {
        if (err) {
            //model.events && model.events.emit('error', err, loaded, model)
        }
        /* @todo: if (loaded == unloaded) model.loaded= true */
        //model.events && model.events.emit('loaded', err, loaded, model)
        callback(err, model)
    })

    return this
}

/**
 * Загружает данные в модель
 *
 * Вызывается по событию модели `load`
 *
 * @event
 * @param {Object} unloaded
 * @param {Model} model
 * @param {Function} callback
 */
Model.prototype.loader= function (unloaded, model, callback) {
    console.log('лоадер прототипа')
    callback(null, unloaded, model)
}



/**
 * Сохраняет данные несохраненных свойств модели
 *
 * Передает карту несохраненных свойств функции сохранения, получает от нее
 * карту успешно сохраненных свойств и вызывает функцию обратного вызова,
 * которая должна иметь сигнатуру — callback(err, model)
 *
 * Порождает событие `load`, если требуется что-нибудь загрузить
 * Порождает событие `loaded` после переключения свойства модели `loaded` в `true`
 *
 * @param {Function} callback — функция обратного вызова
 * @return {Model}
 */
Model.prototype.save= function(callback) {

    var unsaved= null
    Object.keys(this.properties).map(function (k) {
        if (!this.properties[k].enumerable) return
        if (!this.properties[k].loaded) { if (!unsaved) unsaved= {}
            unsaved[k]= this.properties[k]
            unsaved[k].loaded= false
        }
    }, this)

    //this.events && this.events.emit('load', unloaded, this)

    this.saver(unsaved, this, function (err, model) {
        if (err) {
            //model.events && model.events.emit('error', err, loaded, model)
        }
        /* @todo: if (loaded == unloaded) model.loaded= true */
        //model.events && model.events.emit('loaded', err, loaded, model)
        callback(err, model)
    })

    return this
}

/**
 * Сохраняет данные модели
 *
 * Вызывается по событию модели `save`
 *
 * @event
 * @param {Object} unsaved
 * @param {Model} model
 * @param {Function} callback
 */
Model.prototype.saver= function (unsaved, model, callback) {
    console.log('сейвер прототипа')
    callback(null, unsaved, model)
}



/* Экспортирует */

/**
 * Конструктор модели
 *
 * Если вызывается как конструктор, — переобъявляет свойства инстанцируемого объекта,
 * значения которых — экземпляры Model.Property
 *
 * Если вызывается как функция, — возвращает дочерний конструктор 
 * с соответствующим прототипом и определением родителя, расширенного
 * переданным определением
 *
 * @constructor
 * @param {Object} descriptor — определение схемы
 * @return {Model|Function}
 */
module.exports= Schema.factory(Model, {
    type:'model' // свойство всех экземпляров модели
})

/**
 * Экспортирует конструктор свойства схемы как конструктор свойства модели
 * @exports Model.Property as Schema.Property
 */
module.exports.Property= Schema.Property