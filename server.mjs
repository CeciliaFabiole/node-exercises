import { createServer } from "node:http";
import outputMessage from "./outputMessage.mjs";

const message = outputMessage('Hey there!')
const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    `<html><body><h1>${message}</h1></body></html>`
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});