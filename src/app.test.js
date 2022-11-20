const supertest= require("supertest");
const createApp = require("./app.js");

const app = createApp();

const request = supertest(app);

test("GET /", async () => {
  const response = await request
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html");

    const responseBody = `<html><body><h1>Welcome to the World Wide Web!</h1></body></html>`
  expect(response.text).toBe(responseBody);
});
