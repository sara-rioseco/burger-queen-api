# Burger Queen API (NodeJS)🍔

## Índice 📖

* [1. Resumen del proyecto 📄](#1-resumen-del-proyecto-)
* [2. Requerimientos del cliente 💁](#2-requerimientos-del-cliente-)
* [3. Recursos y documentación 📑](#3-recursos-y-documentaci%C3%B3n-)
* [4. Integración con Docker 🐋](#4-integraci%C3%B3n-con-docker-)
* [5. Consideraciones ❕](#5-consideraciones-)
* [6. Despliegue 🚀](#6-despliegue-)
* [7. Testing 🤡](#7-testing-)
* [8. Organización 📆](#8-organizaci%C3%B3n-)
* [9. Criterios de aceptación ☑️](#9-criterios-de-aceptaci%C3%B3n-)
* [10. Objetivos de aprendizaje 👩‍🎓](#10-objetivos-de-aprendizaje-)

## 1. Resumen del proyecto 📄

Esta API es la segunda parte de nuestro proyecto final en el bootcamp de 
Desarrollo Web en Laboratoria y está pensado para ser utilizado como back-end 
en integración con la interfaz implementada en el proyecto anterior 
llamada (Burger Queen API Client).

Esta API ha sido creada para un pequeño restaurante, que necesita manejar y 
amdinistrar sus productos y pedidos a través de un dispositivo tablet.
Para esto se utiliza una base de datos y un servidor que recibirá y enviará información 
de usuarios, productos y órdenes según el usuario necesite.

Al inicializar el servidor, este verificará si existe un usuario administrador, 
si esto no es así, creará uno con las credenciales por defecto.
Cada usuario tendrá un rol, que puede ser "admin", "waiter" o "chef" y dependiendo 
de su rol, podrá interactuar de distintas formas con la base de datos.


## 2. Requerimientos del cliente 💁

La clienta nos ha dado un [link a la documentación](https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0)
que especifica el comportamiento esperado de la API que expondremos por
HTTP. Ahí se pueden encontrar todos los detalles de qué _endpoints_ debe
implementar la aplicación, qué parámetros esperan, qué deben responder, etc.

## 3. Recursos y documentación 📑

`PENDING...`

## 4. Integración con Docker 🐋

Nuestro proyecto tiene la configuración necesaria para ser ejecutado con Docker,
utilizando el comando `docker compose up`.
Esto correra un multicontenedor que contiene dos imágenes, una para el servicio
de la database de [MongoDB](https://www.mongodb.com/) y otra para el servicio de [Node](https://nodejs.org/).

## 5. Consideraciones ❕

La API expone los siguientes endpoints:

#### 9.1.1 `/`
* [x] `GET /`

#### 9.1.2 `/auth`
* [x] `POST /auth`

#### 9.1.3 `/users`
* [x] `GET /users`
* [x] `GET /users/:uid`
* [x] `POST /users`
* [x] `PATCH /users/:uid`
* [x] `DELETE /users/:uid`

#### 9.1.4 `/products`
* [x] `GET /products`
* [x] `GET /products/:productid`
* [x] `POST /products`
* [x] `PATCH /products/:productid`
* [x] `DELETE /products/:productid`

#### 9.1.5 `/orders`
* [x] `GET /orders`
* [x] `GET /orders/:orderId`
* [x] `POST /orders`
* [x] `PATCH /orders/:orderId`
* [x] `DELETE /orders/:orderId`

La API se puede ejecutar con el comando **`npm start`**
Esto se encargará de cargar nuestra aplicación node.
Opcionalmente, podemos especificar el puerto en el que debe arrancar la aplicación pasando un
argumento a la hora de invocar nuestro programa:

```sh
# Arranca la aplicación en el puerto 8888 usando npm
npm start 8888
```
El proyecto usa las siguientes variables de entorno:

* `PORT`: Si no se ha especificado un puerto como argumento de línea de comando,
  podemos usar la variable de entorno `PORT` para especificar el puerto. Valor
  por defecto `8080`.
* `DB_URL`: El _string_ de conexión de _MongoDB_.
* `JWT_SECRET`: Nuestra aplicación implementa autenticación usando JWT (JSON
  Web Tokens). Para poder usar JWT es necesario este "secreto".
* `ADMIN_EMAIL`: Opcionalmente podemos especificar un email y password para
  el usuario admin (root). Si estos detalles están presentes la aplicación se
  asegurará que exista el usuario y que tenga permisos de administrador. Valor
  por defecto `admin@localhost`.
* `ADMIN_PASSWORD`: Si hemos especificado un `ADMIN_EMAIL`, debemos pasar
  también una contraseña para el usuario admin. Valor por defecto: `changeme`.

## 6. Despliegue 🚀

El despliegue de la API fue realizado con [vercel](https://vercel.com/).

Se puede acceder a él desde el enlace: [https://bq-api.vercel.app/](https://bq-api.vercel.app/)

## 7. Testing 🤡

La API fue testeada con pruebas unitarias y end-to-end (e2e). Los resultados son los siguientes:

### 7.1 Pruebas unitarias (unit testing)

`PENDING...` 

### 7.2 Pruebas E2E

A continuación, presentamos los resultados de las pruebas E2E.

![Resultados pruebas end-to-end](https://raw.githubusercontent.com/sara-rioseco/burger-queen-api/main/assets/e2e-tests.PNG)

## 8. Organización 📆

Para nuestra organización y planificación utilizamos la herramienta Trello.
A continuación una imágen de nuestras tareas y cómo estas fueron distribuidas en cada sprint.

![Planificación en Trello](https://raw.githubusercontent.com/sara-rioseco/burger-queen-api/main/assets/trello.PNG)

## 9. Criterios de aceptación ☑

Todos los criterios de aceptación mínimos del proyecto fueron logrados.
A continuación el detalle de cada uno:

### 9.1 API, exponer los endpoints mínimos: ✔️
#### 9.1.1 Rutas `/` ✔️
#### 9.1.2 Rutas `/auth` ✔️
#### 9.1.3 Rutas `/users` ✔️
#### 9.1.4 Rutas `/products` ✔️
#### 9.1.5 Rutas `/orders` ✔️
### 9.2 CLI ✔️
#### 9.2.1 Argumentos de línea de comando ✔️
#### 9.2.2 Variables de entorno ✔️
### 9.3 Despliegue (Deployment) ✔️
### 9.4 Hacker Edition - Integración con Docker (DevOps) ✔️

## 10. Objetivos de aprendizaje 👩‍🎓

### Node.js

- [x] **Instalar y usar módulos con npm**
- [x] **Configuración de package.json**
- [x] **Configuración de npm-scripts**

### JavaScript

- [ ] **Pruebas unitarias (unit tests)** `PENDING`
- [ ] **Pruebas asíncronas** `PENDING`
- [ ] **Uso de mocks y espías** `PENDING`
- [x] **Pruebas de integración (end-to-end)**
- [x] **Módulos de ECMAScript (ES Modules)**
- [x] **Módulos de CommonJS**
- [x] **Uso de linter (ESLINT)**
- [x] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Control de Versiones (Git y GitHub)

- [X] **Git: Instalación y configuración**
- [X] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**
- [X] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**
- [X] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**
- [X] **GitHub: Despliegue con GitHub Pages**
- [X] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**
- [X] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### Express.js

- [X] **Manejo de rutas**
- [X] **Uso y creación de middleware**

### HTTP

- [X] **Consulta o petición (request) y respuesta (response).**
- [X] **Cabeceras (headers)**
- [x] **Cuerpo (body)**
- [x] **Verbos HTTP**
- [x] **Códigos de status de HTTP**
- [x] **Encodings y JSON**
- [x] **CORS (Cross-Origin Resource Sharing)**

### Autenticación

- [x] **JWT (JSON Web Token)**
- [x] **Almacenamiento y acceso de contraseñas**

### WebOps

- [x] **Variables de entorno**
- [x] **Contenedores (Docker)**
- [x] **Docker compose**
- [x] **Cloud Functions**

### MongoDB

- [x] **Operaciones CRUD (Create-Read-Update-Delete)**
- [x] **Modelos y esquemas de datos**
- [x] **Respaldo y restauración (backup/restore)**

### Bases de datos

- [x] **Modelado de datos**
- [x] **Conexión**
