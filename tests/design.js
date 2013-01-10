var Model= require('../lib/Model')

console.log("\nМодель",
    Model instanceof Function,
    Model.type === 'model'
)
console.log(
    Model.find instanceof Function,
    Model.find.length === 4 // mapper, prefix, keys, callback
)
console.log(
    Model.load instanceof Function,
    Model.find.length === 4 // mapper, prefix, keys, callback
)
console.log(
    Model.prototype.load instanceof Function,
    Model.prototype.load.length === 1, // callback
    Model.prototype.loader instanceof Function,
    Model.prototype.loader.length === 3 // unloaded, model, callback
)
console.log(
    Model.prototype.save instanceof Function,
    Model.prototype.save.length === 1, // callback
    Model.prototype.saver instanceof Function,
    Model.prototype.saver.length === 3 // unloaded, model, callback
)

console.log("\nМаппер",
    Model.Mapper instanceof Function,
    Model.Mapper.type === 'mapper'
)
console.log(
    Model.Mapper.prototype.find instanceof Function,
    Model.Mapper.prototype.find.length === 4 // Model, prefix, keys, callback
)
console.log(
    Model.Mapper.prototype.load instanceof Function,
    Model.Mapper.prototype.load.length === 2 // model, callback
)
console.log(
    Model.Mapper.prototype.save instanceof Function,
    Model.Mapper.prototype.save.length === 2 // model, callback
)

var model= new Model({
    mapper: new Model.Mapper,
    prefix: 'models',
    key: 'path:to:data'
})
console.log("\nЭкземпляр модели",
    model instanceof Model,
    model.constructor === Model
)
console.log(
    model.mapper instanceof Model.Mapper,
    model.prefix == 'models',
    model.key == 'path:to:data',
    model.loaded == null, model.loaded=true, model.loaded,
    model.events == null
)