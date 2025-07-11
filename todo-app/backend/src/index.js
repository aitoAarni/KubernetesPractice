import express from "express"
import {
    getImage,
    getImageTimestamp,
    updateImage,
    updateImageTimestamp,
} from "./utils.js"
const PORT = process.env.PORT

// console.log("Server started in port ", PORT)

const imagePath = "volume/image.png"

const imageUrl = "https://picsum.photos/1200"

const app = express()

app.get("/image", async (req, res, next) => {
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

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT || 3000}`)
})
