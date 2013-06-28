var assert= require('chai').assert

module.exports= function (ModelService) { return function () {


    describe('ModelService', function () {

        it('should be a function', function () {
            assert.isFunction(ModelService)
        })

    })


}}
