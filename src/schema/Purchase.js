const PurchaseSchema = {
  type: "object",
  properties: {
    city: {
      type: "string",
      minLength: 1,
    },
    postalCode: {
      type: "number",
      minLength: 4,
    },
    street: {
      type: "string",
      minLength: 1,
    },
    streetHeight: {
      type: "number",
      minLength: 1,
    },
  },
  required: ["city", "postalCode", "street", "streetHeight"],
  additionalProperties: false,
};

module.exports = { PurchaseSchema };
