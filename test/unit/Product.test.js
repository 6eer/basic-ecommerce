const request = require("supertest");
const app = require("../../src/app");
const Product = require("../../src/models/Product");
const Seller = require("../../src/models/Seller");

beforeEach(async () => {
  jest.resetAllMocks();
});

afterEach(async () => {
  jest.restoreAllMocks();
});

// /products

//=================== GET:

test("get all products (with mock): should return mock data and 200 status", async () => {
  Product.findAll = jest
    .fn()
    .mockResolvedValue([{ id: 66, name: "Example Product" }]);

  const response = await request(app).get("/products");

  expect(Product.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([{ id: 66, name: "Example Product" }]);
});

test("get all products (with mock): should return empty mock data and 200 status", async () => {
  Product.findAll = jest.fn().mockResolvedValue([]);

  const response = await request(app).get("/products");

  expect(Product.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

test("get all products (with mock), server error: should return 500 status and error message", async () => {
  Product.findAll = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get("/products");

  expect(Product.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== POST:

test("new product (with mock): should return 201 status", async () => {
  Seller.findByPk = jest.fn().mockResolvedValue({ id: 15, sales: 10 });
  Product.create = jest.fn().mockResolvedValue({
    id: 101,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  const response = await request(app).post("/products").send({
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  expect(Seller.findByPk).toHaveBeenCalled();
  expect(Product.create).toHaveBeenCalled();
  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({
    id: 101,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });
});

test("new product (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/products").send({
    name: "Test Product",
    price: "10",
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/price",
        schemaPath: "#/properties/price/type",
        keyword: "type",
        params: { type: "number" },
        message: "must be number",
      },
    ],
  });
});

test("new product (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/products").send({
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "",
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "name" },
        message: "must have required property 'name'",
      },
    ],
  });
});

test("new product (with mock), not found: should return 404 status and error message", async () => {
  Seller.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).post("/products").send({
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  expect(Seller.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Not a valid Seller" });
});

test("new product (with mock), server error: should return 500 status and error message", async () => {
  Seller.findByPk = jest.fn().mockResolvedValue({ id: 15, sales: 10 });

  Product.create = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).post("/products").send({
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  expect(Seller.findByPk).toHaveBeenCalled();
  expect(Product.create).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

// /products/productId

//=================== GET

test("get product by Id (with mock): should return mock data and a 200 status", async () => {
  Product.findByPk = jest.fn().mockResolvedValue({
    id: 10,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });

  const response = await request(app).get("/products/10");

  expect(Product.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 10,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  });
});

test("get product by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).get("/products/WrongId");

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual([
    {
      instancePath: "/id",
      keyword: "type",
      message: "must be integer",
      params: { type: "integer" },
      schemaPath: "#/properties/id/type",
    },
  ]);
});

test("get product by Id (with mock), not found: should return 404 status and error message", async () => {
  Product.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).get("/products/100");

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Product not found" });
});

test("get product by Id (with mock), server error: should return 500 status and error message", async () => {
  Product.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get("/products/10");

  expect(Product.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== PUT

test("update product by Id (with mock): should return mock data and a 200 status", async () => {
  const mockProduct = {
    id: 10,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
    save: jest.fn().mockResolvedValue(true),
  };

  Product.findByPk = jest.fn().mockResolvedValue(mockProduct);

  Seller.findByPk = jest.fn().mockResolvedValue({
    id: 15,
    sales: 10,
  });

  const response = await request(app).put("/products/10").send({
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(Product.findByPk).toHaveBeenCalled();
  expect(mockProduct.save).toHaveBeenCalled();
  expect(Seller.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 10,
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });
});

test("update product by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/products/10").send({
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "",
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "name" },
        message: "must have required property 'name'",
      },
    ],
  });
});

test("update product by Id(with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/products/10").send({
    name: "TestProductChanged",
    price: "10",
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: [
      {
        instancePath: "/price",
        schemaPath: "#/properties/price/type",
        keyword: "type",
        params: { type: "number" },
        message: "must be number",
      },
    ],
  });
});

test("update product by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/products/WrongId").send({
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual([
    {
      instancePath: "/id",
      keyword: "type",
      message: "must be integer",
      params: { type: "integer" },
      schemaPath: "#/properties/id/type",
    },
  ]);
});

test("update product by Id (with mock), not found: should return 404 status and a error message", async () => {
  Product.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).put("/products/10").send({
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(Product.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Product not found" });
});

test("update product by Id (with mock), not found: should return 404 status and error message", async () => {
  const mockProduct = {
    id: 10,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  };

  Product.findByPk = jest.fn().mockResolvedValue(mockProduct);
  Seller.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).put("/products/10").send({
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(Product.findByPk).toHaveBeenCalled();
  expect(Seller.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Seller not found" });
});

test("update product by Id (with mock), server error: should return 500 status and error message", async () => {
  Product.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).put("/products/10").send({
    name: "TestProductChanged",
    price: 10,
    stock: 10,
    description: "Testing product changed example",
    sellerId: 15,
  });

  expect(Product.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== DEL

test("delete product (with mock): should return a 200 status", async () => {
  const mockProduct = {
    id: 10,
    name: "TestProduct",
    price: 10,
    stock: 10,
    description: "Testing product example",
    sellerId: 15,
  };

  Product.findByPk = jest.fn().mockResolvedValue(mockProduct);
  Product.destroy = jest.fn().mockResolvedValue(1);

  const response = await request(app).del("/products/10");

  expect(Product.findByPk).toHaveBeenCalled();
  expect(Product.destroy).toHaveBeenCalledWith({
    where: { id: mockProduct.id },
  });
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    message: "The product was successfully removed",
  });
});

test("delete product (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).del("/products/WrongId");

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual([
    {
      instancePath: "/id",
      keyword: "type",
      message: "must be integer",
      params: { type: "integer" },
      schemaPath: "#/properties/id/type",
    },
  ]);
});

test("delete product (with mock), not found: should return 404 status and error message", async () => {
  Product.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).del("/products/10");

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Product not found" });
});

test("delete product (with mock), server error: should return 500 status and error message", async () => {
  Product.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).del("/products/10");

  expect(Product.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});
