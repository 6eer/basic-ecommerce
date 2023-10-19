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
      title: "Basic-Ecommerce",
      version: "1.0.0",
      description: "My first app",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [path.resolve(__dirname, "swaggerDocumentation/*.js")],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
