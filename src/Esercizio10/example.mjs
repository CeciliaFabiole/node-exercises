import * as fs from "node:fs";

fs.readFile("src/Esercizio10/file-1.txt", {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
})

fs.readFile("src/Esercizio10/file-2.txt", {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
})

fs.readFile("src/Esercizio10/message.txt", {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
})