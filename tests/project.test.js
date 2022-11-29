const request = require("supertest");

const { createApp } = require("../app");
const { database } = require("../src/models/dataSource");

describe("Test/ Get Project By Project Id", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await database.initialize();
  });

  afterAll(async () => {
    await database.destroy();
  });

  it("SUCCESS : should respond with a 200 status code when project exists", async () => {
    await request(app).get("/projects/1").expect(200);
  });

  it("FAIL : should return error when project does not exist", async () => {
    await request(app).get("/projects/2").expect(404);
  });
});
