var Schema= require('some-schema')

/*/
 * Интерфейс маппера модели
 *
 * @constructor
 * @param {Object} properties
 * @return {Function|Object}
 */
var Mapper= module.exports= Schema({

})

Mapper.type= 'mapper'

/*/
 * Ищет и загружает данные в модели
 *
 * @param {Model} Model — Конструктор модели
 * @param {Model} keys — ключи к моделируемым данным
 * @param {Function} callback
 */
Mapper.prototype.find= function(Model, prefix, keys, callback) {

}

/*/
 * Загружает данные в модель
 *
 * @param {Model} model — загружаемая модель
 * @param {Function} callback
 */
Mapper.prototype.load= function(model, callback) {

}

/*/
 * Сохраняет данные модели
 *
 * @param {Model} model — сохраняемая модель
 * @param {Function} callback
 */
Mapper.prototype.save= function(model, callback) {

}