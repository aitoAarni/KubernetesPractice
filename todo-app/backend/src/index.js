import express from "express"
import {
    getImage,
    getImageTimestamp,
    updateImage,
    updateImageTimestamp,
} from "./utils.js"
import cors from "cors"
import { initializeDb } from "./db.js"
import noteRouter from "./routers/noteRouter.js"
const PORT = process.env.PORT

// const imagePath = "volume/image.png"

const imagePath = process.env.IMAGE_PATH

const imageUrl = process.env.IMAGE_URL

// const imageUrl = "https://picsum.photos/1200"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/notes", noteRouter)

app.get("/api/image", async (req, res, next) => {
    let image
    try {
        image = await getImage(imagePath)
    } catch (error) {
        console.error("Error getting image")
    }
    try {
        const lastUpdated = await getImageTimestamp()
        const currentTime = new Date().getTime()
        const difference = currentTime - lastUpdated
        const differenceMinutes = difference / (1000 * 60)
        if (differenceMinutes > 10) {
            await updateImageTimestamp()
            await updateImage(imageUrl, imagePath)
        }
    } catch (error) {
        await updateImageTimestamp()
        await updateImage(imageUrl, imagePath)
    }
    if (!image) {
        try {
            image = await getImage(imagePath)
        } catch (error) {
            console.error("Error getting image after update:", error)
            return res.status(500).send("Error retrieving image")
        }
    }
    return res.send(image)
})

app.use((req, res) => {
    res.status(404).send("Not Found")
})

initializeDb().then(() => {
    app.listen(PORT || 3000, () => {
        console.log(`Server is running on port ${PORT || 3000}`)
    })
})
