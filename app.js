const express = require("express")
const dotenv = require('dotenv').config()

const app = express()
async function getLocation(client_ip){
    try{
        const response = await fetch(`https://ipinfo.io/${client_ip}?token=${process.env.API_SECRET}`)
        const data = await response.json()
        return data
    }catch(err){
        console.error(err)
    }
}

app.get("/api/location", async (req, res) => {
    const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
        const locale = await getLocation(client_ip)

        return res.status(200).json({ locale })
    } catch (error) {
        return res.status(500).json('Error Occured:', error.message)
    }
})

const port = process.env.PORT || 3500
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})