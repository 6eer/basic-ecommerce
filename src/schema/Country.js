const countrySchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["name"],
  additionalProperties: false,
};

const countryParamsSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

module.exports = { countrySchema, countryParamsSchema };
