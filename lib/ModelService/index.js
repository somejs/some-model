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
        Model.apply(this, arguments)
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
        if (property instanceof this.Model.Property) {

            this.properties[p]= property

        } else {

            if (property instanceof Function) {

                property= this.defineProperty(p, property)

            } else if (property instanceof Object) {

                var type
                property.type= (''+ property.type).toLowerCase()

                if (property.type === 'number') {
                    type= Number
                } else if (property.type === 'string') {
                    type= String
                } else if (property.type === 'model') {
                    type= this.define(property.model, property.properties || {})
                }

                property= this.defineProperty(p, type)

            } else throw Error('bad Model.Property descriptor')

            this.properties[p]= property
        }
    }
}



/**
 * Инстанцирует модель.
 *
 * @param {Object} data
 * @returns {Model} — return created
 */
ModelService.prototype.create= function (data) {
    this.emit('instantiate', data)
    try {
        var model= new this.Model(data)
        this.emit('instantiated', model)
        return model
    } catch (err) {
        this.emit('error', err)
    }
}



/**
 * Определяет потомка.
 *
 * @param {String} name
 * @param {Object} properties
 * @returns {ModelService} — return defined
 */
ModelService.prototype.define= function (name, properties) {
    this.emit('extend', name, properties)
    var srvc= new this.constructor(name, properties || {}, this.Model, this)
    this.emit('extended')
    return srvc
}

/**
 * Определяет cвойство потомка.
 *
 * @param {String} name
 * @param {Object} property
 * @returns {Model.Property} — defined property
 */
ModelService.prototype.defineProperty= function (name, property) {
    return new this.Model.Property(property)
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
