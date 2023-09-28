const productSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 0,
    },
    price: {
      type: "number",
      minimum: 0,
    },
    stock: {
      type: "integer",
      minimum: 0,
    },
    description: {
      type: "string",
      minLength: 0,
    },
    sellerId: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["sellerId"],
};

module.exports = productSchema;
