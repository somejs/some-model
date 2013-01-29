var assert= require('chai').assert

module.exports= function (Model) {
    var assertClass= function (Class) {
        return function () {
            assert.isFunction(
                Class
            )
        }
    }
    var assertClassInstance= function (Class, instance) {
        return function () {
            assert.instanceOf(
                instance, Class
            )
        }
    }
    var assertProperty= function (Property) {
        return function () {
            assert.isDefined(
                Property
            )
        }
    }
    var assertMethod= function (Method) {
        return function () {
            assert.isFunction(
                Method
            )
        }
    }
    return function () {
        describe('Model constructor', function () {
            it('should be a class', assertClass(Model))
            describe('exports Model.Mapper', function () {
                it('should be a property', assertProperty(
                    Model.Mapper
                ))
                describe('return constructor', function () {
                    it('should be a class', assertClass(Model.Mapper))
                })
            })
            describe('exports Model.Property', function () {
                it('should be a property', assertProperty(
                    Model.Property
                ))
                describe('return constructor', function () {
                    it('should be a class', assertClass(Model.Property))
                })
            })
            describe('has properties', function () {
                describe('Model.properties', function () {
                    it('should be a property', assertProperty(
                        Model.properties
                    ))
                    describe('return properties descriptors', function () {
                        it('should be an object', function () {
                            assert.isObject(
                                Model.properties
                            )
                        })
                        describe('Model.properties.type', function () {
                            it('should be a property', assertProperty(
                                Model.properties.type
                            ))
                        })
                    })
                })
            })
        })
        describe('Model instance', function () {
            var model= new Model({
                mapper: new Model.Mapper,
                key:'key'
            })
            it('instance of Model', assertClassInstance(Model, model))
            describe('has properties', function () {
                describe('model.type', function () {
                    it('should be a property', assertProperty(
                        model.type
                    ))
                    it('should return String', function () {
                        assert.isString(
                            model.type
                        )
                    })
                })
                describe('model.mapper', function () {
                    it('should be a property', assertProperty(
                        model.mapper
                    ))
                    it('should return Object', function () {
                        assert.isObject(
                            model.mapper
                        )
                    })
                })
                describe('model.prefix', function () {
                    it('should be a property', assertProperty(
                        model.prefix
                    ))
                })
                describe('model.key', function () {
                    it('should be a property', assertProperty(
                        model.key
                    ))
                    it('should return String', function () {
                        assert.isString(
                            model.type
                        )
                    })
                })
            })
        })
        describe('Modeling', function () {
            var Hash= Model({
                type: Model.Property({
                    enumerable:false, default:'hash'
                }),
                prefix: Model.Property({
                    enumerable:false, default:'hashes'
                }),
            })
            var model= new Hash({
                mapper: new Model.Mapper,
                prefix: 'path:to:model',
                key: '100500',
            })
        })
    }
}