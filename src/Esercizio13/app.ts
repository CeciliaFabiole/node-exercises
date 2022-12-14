import express from "express";
import "express-async-errors";
import "dotenv/config"
import {PrismaClient} from "@prisma/client"

const app = express()
const prisma = new PrismaClient();

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

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

export default app;