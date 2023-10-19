const request = require("supertest");
const app = require("../../src/app");
const Product = require("../../src/models/Product");
const Seller = require("../../src/models/Seller");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cart = require("../../src/models/Cart");

beforeEach(async () => {
  jest.resetAllMocks();
});

afterEach(async () => {
  jest.restoreAllMocks();
});

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

///////////////////////// POST: Sign Up User

test("new user (with mock): should return 201 status", async () => {
  User.findOne = jest.fn().mockResolvedValue(null);

  User.create = jest.fn().mockResolvedValue({
    id: 101,
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  Cart.create = jest.fn().mockResolvedValue(true);

  bcrypt.hash.mockResolvedValue("hashedDummyPassword");

  jwt.sign.mockReturnValue("dummyToken");

  const response = await request(app).post("/users").send({
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty("token", "dummyToken");
  expect(response.body).toHaveProperty("message", "The sign up was succesfull");
});

test("new user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/users").send({
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(response.statusCode).toBe(400);

  expect(response.body).toHaveProperty("message", "Name is not available");
});

test("new user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne
    .mockImplementationOnce(() => null)
    .mockImplementationOnce(() => true);

  const response = await request(app).post("/users").send({
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(response.statusCode).toBe(400);

  expect(response.body).toHaveProperty("message", "Email is not available");
});

test("new user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/users").send({
    name: 1,
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/name",
        schemaPath: "#/properties/name/type",
        keyword: "type",
        params: { type: "string" },
        message: "must be string",
      },
    ],
  });
});

test("new user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/users").send({
    name: 1,
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/name",
        schemaPath: "#/properties/name/type",
        keyword: "type",
        params: { type: "string" },
        message: "must be string",
      },
    ],
  });
});

test("new user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/users").send({
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "wrongRole",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/role",
        keyword: "enum",
        message: "must be equal to one of the allowed values",
        params: {
          allowedValues: ["admin", "user", "seller"],
        },
        schemaPath: "#/properties/role/enum",
      },
    ],
  });
});

test("new user (with mock), server error: should return 500 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(null);

  User.create = jest.fn().mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).post("/users").send({
    name: "TestUser",
    email: "testemail@gmail.com",
    password: "testpassword",
    role: "user",
  });

  expect(User.create).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// POST: Log in user

test("log in user (with mock): should return 200 status", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  bcrypt.compare.mockResolvedValue(true);

  jwt.sign.mockReturnValue("dummyToken");

  // Making a POST request to the signup route
  const response = await request(app).post("/users/login").send({
    email: "testemail@gmail.com",
    password: "testpassword",
  });

  expect(User.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("token", "dummyToken");
  expect(response.body).toHaveProperty("message", "The login was succesfull");
});

test("log in user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(null);

  const response = await request(app).post("/users/login").send({
    email: "testemail@gmail.com",
    password: "testpassword",
  });

  expect(User.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message", "Unable to login");
});

test("log in user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => null);

  const response = await request(app).post("/users/login").send({
    email: "testemail@gmail.com",
    password: "testpassword",
  });

  expect(User.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message", "Unable to login");
});

test("log in user (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/users/login").send({
    email: 1,
    password: "testpassword",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/email",
        schemaPath: "#/properties/email/type",
        keyword: "type",
        params: { type: "string" },
        message: "must be string",
      },
    ],
  });
});

test("log in user (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/users/login").send({
    password: "testpassword",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "",
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "email" },
        message: "must have required property 'email'",
      },
    ],
  });
});

test("log in user (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/users/login").send({
    email: "testemail@gmail.com",
    password: "testpassword",
    aditional: "wrong",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "",
        schemaPath: "#/additionalProperties",
        keyword: "additionalProperties",
        params: { additionalProperty: "aditional" },
        message: "must NOT have additional properties",
      },
    ],
  });
});

test("log in user (with mock), server error: should return 500 status and error message", async () => {
  User.findOne = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).post("/users/login").send({
    email: "testemail@gmail.com",
    password: "testpassword",
  });

  expect(User.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// GET: Get users

test("get all users (with mock): should return mock data and 200 status", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  User.findAll = jest.fn().mockResolvedValue([
    {
      id: 66,
      name: "Example User",
      email: "exampleemail@hotmail.com",
      role: "admin",
    },

    {
      id: 56,
      name: "Example User2",
      email: "exampleemail2@hotmail.com",
      role: "seller",
    },
  ]);

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const response = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(User.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([
    {
      id: 66,
      name: "Example User",
      email: "exampleemail@hotmail.com",
      role: "admin",
    },
    {
      id: 56,
      name: "Example User2",
      email: "exampleemail2@hotmail.com",
      role: "seller",
    },
  ]);
});

test("get all users (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).get("/users");

  expect(response.statusCode).toBe(401);
  expect(response.body).toEqual({ message: "Auth Failed, no token found" });
});

test("get all users (with mock), bad request: should return 400 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue(null);

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const response = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(401);
  expect(response.body).toEqual({ message: "Auth Failed, no user found" });
});

test("get all users (with mock), server error: should return 500 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });
  User.findAll = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(User.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// POST: Log out user

test("log out user (with mock): should return mock data and 200 status", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const response = await request(app)
    .post("/users/logout")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ message: "The logout was succesfull" });
});

///////////////////////// GET: Get user

test("get user (with mock): should return mock data and 200 status", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  User.findByPk = jest.fn().mockResolvedValue({
    id: 56,
    name: "Example User2",
    email: "exampleemail2@hotmail.com",
    role: "seller",
  });

  const response = await request(app)
    .get("/users/56")
    .set("Authorization", `Bearer ${token}`);

  expect(User.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 56,
    name: "Example User2",
    email: "exampleemail2@hotmail.com",
    role: "seller",
  });
});

test("get user (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).get("/users/WrongId");

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual([
    {
      instancePath: "/id",
      schemaPath: "#/properties/id/type",
      keyword: "type",
      params: { type: "integer" },
      message: "must be integer",
    },
  ]);
});

test("get user (with mock): should return mock data and 404 status", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  User.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app)
    .get("/users/56")
    .set("Authorization", `Bearer ${token}`);

  expect(User.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "User not found" });
});

test("get user (with mock), server error: should return 500 status and error message", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  User.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app)
    .get("/users/56")
    .set("Authorization", `Bearer ${token}`);

  expect(User.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// GET: Get profile

test("get profile (with mock): should return mock data and 200 status", async () => {
  User.findOne = jest.fn().mockResolvedValue({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const response = await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });
});

///////////////////////// PUT: Update profile

test("update profile (with mock): should return mock data and 200 status", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");
  const mockSave = jest.fn();

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
    save: mockSave,
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  findOneSpy.mockImplementationOnce(() => Promise.resolve(null));

  const response = await request(app)
    .put("/users/me")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Example User Changed" });

  findOneSpy.mockRestore();

  expect(mockSave).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 66,
    name: "Example User Changed",
    email: "exampleemail@hotmail.com",
    role: "admin",
  });
});

test("update profile (with mock), bad request: should return 400 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  findOneSpy.mockImplementationOnce(() => Promise.resolve(true));

  const response = await request(app)
    .put("/users/me")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Example User Changed" });

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({ message: "Name is not available" });
});

test("update profile (with mock), bad request: should return 400 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  findOneSpy.mockImplementationOnce(() => Promise.resolve(true));

  const response = await request(app)
    .put("/users/me")
    .set("Authorization", `Bearer ${token}`)
    .send({ email: "ExampleUserChanged@hotmail.com" });

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({ message: "Email is not available" });
});

test("update profile (with mock), bad request: should return 400 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  findOneSpy.mockImplementationOnce(() => Promise.resolve(null));

  const response = await request(app)
    .put("/users/me")
    .set("Authorization", `Bearer ${token}`)
    .send({ email: 1 });

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/email",
        schemaPath: "#/properties/email/type",
        keyword: "type",
        params: { type: "string" },
        message: "must be string",
      },
    ],
  });
});

test("update profile (with mock), server error: should return 500 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  findOneSpy.mockImplementationOnce(() =>
    Promise.reject(new Error("Internal Server Error")),
  );

  const response = await request(app)
    .put("/users/me")
    .set("Authorization", `Bearer ${token}`)
    .send({ email: "ExampleUserChanged@hotmail.com" });

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// DELETE: Delete profile

test("delete profile (with mock): should return mock data and 200 status", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");
  const mockDestroy = jest.fn();

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
    destroy: mockDestroy,
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const mockCart = {
    id: 1,
    total: 100,
    userId: 66,
    destroy: jest.fn(),
  };

  Cart.findOne = jest.fn().mockResolvedValue(mockCart);

  const mockSeller = {
    id: 1,
    sales: 100,
    userId: 66,
    destroy: jest.fn(),
  };

  Seller.findOne = jest.fn().mockResolvedValue(mockSeller);

  Cart.destroy = jest.fn().mockResolvedValue(1);
  Product.destroy = jest.fn().mockResolvedValue(1);
  Seller.destroy = jest.fn().mockResolvedValue(1);

  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(mockDestroy).toHaveBeenCalled();
  expect(mockCart.destroy).toHaveBeenCalled();
  expect(mockSeller.destroy).toHaveBeenCalled();
  expect(Product.destroy).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    message: "The user was successfully removed",
  });
});

test("delete profile (with mock), server error: should return 500 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");
  const mockDestroy = jest.fn();

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
    destroy: mockDestroy,
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  Cart.findOne = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

///////////////////////// DELETE: Delete user

test("delete user (with mock): should return mock data and 200 status", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");
  const mockDestroy = jest.fn();

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const mockUserFind = {
    id: 10,
    name: "Example User2",
    email: "exampleemail2@hotmail.com",
    role: "user",
    destroy: mockDestroy,
  };

  User.findByPk = jest.fn().mockResolvedValue(mockUserFind);

  const mockCart = {
    id: 1,
    total: 100,
    userId: 66,
    destroy: jest.fn(),
  };
  Cart.findOne = jest.fn().mockResolvedValue(mockCart);

  const mockSeller = {
    id: 1,
    sales: 100,
    userId: 66,
    destroy: jest.fn(),
  };
  Seller.findOne = jest.fn().mockResolvedValue(mockSeller);

  Cart.destroy = jest.fn().mockResolvedValue(1);
  Product.destroy = jest.fn().mockResolvedValue(1);
  Seller.destroy = jest.fn().mockResolvedValue(1);

  const response = await request(app)
    .delete("/users/1")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(mockDestroy).toHaveBeenCalled();
  expect(mockCart.destroy).toHaveBeenCalled();
  expect(mockSeller.destroy).toHaveBeenCalled();
  expect(Product.destroy).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    message: "The user was successfully removed",
  });
});

test("delete user (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).delete("/users/WrongId");

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual([
    {
      instancePath: "/id",
      schemaPath: "#/properties/id/type",
      keyword: "type",
      params: { type: "integer" },
      message: "must be integer",
    },
  ]);
});

test("delete user (with mock), bad request: should return 400 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "user",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  const response = await request(app)
    .delete("/users/1")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(403);
  expect(response.body).toEqual({
    message: "Forbidden: insufficient permissions",
  });
});

test("delete user (with mock), not found: should return 404 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  User.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app)
    .delete("/users/1")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(User.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({
    message: "User not found",
  });
});

test("delete user (with mock), server error: should return 500 status and error message", async () => {
  const findOneSpy = jest.spyOn(User, "findOne");

  const mockUser = {
    id: 66,
    name: "Example User",
    email: "exampleemail@hotmail.com",
    role: "admin",
  };

  findOneSpy.mockImplementationOnce(() => Promise.resolve(mockUser));

  jwt.sign.mockReturnValue("mockedTokenValue");
  const token = jwt.sign({ userId: 66 }, process.env.JWT_SECRET);

  jwt.verify.mockImplementation((token, secret) => {
    if (token === "mockedTokenValue" && secret === process.env.JWT_SECRET) {
      return { userId: 66 };
    }
  });

  User.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app)
    .delete("/users/1")
    .set("Authorization", `Bearer ${token}`);

  findOneSpy.mockRestore();

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});
