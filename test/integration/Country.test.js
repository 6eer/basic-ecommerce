const request = require("supertest");
const app = require("../../src/app");
const Country = require("../../src/models/Country");
const { newCountry, setupDatabase } = require("../fixtures/database");

beforeEach(async () => {
  await setupDatabase();
});

// /countries

//=================== GET:

test("get all countries: should return 200 status", async () => {
  const response = await request(app).get("/countries");
  expect(response.statusCode).toBe(200);
});

//=================== POST:

test("new country: should return 201 status", async () => {
  const response = await request(app).post("/countries").send({
    name: "TestCountry2",
  });
  expect(response.statusCode).toBe(201);

  const country = await Country.findByPk(response.body.id);
  expect(country).not.toBeNull();
});

test("new country, missing property: should return 400 status", async () => {
  const response = await request(app).post("/countries").send({});
  expect(response.statusCode).toBe(400);
});

test("new country, wrong type: should return 400 status", async () => {
  const response = await request(app).post("/countries").send({
    name: 1,
  });
  expect(response.statusCode).toBe(400);
});

test("new country, name already exists: should return 400 status", async () => {
  const response = await request(app).post("/countries").send({
    name: "TestCountry1",
  });
  expect(response.statusCode).toBe(400);
});

// /countries/countryId

//=================== GET:

test("get country: should return 200 status", async () => {
  const response = await request(app).get(`/countries/${newCountry.id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("TestCountry1");
});

test("get country, wrong type: should return 400 status", async () => {
  const response = await request(app).get("/countries/WrongId");
  expect(response.statusCode).toBe(400);
});

test("get country, wrong id: should return 404 status", async () => {
  const response = await request(app).get("/countries/100");
  expect(response.statusCode).toBe(404);
});

//=================== PUT

test("update country: should return 200 status", async () => {
  const response = await request(app).put(`/countries/${newCountry.id}`).send({
    name: "TestCountryChanged",
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("TestCountryChanged");
});

test("update country, missing property: should return 400 status", async () => {
  const response = await request(app)
    .put(`/countries/${newCountry.id}`)
    .send({});
  expect(response.statusCode).toBe(400);
});

test("update country, wrong type: should return 400 status", async () => {
  const response = await request(app).put(`/countries/${newCountry.id}`).send({
    name: 1,
  });
  expect(response.statusCode).toBe(400);
});

test("update country, name already exists: should return 400 status", async () => {
  const response = await request(app).put(`/countries/${newCountry.id}`).send({
    name: "TestCountry1",
  });
  expect(response.statusCode).toBe(400);
});

test("update country, wrong id: should return 404 status", async () => {
  const response = await request(app).put("/countries/100").send({
    name: "TestCountryChanged",
  });
  expect(response.statusCode).toBe(404);
});

//=================== DEL

test("delete country: should return 200 status", async () => {
  const response = await request(app).del(`/countries/${newCountry.id}`);
  expect(response.statusCode).toBe(200);
  const country = await Country.findByPk(1);
  expect(country).toBeNull();
});

test("delete country, wrong type: should return 400 status", async () => {
  const response = await request(app).del("/countries/WrongId");
  expect(response.statusCode).toBe(400);
});

test("delete country, wrong id: should return 404 status", async () => {
  const response = await request(app).del("/countries/100");
  expect(response.statusCode).toBe(404);
});
