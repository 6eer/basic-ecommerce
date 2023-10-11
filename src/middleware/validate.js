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

//Como el token no se almacena en la BD, el findOne solamente se hace con el ID decodificado del token que manda el cliente. Si existe un user con ese ID, esta autentificado correctamente.
const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader) {
      throw new HttpError("Auth Failed, no token found", 401);
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new HttpError("Auth Failed, no user found", 401);
    }

    //Agregamos el objeto (user) a la request

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Auth Failed, Token expired" });
    }
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

function roleCheck(requiredRole) {
  return function (req, res, next) {
    const userRole = req.user.role;

    if (userRole === requiredRole) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }
  };
}

module.exports = { validate, validateParams, auth, roleCheck };
