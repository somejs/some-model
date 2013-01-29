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
        describe('Descendant of the model', function () {
            var M1= Model({
                p1: Model.Property({
                    value:'P1'
                }),
                p2: Model.Property({
                    value:'P2'
                }),
            })
            it('should have declared properties', function () {
                assert.isObject(
                    M1.properties
                )
                assert.instanceOf(
                    M1.properties.p1, Model.Property
                )
                assert.instanceOf(
                    M1.properties.p2, Model.Property
                )
                assert.instanceOf(
                    M1.properties.mapper, Model.Property
                )
                assert.instanceOf(
                    M1.properties.prefix, Model.Property
                )
                assert.instanceOf(
                    M1.properties.key, Model.Property
                )
            })
            describe('Instance of the descendant', function () {
                var m1= new M1
                it('should have declared properties', function () {
                    assert.equal(
                        m1.p1, 'P1'
                    )
                    assert.equal(
                        m1.p2, 'P2'
                    )
                })
                it('should have an established mapper', function () {
                    assert.instanceOf(
                        m1.mapper, Model.Mapper
                    )
                    assert.isUndefined(
                        m1.mapper.prefix
                    )
                })
                describe('Save model with mapper', function () {
                    var m1= new M1
                    m1.p1= 'P1.1'
                    m1.p2= 'P2.1'
                    it('should be unsaved', function () {
                        assert.isFalse(
                            m1.loaded
                        )
                    })
                    it('should call function with error and saved model', function (done) {
                        m1.save(function (err, m) {
                            assert.equal(
                                m1, m
                            )
                            assert.isTrue(
                                m1.loaded
                            )
                            done()
                        })
                    })
                    describe('Load saved model with mapper', function () {
                        var m2= new M1
                        assert.equal(
                            m2.p1, 'P1'
                        )
                        assert.equal(
                            m2.p2, 'P2'
                        )
                        it('should call function with error and saved model', function (done) {
                            m2.load(function (err, m) {
                                assert.equal(
                                    m2, m
                                )
                                assert.isTrue(
                                    m2.loaded
                                )
                                assert.equal(
                                    m2.p1, 'P1.1'
                                )
                                assert.equal(
                                    m2.p2, 'P2.1'
                                )
                                done()
                            })
                        })
                    })
                })
            })
            
        })
    }
}