const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const Country = require("./routes/Country");
const User = require("./routes/User");
const Product = require("./routes/Product");
const Seller = require("./routes/Seller");
const Cart = require("./routes/Cart");

const app = express();

//Middlewares
app.use(express.json());

app.use(Country);
app.use(User);
app.use(Product);
app.use(Seller);
app.use(Cart);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.resolve(__dirname, "routes/*.js")],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
