# Дипломная работа для fullstack-разработчика - облачное хранилище

## Frontend
Frontend собран для IP адресса сервера 193.227.241.7.

Чтобы запустить проект на собственном сервере необходимо указать новый IP адресс в переменной serverURL файла "src/URLs/urls.js".

Для этого скопируйте данный репозиторий на локальный компьютер:
```bash
git clone https://github.com/Sergio210-05/file_sharing.git frontend  
```
В в папке src/URLs/ откройте файл urls.js и поменяйте значение константы serverURL:
```bash
nano frontend/file_sharing/src/URLs/urls.js
```
Вместо 193.227.241.7 укадите IP адресс Вашего сервера.

Пересоберите проект командой:
```bash
npm run build
```
Сохраните проект в Вашем репозитории на GitHUb и приступайте к запуску backend.

## Backend
Код серверной части приложения с инструкцией по развёртыванию на сервере находится по ссыдке:  
https://github.com/Sergio210-05/file_sharing_backend.git
