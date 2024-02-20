## Basic Ecommerce - Backend

This is the code corresponding to the backend of my ecommerce application, which includes:

- A 'controllers' folder containing files where each one contains the endpoints related to a specific model (example: User).
- A 'database' folder where the connection to the database is established and it can be configured to use either a local database or the option with Docker.
- A 'middleware' folder where the ajv library is used to perform different data validations.
- A 'models' folder where the database models are developed.
- A 'routes' folder where the routes for the different HTTP endpoints are located.
- A 'schema' folder where the validations that the middleware must perform are defined, i.e., what the data is compared against.
- A 'swaggerDocumentation' folder where the documentation for the HTTP endpoints is created.
- A 'test' folder containing unit tests performed for the endpoints, using Jest and Mocking.
- The JSON files and other configuration files of dependencies used for the app's operation.

## Enviroment variables 

It is necessary to define a .env file with the necessary environment variables for the proper functioning of the app. The file should be named dev.env and be contained within a folder named development, which in turn is contained within a folder named config at the root of the project.

If you intend to run the app on a local PostgreSQL database on your computer, first you will need to install it on your computer, and upon completion of the installation, you will be prompted to define a password for the server and for the user postgres. Finally, you must create the database on the defined server, whose name must match the DB_NAME2 you define.
Once you've done that, the variables you'll need to define are:
  - NODE_ENV=development 
  - DB_NAME2= the name you want for your database. 
  - DB_ENGINE= postgres 
  - DB_PASSWORD2 = the password you set during the PostgreSQL installation.
  - DB_HOST2= localhost (the database is on the local machine)
  - DB_DIALECT= postgres
  - JWT_SECRET= the secret you want to be encrypted in the JWT. 


If you want to run the app using Docker, the first thing you'll need is to have Docker Desktop installed and running.
Once you've done that, the variables you'll need to define are:
  - NODE_ENV=production
  - DB_NAME= the name you want for your database. 
  - DB_USERNAME=postgres
  - DB_PASSWORD= the password you want for your database. 
  - DB_HOST=db 
  - DB_DIALECT=postgres
  - POSTGRES_USER=postgres
  - POSTGRES_PASSWORD= the password of your database (equals db_password)
  - POSTGRES_DB= the name of your database (equals db_name)
  - PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org
  - PGADMIN_DEFAULT_PASSWORD=admin 
  - JWT_SECRET= the secret you want to be encrypted in the JWT. 
  
There are 3 images available in Docker: the app, PostgreSQL, and pgAdmin. Therefore, more environment variables are needed.

Regarding pgAdmin, if you access  [http://localhost:5050](http://localhost:5050), you can log in using the values defined in the 2 pgAdmin variables. Once logged in, you need to add a server using "Add New Server", where: in the name, you can put any desired name, and in the Connection section, the Host name is defined in db_host, the username is defined in postgres_user, and the password is defined in postgres_password.
Once this is done, we can access the server, and we'll see that the database in question is inside.
Additionally, the Docker Compose has defined a volume, which ensures that the information we add to the database persists.

## Start the app

- If you opt for the local version, you should use:
  - npm install
  - npm run startLocal 
Once the app is up and running, you can view the results at: [http://localhost:3000](http://localhost:3000)

- If you opt for the Docker version, you should use: 
  - docker-compose build
  - docker-compose up
Once the app is up and running, you can view the results at: [http://localhost:3000](http://localhost:3000)

## Sample video

- https://www.youtube.com/watch?v=y94WfDrs1wM
