# React Frontend - README

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/usuario/repositorio.git
    cd react-frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

## Compilación

1. Compila la aplicación para producción:
    ```bash
    npm run build
    ```

    Los archivos compilados estarán en la carpeta `build`.

## Ejecución

1. Ejecuta la aplicación en modo desarrollo:
    ```bash
    npm start
    ```

2. Abre tu navegador en [http://localhost:3000](http://localhost:3000).

## Construcción y Ejecución con Docker

### Construir la Imagen Docker

1. Asegúrate de tener Docker instalado en tu sistema.
2. Construye la imagen Docker:
    ```bash
    docker build -t react-frontend .
    ```

### Ejecutar la Imagen Docker

1. Ejecuta el contenedor:
    ```bash
    docker run -p 3000:3000 react-frontend
    ```

2. Abre tu navegador en [http://localhost:3000](http://localhost:3000).
