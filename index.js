
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
            if ('prototype' === k) {
                return service.constructor.prototype
            }
            return service[k]
        }
    }
    ,   function (name, properties) {
            service.emit('extend', name, properties)
            var $model= $(Service, new Service(name, properties || {}, service.Model, service))
            service.emit('extended', $model)
            return $model
    }
    ,   function (data) {
            service.emit('instantiate', data)
            try {
                var model= new service.Model(data)
                service.emit('instantiated', model)
                return model
            } catch (err) {
                service.emit('error', err)
            }
    })
}
