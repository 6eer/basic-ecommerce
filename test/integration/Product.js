const request = require("supertest");
const app = require("../../src/app");
const { newUser1, setupDatabase } = require("../fixtures/database");
const Product = require("../../src/models/Product");

beforeEach(async () => {
  await setupDatabase();
});

// /products

//=================== GET:

test("get all products: should return 200 status", async () => {
  const response = await request(app).get("/products");
  expect(response.statusCode).toBe(200);
});

//=================== POST:

test("new product: should return 201 status", async () => {
  const response = await request(app).post("/products").send({
    name: "TestProduct2",
    price: 93,
    stock: 23,
    description: "Testing product 2",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(201);

  const product = await Product.findByPk(response.body.id);
  expect(product).not.toBeNull();
});

test("new product, bad request: should return 400 status", async () => {
  const response = await request(app).post("/products").send({
    price: 93,
    stock: 23,
    description: "Testing product 2",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(400);
  console.log(response.body);
});

test("new product, bad request: should return 400 status", async () => {
  const response = await request(app).post("/products").send({
    name: "TestProduct2",
    price: "93",
    stock: 23,
    description: "Testing product 2",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(400);
});

test("new product, not found: should return 404 status", async () => {
  const response = await request(app).post("/products").send({
    name: "TestProduct2",
    price: 93,
    stock: 23,
    description: "Testing product 2",
    sellerId: 100,
  });
  expect(response.statusCode).toBe(404);
});

// /products/productId

//=================== GET:
test("get product: should return 200 status", async () => {
  const response = await request(app).get(`/products/${newUser1.id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("TestProduct1");
});

test("get product, bad request: should return 400 status", async () => {
  const response = await request(app).get("/products/WrongId");
  expect(response.statusCode).toBe(400);
});

test("get product, not found: should return 404 status", async () => {
  const response = await request(app).get("/products/100");
  expect(response.statusCode).toBe(404);
});

//PUT

test("update product: should return 200 status", async () => {
  const response = await request(app).put(`/products/${newUser1.id}`).send({
    name: "TestProductChanged",
    price: 1000,
    stock: 2000,
    description: "Testing product 1 changed",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("TestProductChanged");
});

test("update product, bad request: should return 400 status", async () => {
  const response = await request(app).put(`/products/${newUser1.id}`).send({
    price: 1000,
    stock: 2000,
    description: "Testing product 1 changed",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(400);
});

test("update product, bad request: should return 400 status", async () => {
  const response = await request(app).put(`/products/${newUser1.id}`).send({
    name: "TestProductChanged",
    price: "1000",
    stock: 2000,
    description: "Testing product 1 changed",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(400);
});

test("update product, not found: should return 404 status", async () => {
  const response = await request(app).put(`/products/${newUser1.id}`).send({
    name: "TestProductChanged",
    price: 1000,
    stock: 2000,
    description: "Testing product 1 changed",
    sellerId: 100,
  });
  expect(response.statusCode).toBe(404);
});

test("update product, not found: should return 404 status", async () => {
  const response = await request(app).put("/products/100").send({
    name: "TestProductChanged",
    price: 1000,
    stock: 2000,
    description: "Testing product 1 changed",
    sellerId: 10,
  });
  expect(response.statusCode).toBe(404);
});

//=================== DEL:

test("delete product: should return 200 status", async () => {
  const response = await request(app).del(`/products/${newUser1.id}`);
  expect(response.statusCode).toBe(200);
  const product = await Product.findByPk(1);
  expect(product).toBeNull();
});

test("delete product, bad request: should return 400 status", async () => {
  const response = await request(app).del("/products/WrongId");
  expect(response.statusCode).toBe(400);
});

test("delete product, not found: should return 404 status", async () => {
  const response = await request(app).del("/products/100");
  expect(response.statusCode).toBe(404);
});
