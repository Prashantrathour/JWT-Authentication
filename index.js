const express=require("express")
const {userrouter} = require("./router/router")
const {connection} = require("./db")
const contentrouter = require("./router/content.router")


const app = express()

app.use(express.json())

app.use("/users",userrouter)
app.use("/user",contentrouter)

app.listen(8080,async()=>{
   try {
    await connection

    console.log("Connected  to server")

} catch (error) {
   console.log(error) 
} 
})
