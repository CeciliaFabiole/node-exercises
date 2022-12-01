"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
const app = (0, express_1.default)();
app.get("/", (request, response) => {
    response.send("This is the Space Facts API");
});
function getPlanet() {
    const arrayPlanet = [
        { name: "Marte" },
        { name: "Venere" },
        { name: "Mercurio" }
    ];
    return arrayPlanet;
}
app.get("/planets", (request, response) => {
    const planet = getPlanet();
    response.json(planet);
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map