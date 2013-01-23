var Model= module.parent.exports

/*/
 * Интерфейс коллекции моделей
 *
 * @constructor
 * @param {Object} properties
 * @return {Function|Object}
 */
var Collection= module.exports= Model({
    items: Array
})

/*/
 *
 *
 * Управление элементами коллекции
 */

/*/
 * Добавляет элемент в коллекцию
 *
 * @param {Object} item
 * @return {Collection}
 */
Collection.prototype.add= function (item) {
    return this
}

/*/
 * Проверяет существование элемента в коллекции
 *
 * @param {Object} item
 * @return {Collection}
 */
Collection.prototype.has= function (item) {
    return this
}

/*/
 * Удаляет элемент из коллекции
 *
 * @param {Object} item
 * @return {Collection}
 */
Collection.prototype.rem= function (item) {
    return this
}

/*/
 *
 *
 * Загрузка и сохранение коллекции
 */

/*/
 * Загружает назагруженные элементы коллекции
 *
 * Передает карту незагруженных элементов загрузчику, получает от него
 * карту успешно загруженных элементов и вызывает функцию обратного вызова,
 * которая должна иметь сигнатуру — callback(err, collection)
 *
 * Порождает событие `load`, если требуется что-нибудь загрузить
 * Порождает событие `loaded` после переключения свойства модели `loaded` в `true`
 *
 * @param {Function} callback — функция обратного вызова
 * @return {Model} — возвращает себя
 */
Collection.prototype.load= function (callback) {
    return this
}

/*/
 * Сохраняет несохраненные элементы коллекции
 *
 * Передает карту несохраненных элементов функции сохранения, получает от нее
 * карту успешно сохраненных элементов и вызывает функцию обратного вызова,
 * которая должна иметь сигнатуру — callback(err, collection)
 *
 * Порождает событие `save`, если требуется что-нибудь загрузить
 * Порождает событие `saved` после переключения свойства коллекции `loaded` в `true`
 *
 * @param {Function} callback — функция обратного вызова
 * @return {Model} — возвращает себя
 */
Collection.prototype.save= function (callback) {
    return this
}