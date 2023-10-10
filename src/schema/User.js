const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      //format: "email",
    },
    password: {
      type: "string",
      minLength: 7,
      maxLength: 100,
    },
    role: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = { userSchema };
