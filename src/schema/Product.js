const productSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
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
  required: ["sellerId", "name"],
};

const productParamsSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

module.exports = { productSchema, productParamsSchema };
