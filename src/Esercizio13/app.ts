import express from "express";
import "express-async-errors";
import "dotenv/config"
import { validate, planetSchema, planetData, validationErrorMiddleware } from "./lib/validation"
import prisma from "./lib/prisma/client";
import cors from "cors"
import { initMulterMiddleware } from "./lib/middleware/multer";

const upload = initMulterMiddleware()
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
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

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany()
    response.json(planets)
})

app.get("/planets/:id", async (request, response, next) => {
    const planetId = Number(request.params.id);

    const planet = await prisma.planet.findUnique({
        where: { id: planetId }
    })

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`)
    }

    response.json(planet)
})

app.post("/planets", validate({ body: planetSchema }), async (request, response) => {
    const planetData: planetData = request.body;
    const planet = await prisma.planet.create({
        data: planetData
    })
    response.status(201).json(planet)
})
// app.post("/planets", validate({body: planetSchema}),async(request, response) => {
//     const planet: planetData = request.body;
//     response.status(201).json(planet)
// })

// app.use(validationErrorMiddleware)

app.put("/planets/:id", validate({ body: planetSchema }), async (request, response, next) => {
    const planetID = Number(request.params.id);
    const planetData: planetData = request.body;

    try {
        const planet = await prisma.planet.update({
            where: { id: planetID },
            data: planetData
        })
        response.status(200).json(planet)
    } catch (error) {
        response.status(404);
        next(`Cannot PUT /planets/${planetID}`)
    }


})

app.delete("/planets/:id", async (request, response, next) => {
    const planetID = Number(request.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetID },
        })
        response.status(204).end()
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetID}`)
    }


})

app.post("/planets/:id/photo",
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded")
        }
        const planetID = Number(request.params.id)
        const photoFilename = request.file.filename;

        try {
            await prisma.planet.update({
                where: { id: planetID },
                data: { photoFilename },
            });
            response.status(201).json({ photoFilename });
        } catch (error) {
            response.status(404)
            next(`Cannot POST /planets/${planetID}/photo`)
        }
    })

app.use("/planets/photos", express.static("uploads"));
app.use(validationErrorMiddleware)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

export default app;