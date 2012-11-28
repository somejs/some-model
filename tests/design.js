var Model= require('../lib/Model')

var model= new Model({
    db:{}, key:'path/to/data',
    
    loaded:true
})

console.log(model, model.properties)

console.log(model.load())

model.load(function (err, properties, model) {
    console.log('unloaded', properties, model)
})

model.on('error', function (e) {
    
})