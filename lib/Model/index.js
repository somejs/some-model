var Schema= require('some-schema')
,   Events= require('events')

,   Mapper= require('./Mapper')
,   Property= require('./Property')

/*/
 * Модель
 *
 * Если вызывается как конструктор — переобъявляет свойства инстанцируемого объекта,
 * значения которых экземпляры Model.Property
 *
 * Если вызывается как функция — возвращает дочерний конструктор 
 * с соответствующим прототипом и определением родителя, расширенного
 * переданным определением
 *
 * @constructor
 * @param {Object} properties
 * @return {Function|Object}
 */
var Model= module.exports= Schema({

    type: Schema.Property({
        enumerable: false,
        default: 'model',
    }),

    /*/
     * Маппер данных
     * @type {Mapper}
     */
    mapper: Schema.Property({
        type: Mapper,
        enumerable: false,
        require: true,
    }),

    /*/
     * Ключ к данным
     * @type {String}
     */
    key: Schema.Property({
        require: true,
    }),

    /*/
     * Префикс к ключу
     * @type {String}
     */
    prefix: Schema.Property({
        enumerable: false,
        require: true,
        default: 'models'
    }),

    /*/
     * Статус актуальности загруженных данных
     * @type {Boolean}
     */
    loaded: Schema.Property({
        type: Boolean,
        enumerable: false,
    }),

    /*/
     * Эмиттер событий модели
     * @type {Events.EventEmitter}
     */
    events: Schema.Property({
        type: Events.EventEmitter,
        enumerable: false,
    }),
})

Model.type= 'model'

/*/
 * Интерфейс маппера модели
 *
 * @exports Mapper as Model.Mapper
 */
Model.Mapper= Mapper

/*/
 * Свойство модели
 *
 * @exports Property as Model.Property
 */
Model.Property= Property

/*/
 *
 *
 * События модели
 */

/*/
 * Подписаться на событие
 */
Model.prototype.on= function() {
    return this.events.on.apply(this.events, arguments)
}

/*/
 * Подписаться на одно единственное событие, потом отписаться
 */
Model.prototype.once= function() {
    return this.events.once.apply(this.events, arguments)
}

/*/
 *
 *
 * Загрузка и сохранение моделей
 */

/*/
 * Ищет и загружает данные в модели
 *
 * @param {Object} mapper — маппер данных
 * @param {String} prefix — префикс для ключей к данным
 * @param {String|Array} keys — один или несколько ключей
 * @param {Function} callback
 */
Model.find= function(mapper, prefix, keys, callback) {
    if (!(mapper instanceof Mapper)) {
        throw Error('mapper must be an instance of Model.Mapper')
    }
    mapper.find(Model, prefix, keys, callback)
    return Model
}

/*/
 * Загружает данные в модель
 *
 * @param {Object} mapper — маппер данных
 * @param {String} prefix — префикс для ключа к данным
 * @param {String|Array} key — ключ
 * @param {Function} callback
 */
Model.load= function(mapper, prefix, key, callback) {
    if (!(mapper instanceof Mapper)) {
        throw Error('mapper must be an instance of Model.Mapper')
    }
    var model= new Model({ prefix:prefix, key:key })
    mapper.load(model, callback)
    return model
}

/*/
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
 * @return {Model} — возвращает себя
 */
Model.prototype.load= function(callback) {
    if (this.loaded) {
        return callback(null, null, this)
    }
    var unloaded= {}
    Object.keys(this.constructor.properties).map(function (k) {
        var property= this.constructor.properties[k]
        if (!property.enumerable) {
            return
        }
        unloaded[k]= property
    }, this)
    //this.events && this.events.emit('load', unloaded, this)
    this.loader(unloaded, this, function (err, model) {
        if (err) {
            //model.events && model.events.emit('error', err, loaded, model)
            throw err
        }
        //model.events && model.events.emit('loaded', err, loaded, model)
        model.loaded= true
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
    callback(null, unloaded, model)
}

/*/
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
 * @return {Model} — возвращает себя
 */
Model.prototype.save= function(callback) {
    if (this.loaded) {
        return callback(null, null, this)
    }
    var unsaved= {}
    Object.keys(this.properties).map(function (k) {
        var property= this.constructor.properties[k]
        if (!property.enumerable) {
            return
        }
        unsaved[k]= property
    }, this)
    //this.events && this.events.emit('load', unloaded, this)
    this.saver(unsaved, this, function (err, model) {
        if (err) {
            //model.events && model.events.emit('error', err, loaded, model)
            throw err
        }
        //model.events && model.events.emit('loaded', err, loaded, model)
        model.loaded= true
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
    callback(null, unsaved, model)
}