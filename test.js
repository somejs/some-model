describe('/', require('./spec/tests')(
    require('./index')
))



describe('Model /', require('./spec/tests/Model')(
    require('./lib/Model')
))

describe('ModelService /', require('./spec/tests/ModelService')(
    require('./lib/ModelService')
))
