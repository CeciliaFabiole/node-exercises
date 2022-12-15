import supertest from "supertest"
import app from "./app"
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);



describe("POST /planets",() => {
    test("GET /planets", async () => {
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
        ]
        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);
    
        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planets);
    });
    test("Valid request", async () => {
        const planet = 
            {
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            }
    
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });
    test("Invalid request", async () => {
        const planet = 
            {
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            }
    
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });
});
