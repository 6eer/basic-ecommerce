const Ajv = require("ajv");

const validate = (schema) => {
  const ajv = new Ajv();
  return (req, res, next) => {
    const validateData = ajv.compile(schema);
    const valid = validateData(req.body);
    if (!valid) {
      return res.status(400).json({ errors: validateData.errors });
    }
    next();
  };
};

const validateParams = (paramsSchema) => {
  const ajv = new Ajv();
  return (req, res, next) => {
    req.params.id = Number(req.params.id);
    const valid = ajv.validate(paramsSchema, req.params);
    if (!valid) {
      return res.status(400).json(ajv.errors);
    }
    next();
  };
};

module.exports = { validate, validateParams };
