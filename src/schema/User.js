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
  required: ["email", "password", "name", "role"],
  additionalProperties: false,
};

const userSchemaLogIn = {
  type: "object",
  properties: {
    email: {
      type: "string",
      //format: "email",
    },
    password: {
      type: "string",
      minLength: 7,
      maxLength: 100,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const userSchemaUpdate = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      minLength: 7,
      maxLength: 100,
    },
  },
  additionalProperties: false,
};

module.exports = { userSchema, userSchemaUpdate, userSchemaLogIn };
