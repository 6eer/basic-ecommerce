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

## Start the app

The backend uses Docker, so to use the application, you need to use the following commands:

- First: docker-compose build
- Second: docker-compose up

## Sample video

- https://www.youtube.com/watch?v=y94WfDrs1wM
