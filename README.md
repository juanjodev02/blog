# Club de software EPN
Para ejecutar el proyecto de forma local se necesita seguir los siguientes pasos:
1.  Instalar dependencias
    ```
      yarn
    ```

2. Tener una base de datos corriendo en la máquina local, se debe contar con la URI de conexión
    > Este proyecto es agnóstico a la base de datos, por lo que cualquier motor de base de datos será útil

3. Debes crear un archivo llamado `.env` en el directorio raíz el proyecto, dentro del archivo debes colocar las variables de entorno necesarias para el proyecto
    > Dentro del archivo `.env.example` tienes un ejemplo de cuales son las variables de entorno.
4. En un terminal, ejecuta el comando para sincronizar la base de datos
    ```
    yarn prisma migrate dev
    ```
    Con esto se creará una base de datos y el esquema necesario para el proyecto

5. Ahora si, todo listo se puede ejecutar el proyecto
    ```
    yarn dev
    ```