const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 7,
      maxLength: 100,
    },
    role: {
      type: "string",
      enum: ["admin", "user", "seller"],
    },
  },
  // required: ["email", "password", "name", "role"],
  required: ["email", "password", "name"],
  additionalProperties: false,
};

const userParamsSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

const userSchemaLogIn = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
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
      format: "email",
    },
    password: {
      type: "string",
      minLength: 7,
      maxLength: 100,
    },
  },
  additionalProperties: false,
};

module.exports = {
  userSchema,
  userSchemaUpdate,
  userSchemaLogIn,
  userParamsSchema,
};
