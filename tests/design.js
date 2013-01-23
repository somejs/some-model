var Model= require('../lib/Model')

console.log("\nМодель",
    Model instanceof Function,
    Model.type === 'model',
    Model.properties instanceof Object
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
    model.constructor === Model,
    model.constructor.properties instanceof Object
)
console.log(
    model.mapper instanceof Model.Mapper,
    model.prefix == 'models',
    model.key == 'path:to:data',
    model.loaded == false, model.loaded=true, model.loaded == true,
    model.events instanceof require('events').EventEmitter
)

// По умолчанию сохраняет модели в память

var My= Model({
    p1: Model.Property({
        value:'123'
    }),
    p2: Model.Property({
        value: '456'
    }),
    p3: Model.Property({
        value: '789'
    }),
})

var my= new My({
    key:'my1',
})
console.log(my.loaded === false)
my.save(function (err, m) {
    console.log(my.loaded === true)
})

var my= new My({
    key:'my2',
})
console.log(my.loaded === false)
my.save(function (err, m) {
    console.log(my.loaded === true)
})

var my= new My({
    key:'my1',
})
console.log(my.loaded === false)
my.load(function (err, m) {
    console.log(my.loaded === true)
})

var mapper= new My.Mapper
mapper.find(My, 'models', 'my1', function (err, found) {
    console.log(
        !!found.my1
    )
})
mapper.find(My, 'models', ['my1', 'my2', 'my3'], function (err, found) {
    console.log(
        !!found.my1, !!found.my2, !found.my3
    )
})