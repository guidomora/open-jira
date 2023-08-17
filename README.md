# Next.js Openjira App
Para correr localmente, se necesita la base de datos

docker-compose up -d

* El -d significa  __detached__

* MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```
## Configurar las variables de entorno:

Renombrar el archivo __.env.template__ a __.env__

## Llenar la db con info de prueba

Llamar a:

```
http://localhost:3000/api/seed

```
## Como luce la web app

![](https://firebasestorage.googleapis.com/v0/b/portafolio-ce203.appspot.com/o/OpenJira1.jpg?alt=media&token=480b4a48-8e0f-4b7a-98de-3b9f90cdcf97)

## Agregando una nueva tarea

![](https://firebasestorage.googleapis.com/v0/b/portafolio-ce203.appspot.com/o/OpenJira2.jpg?alt=media&token=d033aea0-83d5-4970-83c5-fe7833e81fe6)

## Editando una tarea

![](https://firebasestorage.googleapis.com/v0/b/portafolio-ce203.appspot.com/o/OpenJira3.jpg?alt=media&token=749a599e-ecaf-412f-b52f-fa87b3cb124f)