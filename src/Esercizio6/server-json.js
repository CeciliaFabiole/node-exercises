const { createServer } = require("node:http");

const serverJson = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  const jsonResponseBody = JSON.stringify({ location: "Mars" });

  response.end(jsonResponseBody);
});

serverJson.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

module.exports = serverJson;
//The Earth value was => Content-Length: 20
//The Mars value is => Content-Length: 19
