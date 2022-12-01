import * as fs from "node:fs";

fs.writeFile("src/Esercizio10/message.txt", 'Hello, there is the message: Ciao Mamma!', {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
});