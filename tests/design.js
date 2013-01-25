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
    Model.Mapper.prototype.load.length === 3 // unloaded, model, callback
)
console.log(
    Model.Mapper.prototype.save instanceof Function,
    Model.Mapper.prototype.save.length === 3 // unsaved, model, callback
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

// Загрузка и сохранение вложенных схем

var Tree= Model({
    p1: Model.Property({
        value:'123'
    }),
    p2: Model({
        p21: Model.Property({
            value:'456'
        }),
        p22: Model.Property({
            value:'789'
        }),
    }),
    p3: Model({
        p31: Model.Property({
            value:'123'
        }),
        p32: Model({
            p321:Model.Property({
                value:'321'
            }),
        }),
    })
})

var tree= new Tree
console.log(
    tree.loaded === false,
    tree.p2.loaded === false,
    tree.p3.loaded === false, tree.p3.p32.loaded === false
)
tree.save(function (err, tree) {
    console.log(
        tree.loaded === true,
        tree.p2.loaded === true,
        tree.p3.loaded === true, tree.p3.p32.loaded === true
    )
})

var tree= new Tree
console.log(
    tree.loaded === false,
    tree.p2.loaded === false,
    tree.p3.loaded === false, tree.p3.p32.loaded === false
)
tree.load(function (err, tree) {
    console.log(
        tree.loaded === true,
        tree.p2.loaded === true,
        tree.p3.loaded === true, tree.p3.p32.loaded === true
    )
    console.log(
        tree.p1 === '123',
        tree.p2.p21 === '456', tree.p2.p22 === '789',
        tree.p3.p31 === '123', tree.p3.p32.p321 === '321'
    )
})

// Работа с моделями

//
// Персональные данные
//
var Profile= Model({

    firstname: Model.Property({ // имя
        type: String,
        value:'Иван'
    }),

    midname: Model.Property({ // отчество
        type: String,
        value:'Иванович'
    }),

    lastname: Model.Property({ // фамилия
        type: String,
        value:'Иванов'
    }),

})
var profile= new Profile
console.log(
    profile instanceof Profile,
    profile.firstname === 'Иван',
    profile.midname === 'Иванович',
    profile.lastname === 'Иванов'
)

//
// Пользователь
//
var User= Model({

    title: Model.Property({ // имя пользователя
        type: String,
        value:'Anonymous'
    }),

    profile: Model.Property({ // профиль пользователя
        type: Profile,
        value:{
            firstname:'Константин',
            lastname:'Константинопольский',
        }
    })

})
var user= new User
console.log(
    user.title === 'Anonymous'
)
console.log(
    user.profile instanceof Profile,
    user.profile.firstname === 'Константин',
    user.profile.midname === 'Иванович',
    user.profile.lastname === 'Константинопольский'
)