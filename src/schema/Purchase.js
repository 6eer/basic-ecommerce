const PurchaseSchema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      minLength: 1,
    },
    name: {
      type: "string",
      minLength: 1,
    },
    street: {
      type: "string",
      minLength: 1,
    },
    building: {
      type: "string",
    },
    city: {
      type: "string",
      minLength: 1,
    },
    province: {
      type: "string",
    },
    postalCode: {
      type: "number",
    },
    phoneNumber: {
      type: "number",
    },
  },
  required: ["country", "name", "street", "city", "postalCode", "phoneNumber"],
  additionalProperties: false,
};

module.exports = { PurchaseSchema };
