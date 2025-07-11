import fs from "fs/promises"

export const getImageTimestamp = async () => {
    const data = await fs.readFile("volume/imageUpdated.json", "utf-8")
    const jsonData = JSON.parse(data)
    return jsonData.lastUpdated
}

export const updateImageTimestamp = async () => {
    const currentDate = new Date()
    const data = {
        lastUpdated: currentDate.getTime(),
    }

    await fs.writeFile(
        "volume/imageUpdated.json",
        JSON.stringify(data, null, 2),
        err => {
            if (err) {
                console.error("Error writing to imageUpdated.json:", err)
                throw new Error("Failed to update image timestamp")
            } else {
                console.log("imageUpdated.json updated successfully.")
            }
        }
    )
}

export const updateImage = async (url, filePath) => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const buffer = await response.arrayBuffer()
        console.log("Image fetched successfully, updating file...")
        await fs.writeFile(filePath, Buffer.from(buffer))
        console.log("Image updated successfully.")
    
}

export const getImage = async imagePath => {
    const imageBuffer = await fs.readFile(imagePath)
    return imageBuffer
}
