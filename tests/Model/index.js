var assert= require('chai').assert

module.exports= function (Model) { return function () {
    describe('Библиотека экспортирует конструктор модели, который', function () {

        it('является функцией — Model()', function () {
            assert.isFunction(
                Model
            )
        })

        it('несет на себе определения свойств — Model.properties', function () {
            assert.isDefined(
                Model.properties
            )
            assert.equal(
                'model', Model.properties.type
            )
        })

        it('бросает исключение, если значение требуемого свойства не передано', function () {
            var model= null
            try {
                model= new Model({
                    db: {}, //key: 'path/to/data'
                })
            } catch (e) {
                assert.instanceOf(
                    e, Model.Property.BadValue
                )
            } finally {
                assert.isNull(
                    model
                )
            }
        })


        describe('возвращает экземпляр модели, который', function () {

            var db= {}
            var model= new Model({
                db:db, key:'path/to/data',
                loaded:true,

                other:'something',
                empty:null,
            })

            it('имеет определенный тип', function () {
                assert.instanceOf(
                    model, Model
                )
            })

            it('имеет объявленные свойства', function () {
                assert.isDefined(
                    model.db
                )
                assert.isDefined(
                    model.key
                )
                assert.isDefined(
                    model.loaded
                )
                assert.isDefined(
                    model.other
                )
                assert.isDefined(
                    model.empty
                )
            })
            it('содержит переданные значения', function () {
                assert.equal(
                    'path/to/data', model.key
                )
                assert.equal(
                    db, model.db
                )
                assert.equal(
                    true, model.loaded
                )
                assert.equal(
                    'something', model.other
                )
                assert.equal(
                    null, model.empty
                )
            })



            describe('имеет контейнер с объявлениями свойств, который', function () {
                it('является объектом', function () {
                    assert.isObject(
                        model.properties
                    )
                })
                it('содержит объявления свойств, чьи дескрипторы — экземпляры Model.Property', function () {
                    assert.isDefined(
                        model.properties.db
                    )
                    assert.instanceOf(
                        model.properties.db, Model.Property
                    )

                    assert.isDefined(
                        model.properties.key
                    )
                    assert.instanceOf(
                        model.properties.key, Model.Property
                    )
                })
                it('остальных объявлений не содержит', function () {
                    assert.isUndefined(
                        model.properties.loaded
                    )
                    assert.isUndefined(
                        model.properties.other
                    )
                    assert.isUndefined(
                        model.properties.empty
                    )
                })

            })



        })

    })
}}