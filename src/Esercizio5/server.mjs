import { createServer } from "node:http";
import outputMessage from "../Esercizio4/outputMessage.mjs";


const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  const message = outputMessage('Hey there!')
  response.end(
    `<html><body><h1>${message}</h1></body></html>`
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});