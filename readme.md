# [some-model](http://somejs.org/model) [![Build Status](https://secure.travis-ci.org/freaking-awesome/some-model.png)](http://travis-ci.org/freaking-awesome/some-model)

Язык декларативного моделирования данных.

 
## Установка
```
npm install https://github.com/freaking-awesome/some-model/archive/master.tar.gz
npm test
```
Зависит от **[some-schema](https://github.com/freaking-awesome/some-schema)**. Для тестирования необходимы **[mocha]()** и **[chai]()**.

 
## Использование

#### Определение модели

#### Инстанцирование

#### Валидация

#### Сохранение и загрузка

 
## API и [документация](http://api.somejs.org)

###### Методы класса

**Model** ( **properties** ) — Возвращает конструктор модели, расширенный переданными определениями **properties**.

**Model.find** ( **mapper**, prefix, **keys** )

**Model.load** ( **mapper**, prefix, **key** ) — Инстанцирует экземпляр модели и загружает в него данные.

###### Методы экземпляра

**[model]()** = **new [Model]()** ( **values** ) — Конструирует экземпляр модели со значениями свойств **values**.

**model.[load]()** ( prefix, **key**, **callback** ) — Загружает данные в модель.

**model.[save]()** ( prefix, **key**, **callback** ) — Сохраняет данные модели.