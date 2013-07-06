var Model= require('./lib/Model')
var ModelService= require('./lib/ModelService')

/**
 * Сервис моделирования
 *
 * @name $model
 */
var $model= module.exports= require('some-service')(
    new ModelService('$model', {}, Model)
)
