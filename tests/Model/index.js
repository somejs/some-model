var assert= require('chai').assert

module.exports= function (Model) { return function () {
    describe('Библиотека экспортирует конструктор модели, который', function () {

        it('является функцией — `Model()`', function () {
            assert.isFunction(
                Model
            )
        })

        it('несет на себе определения свойств — `Model.properties`', function () {
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
                assert.deepEqual(
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



            describe('имеет специальное свойство `model.properties` c объявлением модели, которое', function () {
                it('содержит объект', function () {
                    assert.isObject(
                        model.properties
                    )
                })
                it('содержит объявления свойств, чьи дескрипторы — экземпляры `Model.Property`', function () {
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


            describe('имеет свойство `model.db` для хранения маппера модели в базу данных, которое', function () {
                it('содержит объект', function () {
                    assert.isObject(
                        model.db
                    )
                })
            })



            describe('имеет метод `model.load()` для загрузки данных в объявленные свойства, который', function () {
                it('является функцией', function () {
                    assert.isFunction(
                        model.load
                    )
                })
                it('объявлен в прототипе', function () {
                    assert.isFunction(
                        model.constructor.prototype.load
                    )
                })
                describe('использует внутри специальный загрузчик `model.loader`, который', function () {
                    it('тоже является функцией', function () {
                        assert.isFunction(
                            model.loader
                        )
                    })
                    it('объявляется при инициализации, в прототипе его нет', function () {
                        assert.isUndefined(
                            model.constructor.prototype.loader
                        )
                    })
                })



                describe('загружает данные в объявленные свойства модели', function () {

                    var db= {}
                    var model= new Model({
                        db:db, key:'path/to/data',
                        loaded:true,

                        other:'something',
                        empty:null,
                    })

                    //describe('если свойство `model.loaded` установлено, модель считается загруженной', function () {
                    //    assert.isTrue(
                    //        model.loaded
                    //    )
                    //    it('метод возвращает `null` вместо списка загруженного', function (done) {
                    //        model.load(function (err, loaded, model) {
                    //            assert.isNull(
                    //                loaded
                    //            )
                    //            assert.instanceOf(
                    //                model, Model
                    //            )
                    //            done()
                    //        })
                    //    })
                    //    it('порождает событие модели `loaded`', function (done) {
                    //        model.on('loaded', function (loaded, model) {
                    //            assert.isNull(
                    //                loaded
                    //            )
                    //            done()
                    //        })
                    //        model.load(function (err, loaded, model) {
                    //            assert.isNull(
                    //                loaded
                    //            )
                    //            assert.instanceOf(
                    //                model, Model
                    //            )
                    //        })
                    //    })
                    //})

                    describe('если свойство `model.loaded` не установлено, но загружать нечего', function () {

                        //var model= null
                        //beforeEach(function(){
                        //    var db= {}
                        //    model= new Model({
                        //        db:db, key:'path/to/data',
                        //        loaded:false,
                        //        other:'something',
                        //        empty:null,
                        //    })
                        //})

                        //assert.isFalse(
                        //    model.loaded
                        //)
                        describe('порождает событие модели `loaded`, которое', function () {
                            var model= null
                            beforeEach(function(){
                                var db= {}
                                model= new Model({
                                    db:db, key:'path/to/data',
                                    loaded:false,

                                    other:'something',
                                    empty:null,
                                })
                            })
                            it('передает обработчику карту загруженных свойств', function (done) {
                                //model.on('loaded', function (loaded, model) {
                                //    assert.isNull(
                                //        loaded
                                //    )
                                //    //done()
                                //})
                                model.load(function (err, loaded, model) {
                                    assert.isNull(
                                        loaded
                                    )
                                    assert.instanceOf(
                                        model, Model
                                    )
                                    done()
                                })
                            })
                            model
                        })
                        //it('метод возвращает `null` вместо списка загруженного', function (done) {
                        //    model.load(function (err, loaded, model) {
                        //        assert.isNull(
                        //            loaded
                        //        )
                        //        assert.instanceOf(
                        //            model, Model
                        //        )
                        //        done()
                        //    })
                        //})
                        //it('свойство `model.loaded` устанавливается в `true`', function () {
                        //    assert.isTrue(
                        //        model.loaded
                        //    )
                        //})
                    })
                    //it('загружает данные в свойства, помеченные как незагруженные', function (done) {
                    //    assert.isFalse(
                    //        model.loaded
                    //    )
                    //    model.load(function (err, loaded, model) {
                    //        assert.instanceOf(
                    //            model, Model
                    //        )
                    //        assert.isObject(
                    //            loaded
                    //        )
                    //        done()
                    //    })
                    //})

                })
            })
        })

    })
}}