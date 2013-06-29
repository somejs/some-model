var events= require('events')



/**
 * Конструктор сервиса моделирования.
 *
 * @class
 *
 * @namespace
 * @property {String} name
 * @property {Object} properties
 * @property {Function} Model
 *
 * @requires events.EventEmitter
 *
 * @param {String} name
 * @param {Object} properties
 * @param {Function} model
 * @param {ModelService} $model
 * @returns {ModelService}
 */
var ModelService= module.exports= function ModelService(name, properties, Model, $model) {

    console.assert(arguments.length > 2)
    console.assert(Model instanceof Function)



    /**
     * @protected
     */
    this.$events= new events.EventEmitter

    /**
     * @protected
     */
    this.$parent= $model



    /**
     * @public
     */
    this.name= name

    /**
     * @public
     */
    this.properties= {}



    /**
     * @public
     */
    this.Model= function (data) {

    }

    this.Model.service= this
    this.Model.properties= this.properties

    this.Model.Property= Model.Property

    this.Model.prototype= Object.create(Model.prototype)

    this.Model.prototype.constructor= this.Model



    for (var p in Model.properties) if (Model.properties.hasOwnProperty(p)) { var property= Model.properties[p]
        this.properties[p]= property
    }

    for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
        if (!(property instanceof this.Model.Property)) {
            property= new this.Model.Property(property)
        }
        this.properties[p]= property
    }
}



/**
 * Добавляет обработчик события.
 *
 * @param {String} name
 * @param {Function} fn
 * @returns {ModelService} — return self
 */
ModelService.prototype.on= function (name, fn) {
    this.$events.on.apply(this.$events, arguments)
    return this
}

/**
 * Добавляет обработчик события.
 *
 * @param {String} name
 * @param {Function} fn
 * @returns {ModelService} — return self
 */
ModelService.prototype.once= function () {
    this.$events.once.apply(this.$events, arguments)
    return this
}

/**
 * Порождает событие.
 *
 * Все события, кроме обработанных ошибок, пробрасываются родителю.
 *
 * @param {String} name
 * @param {Function} fn
 * @returns {ModelService} — return self
 */
ModelService.prototype.emit= function (name) {
    try {
        this.$events.emit.apply(this.$events, arguments)
        if (name === 'error') {
            return
        } else {
            if (this.$parent && this.$parent.emit instanceof Function) {
                this.$parent.emit.apply(this.$parent, arguments)
            }
        }
    } catch (err) {
        if (this.$parent && this.$parent.emit instanceof Function) {
            this.$parent.emit.apply(this.$parent, arguments)
        } else {
            throw err
        }
    }
    return this
}
