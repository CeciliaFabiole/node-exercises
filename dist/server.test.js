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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const client_mock_1 = require("./lib/prisma/client.mock");
const request = (0, supertest_1.default)(app_1.default);
test("GET /planets", () => __awaiter(void 0, void 0, void 0, function* () {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-14T13:45:00.502Z",
            updatedAt: "2022-12-14T13:43:57.635Z"
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 3,
            createdAt: "2022-12-14T13:45:00.502Z",
            updatedAt: "2022-12-14T13:44:41.234Z"
        },
        {
            id: 3,
            name: "Mars",
            description: null,
            diameter: 1011112,
            moons: 34,
            createdAt: "2022-12-14T14:01:40.878Z",
            updatedAt: "2022-12-14T14:00:57.360Z"
        }
    ];
    //@ts-ignore
    client_mock_1.prismaMock.planet.findMany.mockResolvedValue(planets);
    const response = yield request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(planets);
}));
describe("POST /planets", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            id: 8,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        };
        const response = yield request
            .post("/planets")
            .send({
            name: "Mercury",
            diameter: 1234,
            moons: 12
        })
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planet);
    }));
    test("Invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            diameter: 1234,
            moons: 12,
        };
        const response = yield request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    }));
});
describe("GET /planet/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        };
        //@ts-ignore
        client_mock_1.prismaMock.planet.findUnique.mockResolvedValue(planet);
        const response = yield request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planet);
    }));
    test("Planet doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        client_mock_1.prismaMock.planet.findUnique.mockResolvedValue(null);
        const response = yield request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);
        expect(response.text).toContain("Cannot GET /planets/23");
    }));
});
describe("PUT /planet/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            id: 1,
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        };
        //@ts-ignore
        client_mock_1.prismaMock.planet.update.mockResolvedValue(planet);
        const response = yield request
            .put("/planets/1")
            .send({
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12
        })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planet);
    }));
    test("Invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            diameter: 1234,
            moons: 12,
        };
        //@ts-ignore
        client_mock_1.prismaMock.planet.update.mockResolvedValue(null);
        const response = yield request
            .get("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    }));
    test("Planet doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        client_mock_1.prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = yield request
            .put("/planets/23")
            .send({
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12
        })
            .expect(404)
            .expect("Content-Type", /text\/html/);
        expect(response.text).toContain("Cannot PUT /planets/23");
    }));
    test("Invalid planet ID", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        client_mock_1.prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = yield request
            .put("/planets/23")
            .send({
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12
        })
            .expect(404)
            .expect("Content-Type", /text\/html/);
        expect(response.text).toContain("Cannot PUT /planets/23");
    }));
});
describe("DELETE /planet/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/planets/1")
            .expect(204);
        expect(response.text).toEqual("");
    }));
    test("Planet doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        client_mock_1.prismaMock.planet.delete.mockRejectedValue(new Error("Error"));
        const response = yield request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);
        expect(response.text).toContain("Cannot DELETE /planets/23");
    }));
});
//# sourceMappingURL=server.test.js.map