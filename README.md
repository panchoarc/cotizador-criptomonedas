# Aplicación de Criptomonedas

## Demo Online [Demo de Prueba](https://panchoarc.github.io/cotizador-criptomonedas/)

## Tecnologías Utilizadas

- [Emotion](https://emotion.sh/docs/introduction)

Emotion es una librería diseñada para escribir estilos css con Javascript

- [Create React App](https://create-react-app.dev/docs/getting-started/)

Herramienta oficial para la creación de SPA (Single Page Applications) utilizando react para la construcción rápida sin configuración.

- [Axios](https://github.com/axios/axios)

Cliente HTTP basado en promesas

## Scripts Disponibles

### `npm start` o `yarn start`

Nos permite iniciar la aplicación en modo desarrollo

### `npm run build`

Nos permite crear el bundle de producción. Este bundle se localiza en **build**

### `npm run predeploy`

Nos permite crear el bundle de producción que posteriormente podrá ser desplegado en [Github Pages](https://pages.github.com/)

### `npm run deploy`

Nos permite subir la aplicación anteriormente creada en la carpeta **build** en Github Pages.

## Docker

Si desea levantar la aplicación en un contenedor de Docker, utilice la siguiente sintaxis:

```docker
docker build -t <NombreAplicación> .
```
