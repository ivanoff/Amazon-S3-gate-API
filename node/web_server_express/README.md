

GET /users
список пользователей
GET /users/{id}
информация о пользователе
POST /users
добавить пользователя
PUT /users/{id}
изменить пользователя
DELETE /users/{id}
удалить пользователя

Таблица
_id, masterRegion, name.first, name.last, email, metadata


GET /users/{id}/assets
список папок/файлов, лежащих в корне
GET /users/{id}/assets/{id}
список папок/файлов, лежащих в папке {id}
POST /users/{id}/asserts
добавить папку/файл в корневой узел
POST /users/{id}/asserts/{id}
добавить папку/файл в папку {id}
PUT /users/{id}/assets/{id}
изменить документ {id}
DELETE /users/{id}/assets/{id}
удалить документ {id}

_id, masterRegion, userId, path, name, type, size, permissions


GET /users/{id}/assets?resources
получить информацию об использовании всех ресурсов
GET /users/{id}/assets?resources={type}
получить информацию об использовании ресурсов типа type

_id, masterRegion, userId, filesType, filesCount, totalSize


