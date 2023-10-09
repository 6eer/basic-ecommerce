const request = require("supertest");
const app = require("../../src/app");
const Country = require("../../src/models/Country");

beforeEach(async () => {
  jest.resetAllMocks();
});

afterEach(async () => {
  jest.restoreAllMocks();
});

// /countries

//=================== GET

test("get all countries (with mock): should return mock data and 200 status", async () => {
  Country.findAll = jest
    .fn()
    .mockResolvedValue([{ id: 55, name: "Example Country" }]);

  const response = await request(app).get("/countries");

  expect(Country.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([{ id: 55, name: "Example Country" }]);
});

test("get all countries (with mock): should return empty mock data and 200 status", async () => {
  Country.findAll = jest.fn().mockResolvedValue([]);

  const response = await request(app).get("/countries");

  expect(Country.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

test("get all countries (with mock), server error: should return 500 status and error message", async () => {
  Country.findAll = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get("/countries");

  expect(Country.findAll).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== POST

test("new country (with mock): should return 201 status", async () => {
  Country.findOne = jest.fn().mockResolvedValue(false);

  Country.create = jest.fn().mockResolvedValue({
    id: 10,
    name: "TestCountry",
  });

  const response = await request(app).post("/countries").send({
    name: "TestCountry",
  });

  expect(Country.create).toHaveBeenCalled();
  expect(Country.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({
    id: 10,
    name: "TestCountry",
  });
});

test("new country (with mock), bad request: should return 400 status and error message", async () => {
  Country.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).post("/countries").send({
    name: "TestCountry",
  });

  expect(Country.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({ message: "Country already exist" });
});

test("new country (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/countries").send();

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

test("new country (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).post("/countries").send({ name: 1 });

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

test("new country (with mock), server error: should return 500 status and error message", async () => {
  Country.findOne = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app)
    .post("/countries")
    .send({ name: "TestCountry" });

  expect(Country.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

// /countries/countryId

//=================== GET

test("get country by Id (with mock): should return mock data and a 200 status", async () => {
  Country.findByPk = jest.fn().mockResolvedValue({
    id: 10,
    name: "TestCountry",
  });

  const response = await request(app).get("/countries/10");

  expect(Country.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 10,
    name: "TestCountry",
  });
});

test("get country by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).get("/countries/WrongId");

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

test("get country by Id (with mock), not found: should return 404 status and error message", async () => {
  Country.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).get("/countries/100");

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Country not found" });
});

test("get country by Id (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).get("/countries/10");

  expect(Country.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== PUT

test("update country by Id (with mock): should return mock data and a 201 status", async () => {
  const mockCountry = {
    id: 10,
    name: "TestCountry",
    save: jest.fn().mockResolvedValue(true),
  };

  Country.findByPk = jest.fn().mockResolvedValue(mockCountry);

  const response = await request(app).put("/countries/10").send({
    name: "TestCountryChanged",
  });

  expect(Country.findByPk).toHaveBeenCalled();
  expect(mockCountry.save).toHaveBeenCalled();
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: 10,
    name: "TestCountryChanged",
  });
});

test("update country by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/countries/10").send({});

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

test("update country by Id(with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/countries/10").send({
    name: 1,
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

test("update country by Id (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).put("/countries/WrongId").send({
    name: "TestCountryChanged",
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

test("update country by Id (with mock), bad request: should return 400 status and error message", async () => {
  Country.findByPk = jest.fn().mockResolvedValue(true);
  Country.findOne = jest.fn().mockResolvedValue(true);

  const response = await request(app).put("/countries/10").send({
    name: "TestCountryChanged",
  });

  expect(Country.findByPk).toHaveBeenCalled();
  expect(Country.findOne).toHaveBeenCalled();
  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({ message: "Country already exist" });
});

test("update country by Id (with mock), not found: should return 404 status and a error message", async () => {
  Country.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).put("/countries/10").send({
    name: "TestCountryChanged",
  });

  expect(Country.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Country not found" });
});

test("update country by Id (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).put("/countries/10").send({
    name: "TestProductChanged",
  });

  expect(Country.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});

//=================== DEL

test("delete country (with mock): should return a 200 status", async () => {
  const mockCountry = {
    id: 10,
    name: "TestCountry",
  };

  Country.findByPk = jest.fn().mockResolvedValue(mockCountry);
  Country.destroy = jest.fn().mockResolvedValue(1);

  const response = await request(app).del("/countries/10");

  expect(Country.findByPk).toHaveBeenCalled();
  expect(Country.destroy).toHaveBeenCalledWith({
    where: { id: mockCountry.id },
  });
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    message: "The country was successfully removed",
  });
});

test("delete country (with mock), bad request: should return 400 status and error message", async () => {
  const response = await request(app).del("/countries/WrongId");

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

test("delete country (with mock), not found: should return 404 status and error message", async () => {
  Country.findByPk = jest.fn().mockResolvedValue(null);

  const response = await request(app).del("/countries/10");

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ message: "Country not found" });
});

test("delete country (with mock), server error: should return 500 status and error message", async () => {
  Country.findByPk = jest
    .fn()
    .mockRejectedValue(new Error("Internal Server Error"));

  const response = await request(app).del("/countries/10");

  expect(Country.findByPk).toHaveBeenCalled();
  expect(response.statusCode).toBe(500);
  expect(response.body).toEqual({ message: "Internal Server Error" });
});
