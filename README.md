# 💡 Проект &laquo;API для сайта-портфолио на Node.js, Express.js и MongoDB&raquo;

Для создания API используется фреймворк Express.js.
В качестве базы данных выбрана MongoDB.
Взаимодействие с базой данных осуществляется через Mongoose ORM.

# 🔧 Настройка перед запуском

Переименуйте файл `.env.example` в `.env`.

- Добавьте любую последовательность символов в переменную окружения `JWT_SECRET` (используется для создания и верификации JWT);
- В переменную окружения `MONGODB_URI` добавьте строку подключения к базе данных MongoDB.

# Docker для MongoDB

Вы можете использовать `docker-compose.yml` для создания и запуска Docker контейнера с MongoDB.

- Если используется конфигурация из `docker-compose.yml` без изменений, то значение переменной окружения `MONGODB_URI` необходимо установить в `mongodb://root:12345@mongo:27017/?authSource=admin`.

# Запуск приложения

```
npm start
```

# Запуск приложения в режиме разработки

В режиме разработки используется npm пакет [nodemon](https://www.npmjs.com/package/nodemon).

# Сборка приложения происходит с помощью GULP

```
gulp build
```

# Проверка авторизации пользователя

Проверка авторизации осуществляется двумя способами:

- С помощью пользовательской middleware `./middleware/authMiddleware.js`;
- С помощью библиотеки Passport.js (стратегия `passport-jwt`).

# Тестирование API

Для тестирования API установите Postman и импортируйте коллекцию из файла `tests/Project_API.postman_collection.json`.

# Код веб-приложения написан с использованием

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Gulp](https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&logo=gulp&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

# Лицензия

![GitHub](https://img.shields.io/github/license/iwebexpert/js-junior-nodejs-api)
