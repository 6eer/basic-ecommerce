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

module.exports = validate;
