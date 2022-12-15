"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
const validation_1 = require("./lib/validation");
const client_1 = __importDefault(require("./lib/prisma/client"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (request, response) => {
    response.send("This is the Space Facts API");
});
// function getPlanet(){
//     const arrayPlanet = [
//         {name: "Marte"},
//         {name: "Venere"},
//         {name: "Mercurio"}
//     ]
//     return arrayPlanet
// }
// app.get("/planets", (request, response)=>{
//     const planet = getPlanet()
//     response.json(planet)
// })
app.get("/planets", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield client_1.default.planet.findMany();
    response.json(planets);
}));
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const planetData = request.body;
    const planet = yield client_1.default.planet.create({
        data: planetData
    });
    response.status(201).json(planet);
}));
app.use(validation_1.validationErrorMiddleware);
// app.post("/planets", validate({body: planetSchema}),async(request, response) => {
//     const planet: planetData = request.body;
//     response.status(201).json(planet)
// })
// app.use(validationErrorMiddleware)
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map