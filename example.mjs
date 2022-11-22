import * as fs from "node:fs";

fs.readFile("file-1.txt", {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
})

fs.readFile("file-2.txt", {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
})