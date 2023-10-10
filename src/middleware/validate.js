const Ajv = require("ajv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

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

const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader) {
      throw new HttpError("Auth Failed, no token found", 401);
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.userId, token: token },
    });

    if (!user) {
      throw new HttpError("Auth Failed, no user found", 401);
    }

    //Agregamos el objeto (user) a la request
    req.user = user;
    next();
  } catch (error) {
    console.log("aca?");
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = { validate, validateParams, auth };
