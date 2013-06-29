/**
 * Конструктор свойства модели.
 *
 * @memberof Model
 *
 * @param {mixed} type
 * @returns {Property}
 */
var Property= module.exports= function Property(type) {
    this.type= type
}

Property.prototype.init= function(model, p, value) {
    if (Number === this.type) {
        model[p]= (value !== undefined && value !== null) ? Number(value) : null
    } else if (String === this.type) {
        model[p]= (value !== undefined && value !== null) ? (''+value) : null
    } else {
        model[p]= new this.type(value)
    }
}
