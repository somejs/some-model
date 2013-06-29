/**
 * Конструктор модели.
 *
 * @class
 *
 * @namespace
 *
 * @param {object} data
 * @returns {Model}
 */
var Model= module.exports= function Model(data) {
    var properties= this.constructor.properties
    for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
        this[p]= null
    }
    this.init(data || {}, properties)
}

Model.Property= require('./Property')



/**
 * Инициализирует модель.
 *
 * Устанавливает значения свойств модели.
 *
 * @param {Object} data
 * @param {Object|null} properties
 * @returns {Model} — return self
 */
Model.prototype.init= function (data, properties) {
    if (!properties || !(properties instanceof Object)) {
        properties= this.constructor.properties || {}
    }
    if (data && data instanceof Object) {
        for (var p in properties) if (properties.hasOwnProperty(p)) { var property= properties[p]
            console.assert(property instanceof this.constructor.Property)
            property.init(this, p, data[p])
        }
    }
    return this
}
