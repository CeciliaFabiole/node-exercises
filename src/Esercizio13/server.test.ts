import supertest from "supertest"
import app from "./app"

const arrayPlanet = [
    {name: "Marte"},
    {name: "Venere"},
    {name: "Mercurio"}
]
const request = supertest(app);
test("GET /planets", async ()=>{
    const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    expect(response.body.toEqual(arrayPlanet))
})