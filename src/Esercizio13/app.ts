import express from "express";
import "express-async-errors";
import "dotenv/config"

const app = express()

app.get("/", (request, response) =>{
    response.send("This is the Space Facts API")
})

function getPlanet(){
    const arrayPlanet = [
        {name: "Marte"},
        {name: "Venere"},
        {name: "Mercurio"}
    ]
    return arrayPlanet
}

app.get("/planets", (request, response)=>{
    const planet = getPlanet()
    response.json(planet)
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
export default app;

