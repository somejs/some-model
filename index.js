
var Model= require('./lib/Model')
var ModelService= require('./lib/ModelService')



var $model= module.exports= $(ModelService, new ModelService('$model', {}, Model))



/**
 * Сервис моделирования
 *
 * @name $model
 */
function $(Service, service) {

    if (!(Service instanceof Function)) {
        throw Error('Cannot create service. Wrong class', Service)
    }
    if (!(service instanceof Service)) {
        throw Error('Cannot create service. Wrong instance', service)
    }

    return Proxy.createFunction({
        getOwnPropertyDescriptor: function(name) {
            return Object.getOwnPropertyDescriptor(service)
        },
        getOwnPropertyNames: function() {
            return Object.getOwnPropertyNames(service)
        },
        getPropertyDescriptor: function(name) {
            return Object.getPropertyDescriptor(service)
        },
        getPropertyNames: function() {
            return Object.getPropertyNames(service)
        },
        defineProperty: function(name, descriptor) {
            return Object.defineProperty(service, name, descriptor)
        },
        get: function (proxy, k) {
            return service[k]
        }
    }
    ,   function (name, properties) {
            return $(Service,
                service.define(name, properties)
            )
    }
    ,   function (data) {
            return service.create(data)
    })
}
