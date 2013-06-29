var assert= require('chai').assert

module.exports= function ($model) { return function () {



    describe('$model constructor', function () {

        it('should be a function', function () {
            assert.isFunction($model)
        })

        it('should have name', function () {
            assert.isString($model.name)
            assert.equal($model.name, '$model')
        })

        it('should have properties', function () {
            assert.isObject($model.properties)
        })

        it('should have Model constructor', function () {
            assert.isFunction($model.Model)
        })

        describe('$model instance', function () {

            var model= new $model

            it('should be an instance of $model.Model', function () {
                assert.instanceOf(model, $model.Model)
            })

        })
    })




    describe('$model constructor inheritance', function () {

        var ChildModel= $model('child')

        it('should be a function', function () {
            assert.isFunction(ChildModel)
        })

        it('should have name', function () {
            assert.isString(ChildModel.name)
            assert.equal(ChildModel.name, 'child')
        })

        it('should have properties', function () {
            assert.isObject(ChildModel.properties)
        })

        it('should have Model constructor', function () {
            assert.isFunction(ChildModel.Model)
        })

        describe('$model inheritance instance', function () {

            var child= new ChildModel

            it('should be an instance of ChildModel.Model', function () {
                assert.instanceOf(child, ChildModel.Model)
            })

            it('should be an instance of $model.Model', function () {
                assert.instanceOf(child, $model.Model)
            })

        })

        describe('$model constructor deep inheritance', function () {

            var ChildChildModel= ChildModel('child-child')

            it('should be a function', function () {
                assert.isFunction(ChildChildModel)
            })

            it('should have name', function () {
                assert.isString(ChildChildModel.name)
                assert.equal(ChildChildModel.name, 'child-child')
            })

            it('should have properties', function () {
                assert.isObject(ChildChildModel.properties)
            })

            it('should have Model constructor', function () {
                assert.isFunction(ChildChildModel.Model)
            })

            describe('$model deep inheritance instance', function () {

                var child= new ChildChildModel

                it('should be an instance of ChildChildModel.Model', function () {
                    assert.instanceOf(child, ChildChildModel.Model)
                })

                it('should be an instance of ChildModel.Model', function () {
                    assert.instanceOf(child, ChildModel.Model)
                })

                it('should be an instance of $model.Model', function () {
                    assert.instanceOf(child, $model.Model)
                })

            })

        })

    })



    describe('$model composition', function () {

        var Model= $model('model1', {
            p1: String,
            p2: String,

            p3: $model('model1p3', {
                p1: String,
                p2: String,
                p3: $model('model1p3p3', {
                    p1: Number
                })
            })
        })

        it('should have properties', function () {
            assert.strictEqual(Model.properties.p1.type, String)
            assert.strictEqual(Model.properties.p2.type, String)
            assert.isDefined(Model.properties.p3.type)
            assert.strictEqual(Model.properties.p3.type.properties.p1.type, String)
            assert.strictEqual(Model.properties.p3.type.properties.p2.type, String)
            assert.isDefined(Model.properties.p3.type.properties.p3.type)
            assert.strictEqual(Model.properties.p3.type.properties.p3.type.properties.p1.type, Number)
        })

        describe('$model composition instance', function () {

            var model= new Model({
                p1: 'P1',
                p2: 'P2',
                p3: {
                    p1: 'P3P1',
                    p2: 'P3P2',
                    p3: {
                        p1: '1'
                    }
                }
            })

            it('should have values', function () {
                assert.strictEqual(model.p1, 'P1')
                assert.strictEqual(model.p2, 'P2')
                assert.strictEqual(model.p3.p1, 'P3P1')
                assert.strictEqual(model.p3.p2, 'P3P2')
                assert.strictEqual(model.p3.p3.p1, 1)
            })

        })

    })



    describe('$model constructor events', function () {

        it('should emit `extend` event', function (done) {
            var Model= $model('model')
            Model.on('extend', function () {
                done()
            })
            var Child= Model('child')
        })

        it('should emit `extend` event', function (done) {
            var Model= $model('model')
            Model.on('extended', function () {
                done()
            })
            var Child= Model('child')
        })

        it('should emit `instantiate` event', function (done) {
            var Model= $model('model')
            Model.on('instantiate', function () {
                done()
            })
            var model= new Model
        })

        it('should emit `instantiated` event', function (done) {
            var Model= $model('model')
            Model.on('instantiated', function () {
                done()
            })
            var model= new Model
        })

    })

    describe('Create `Model` from dsl:', function () {

        var Book= $model('Book', {

            'id': { type:'Number' },

            'isbn': { type:'String', filter:['trim', ['regexp', '^[\-0-9a-zA-Z]+?']] },

            'titleRu': { type:'String' },
            'titleEn': { type:'String' },

            'author': { type:'Model', model:'Author', properties: {/* ... */} }

        })

        it('created `Model` have defined properties', function () {
            assert.isObject(Book.properties)
            for (p in Book.properties) {
                assert.instanceOf(Book.properties[p], Book.Model.Property)
            }
        })
    })
}}
