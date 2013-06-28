var assert= require('chai').assert

module.exports= function (Model) { return function () {


    describe('Model', function () {

        it('should be a function', function () {
            assert.isFunction(Model)
        })

    })


}}
