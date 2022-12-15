import express from "express";
import "express-async-errors";
import "dotenv/config"
import {validate, planetSchema, planetData, validationErrorMiddleware} from "./lib/validation"
import prisma from "./lib/prisma/client";

const app = express();
app.use(express.json());

app.get("/", (request, response) =>{
    response.send("This is the Space Facts API")
})

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

app.get("/planets", async (request, response)=>{
    const planets = await prisma.planet.findMany()
    response.json(planets)
})

app.post("/planets", validate({body:planetSchema}), async(request, response) => {
    const planetData: planetData = request.body
    const planet = await prisma.planet.create({
        data : planetData
    })
    response.status(201).json(planet)
})
app.use(validationErrorMiddleware)
// app.post("/planets", validate({body: planetSchema}),async(request, response) => {
//     const planet: planetData = request.body;
//     response.status(201).json(planet)
// })

// app.use(validationErrorMiddleware)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

export default app;