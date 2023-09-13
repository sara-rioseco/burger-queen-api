# Burger Queen - API con Node.js

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Requerimientos del cliente](#2-requerimientos-del-cliente)
* [3. Recursos y documentación](#3-recursos-y-documentaci%C3%B3n)
* [4. Integración con Docker](#4-integraci%C3%B3n-con-docker)
* [5. Consideraciones](#6-consideraciones)
* [6. Despliegue](#7-despliegue)
* [7. Testing](#8-testing)
* [8. Organización](#8-organizaci%C3%B3n)
* [9. Criterios de aceptación](#9-criterios-de-aceptaci%C3%B3n)
* [10. Objetivos de aprendizaje](#10-objetivos-de-aprendizaje)

## 1. Resumen del proyecto

![Node.js logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)

Un pequeño restaurante de hamburguesas, que está creciendo, necesita un
sistema a través del cual puedan tomar pedidos usando una _tablet_, y enviarlos
a la cocina para que se preparen ordenada y eficientemente.

Este proyecto tiene dos áreas: interfaz web (cliente) y API (servidor). Nuestra
clienta nos ha solicitado desarrollar la API que se puede integrar con la
interfaz, que otro equipo de desarrolladoras está trabajando simultáneamente.

## 2. Requerimientos del cliente

Con una API en este caso nos referimos a un _servidor web_, que es
básicamente un programa que _escucha_ en un puerto de red, a través del cual
podemos enviarle _consultas_ (_request_) y obtener _respuestas_ (_response_)
usando el protocolo HTTP (o HTTPS).

Un servidor web debe _manejar_ consultas entrantes y producir respuestas a esas
consultas que serán enviadas de vuelta al _cliente_. Cuando hablamos de
_aplicaciones de servidor_, esto implica una arquitectura de _cliente/servidor_,
donde el cliente es un programa que hace consultas a través de una red (por
ejemplo el navegador, cURL, etc.), y el _servidor_ es el programa que recibe
estas consultas y las responde.

[Node.js](https://nodejs.org/) nos permite crear servidores web súper eficientes
de manera relativamente simple y todo esto usando JavaScript!

En este proyecto partimos de un _boilerplate_ que ya contiene una serie de
_endpoints_ (puntos de conexión o URLs) y nos piden completar la aplicación.
Esto implica que tendremos que partir por leer la implementación existente, y
familiarizarnos con el _stack_ elegido ([Node.js](https://nodejs.org/) y
[Express](https://expressjs.com/)) y complementarlo con un motor de bases de
datos. Recomendamos el uso de [MongoDB](https://www.mongodb.com/) y tenemos una
[guía para empezar con MongoDB](https://github.com/Laboratoria/DEV004-burger-queen-api/blob/main/guides/GETTING-STARTED-MONGODB.md).

La clienta nos ha dado un [link a la documentación](https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0)
que especifica el comportamiento esperado de la API que expondremos por
HTTP. Ahí puedes encontrar todos los detalles de qué _endpoints_ debe
implementar la aplicación, qué parámetros esperan, qué deben responder, etc.

El objetivo principal de aprendizaje es adquirir experiencia con **Node.js**
como herramienta para desarrollar _aplicaciones de servidor_, junto con una
serie de herramientas comunes usadas en este tipo de contexto (Express como
framework, MongoDB como base datos, etc).

En este proyecto tendrás que construir un servidor web que debe _servir_ `JSON`
sobre `HTTP`, y desplegarlo en un servidor en la nube.

Para completar el proyecto tendrás que familiarizarte con conceptos como
**rutas** (_routes_), **URLs**, **HTTP** y **REST** (verbs, request, response,
headers, body, status codes...), **JSON**, **JWT** (_JSON Web Tokens_),
**conexión con una base datos** (`MongoDB`),
**variables de entorno**, **deployment**, etc.

## 3. Recursos y documentación

## 4. Consideraciones generales

Este proyecto se realizará en duplas y podrá integrarse con el proyecto
[Burger Queen API client](../04-burger-queen-api-client)
que desarrolle simultáneamente el equipo de Frontend developers de tu squad.

La lógica del proyecto debe estar implementada completamente en JavaScript.
En este proyecto está permitido usar librerías o frameworks, asi como
extensiones al lenguaje con `babel` (caso en el cual deberás incluir un
comando `npm run build`).

Los tests deben cubrir un mínimo del 90% de _statements_, _functions_,
_lines_ y _branches_. Si bien el boilerplate no incluye la configuración para
pruebas unitarias, estas son obligatorias.

Otro requerimiento del equipo de QA de nuestra clienta es realizar
**pruebas _end-to-end_**, que usaremos para verificar el comportamiento desde el
punto de vista de HTTP, desde afuera del servidor. Estos tests, a diferencia de
las pruebas unitarias, no prueban cada pieza por separado sino que prueban la
aplicación completa, de principio a fin. Estas pruebas, al no hacer uso directo
del código fuente de la aplicación, pueden ejecutarse directamente sobre una URL
remota, ya que la interfaz sometida a pruebas es HTTP.

El _boilerplate_ ya contiene el setup y configuración
necesaria para ejecutar todos los tests _end-to-end_ con el comando `npm run test:e2e`.

```sh
# Corre pruebas e2e sobre instancia local. Esto levanta la aplicación con npm
# start y corre los tests contra la URL de esta instancia (por defecto
# http://127.0.0.1:8080).
npm run test:e2e

# Corre pruebas e2e sobre URL remota
REMOTE_URL=<TODO: poner URL> npm run test:e2e
```

Las pruebas _end-to-end_ ya están completas en el _boilerplate_, así que puedes
usarlas como guía de implementación y checklist de completitud.

## 5. ## 7. Pistas, tips y lecturas complementarias

### Primeros pasos

> :information_source: Antes de comenzar a programar te recomendamos leer y
> seguir con detenimiento la [**guía de _primeros pasos_**](https://github.com/Laboratoria/DEV002-burger-queen-api/blob/main/GETTING-STARTED.md)
> para ayudarte con el stack recomendado y configurar tu entorno de desarrollo.

### Otros recursos

* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
* [docker](https://docs.docker.com/)
* [docker compose](https://docs.docker.com/compose/)
* [¿Qué es Docker? | Curso de Docker | Platzi Cursos](https://youtu.be/hQgvt-s-AHQ)
* [Postman](https://www.getpostman.com)
* [Variable de entorno - Wikipedia](https://es.wikipedia.org/wiki/Variable_de_entorno)
* [`process.env` - Node.js docs](https://nodejs.org/api/process.html#process_process_env)

## 8. Organización

## 9. Criterios de aceptación

Todos los criterios de aceptación mínimos del proyecto fueron logrados.
A continuación el detalle de cada uno:

### 9.1 API

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

### 9.2 CLI

La API se puede ejecutar con el comando **`npm start`**
Esto se encargará de cargar nuestra aplicación node y además puede recibir el puerto al que escuchar.

#### 9.2.1 Argumentos de línea de comando

Podemos especificar el puerto en el que debe arrancar la aplicación pasando un
argumento a la hora de invocar nuestro programa:

```sh
# Arranca la aplicación en el puerto 8888 usando npm
npm start 8888
```

#### 9.2.2 Variables de entorno

Nuestra aplicación usa las siguientes variables de entorno:

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

### 9.3 Despliegue (Deployment)

El despliegue fue realizado con la plataforma [Fl0](https://www.fl0.com) en conjunto con [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Se puede acceder a él desde el enlace: [https://burger-queen-api-wp1d-dev.fl0.io/](https://burger-queen-api-wp1d-dev.fl0.io/)

### 9.4 Hacker Edition - Integración con Docker (DevOps) 

Nuestro proyecto tiene la configuración necesaria para ser ejecutado con Docker,
utilizando el comando `docker compose up`.
Esto correra un multicontenedor que contiene dos imágenes, una para el servicio
de la database de MongoDB y otra para el servicio de Node.

## 10. Objectivos de aprendizaje

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
- [ ] **CORS (Cross-Origin Resource Sharing)**

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
