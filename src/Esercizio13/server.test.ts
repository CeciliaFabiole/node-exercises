import supertest from "supertest"
import app from "./app"
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

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

describe("POST /planets",() => {
    test("Valid request", async () => {
        const planet = {
            id: 8,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        }

        const response = await request
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 1234,
                moons: 12
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = 
            {
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

describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        }
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Planet doesn't exist", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);
        const response = await request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/23");
    })
})

describe("PUT /planet/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-15T14:51:06.726Z",
            updatedAt: "2022-12-15T14:51:06.726Z"
        }
        //@ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const response = await request
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
    });

    test("Invalid request", async () => {
        const planet =
        {
            diameter: 1234,
            moons: 12,
        }
        //@ts-ignore
        prismaMock.planet.update.mockResolvedValue(null);
        const response = await request
            .get("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });

    test("Planet doesn't exist", async () => {
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = await request
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
    })

    test("Invalid planet ID", async () => {
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = await request
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
    })
})

describe("DELETE /planet/:id", () => {
    test("Valid request", async () => {
        const response = await request
            .delete("/planets/1")
            .expect(204)

        expect(response.text).toEqual("");
    });

    test("Planet doesn't exist", async () => {
        //@ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));
        const response = await request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/23");
    })
})