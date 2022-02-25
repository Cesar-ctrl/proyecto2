# Getting Started with Create React App

Este proyecto ha sido hecho con el framework React

## Puerto

Se despliega en el puerto [http://localhost:3000](http://localhost:3000) en el navegador.

La página se recarga al hacer cambios.

Está desplegada en GitHub Pages (https://cesar-ctrl.github.io/proyecto2/)
Cancel changes
## Uso

Es un Crud de tareas conectado a una base de FireStore, añade, modifica y elimina tareas. Y se mandan los cambios en la base de datos donde se guardan.

## Deploy

Abrimos nuestra terminal y nos dirigimos al directorio donde se encuentra nuestro proyecto.
Instalamos Gh-pages mediante este comando:

### `npm install --save-dev gh-pages`

Abrimos el archivo package.json que se encuentra en nuestro proyecto y agregamos la propiedad homepage de esta manera:

### `"homepage":"https://yourusername.github.io/repository-name"`

En el mismo archivo package.json agregamos los siguientes scripts:

### `"predeploy": "npm run build"`
### `"deploy": "gh-pages -d build"`

Volvemos a nuestra terminal y ejecutamos:

### `npm run build`
### `npm run deploy`

Si el proceso fue exitoso, la terminal nos mostrará la dirección de nuestro proyecto ya desplegado con GitHub-Pages.

