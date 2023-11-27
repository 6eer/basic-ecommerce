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

    quantity: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["productId", "quantity", "productName", "productPrice"],
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
