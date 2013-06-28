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
            if (Number === property.type) {
                this[p]= (data[p] !== undefined) ? Number(data[p]) : null
            } else if (String === property.type) {
                this[p]= (data[p] !== undefined) ? data[p] : null
            } else {
                this[p]= new property.type(data[p])
            }
        }
    }
    return this
}
