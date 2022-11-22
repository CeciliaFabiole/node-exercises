import * as fs from "node:fs";

fs.writeFile('message.txt', 'Hello, there is the message:', {encoding: "utf-8"}, function(error, data) {
    if(error) {
        console.error(error);
        return;
    }
    console.log(data);
});