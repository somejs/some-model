var Model= require('../lib/Model')

var model= new Model({
    db:{}, key:'path/to/data',
    
    loaded:true
})

console.log(model, model.properties)

console.log(
    true === model.loaded, null === model.load()
)

model.loaded= false
console.log(
    false === model.loaded, !!model.load()
)
model.load(function (err, properties, model) {
    console.log(
        false === model.loaded, !!properties
    )
})

model.on('error', function (e) {
    
})