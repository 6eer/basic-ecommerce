const cartItemSchema = {
  type: "object",
  properties: {
    productId: {
      type: "integer",
    },
    productName: {
      type: "string",
      minLength: 1,
    },
    productPrice: {
      type: "number",
    },
    productStock: {
      type: "integer",
    },
    quantity: {
      type: "integer",
      minimum: 1,
    },
  },
  required: [
    "productId",
    "quantity",
    "productName",
    "productPrice",
    "productStock",
  ],
  additionalProperties: false,
};

const cartItemDeleteSchema = {
  type: "object",
  properties: {
    productId: {
      type: "integer",
    },
  },
  required: ["productId"],
  additionalProperties: false,
};

module.exports = { cartItemSchema, cartItemDeleteSchema };
