const request = require("supertest");
const app = require("../../src/app");
const { setupDatabase, newCountry } = require("../fixtures/database");
const Country = require("../../src/models/Country");

beforeEach(async () => {
  jest.resetAllMocks();
  //await setupDatabase();
});

const originalFindAll = Country.findAll;
const originalFindByPk = Country.findByPk;
const originalCreate = Country.create;

// /countries

//GET:

/* test("get all countries: should return 200 status", async () => {
  const response = await request(app).get("/countries");
  expect(response.statusCode).toBe(200);
}); */

test("get all countries (with mock), server error: should return 500 status and error message", async () => {
  Country.findAll = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get("/countries");

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });

  Country.findAll = originalFindAll;
});

test("get all countries (with mock): should return mock country and 200 status", async () => {
  Country.findAll = jest
    .fn()
    .mockResolvedValue([{ id: 45, name: "Example Country" }]);

  const response = await request(app).get("/countries");

  expect(Country.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([{ id: 45, name: "Example Country" }]);

  Country.findAll = originalFindAll;
});

test("get all countries (with mock): should return mock [] and 200 status", async () => {
  Country.findAll = jest.fn().mockResolvedValue([]);

  const response = await request(app).get("/countries");

  expect(Country.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);

  Country.findAll = originalFindAll;
});

//POST:

/*
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

test("new country (with mock), server error: should return 500 status and error message", async () => {
  Country.create = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).post("/countries").send({
    name: "TestCountry2",
  });

  console.log(response.body);

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });

  Country.create = originalCreate;
});

// /countries/countryId

//GET
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

test("get country (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get(`/countries/${newCountry.id}`);

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });

  Country.findByPk = originalFindByPk;
});

//PUT

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

test("update country (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).put(`/countries/${newCountry.id}`).send({
    name: "TestCountryChanged",
  });

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });

  Country.findByPk = originalFindByPk;
});

//DEL

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

test("delete country (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).del(`/countries/${newCountry.id}`);

  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });

  Country.findByPk = originalFindByPk;
});

*/
