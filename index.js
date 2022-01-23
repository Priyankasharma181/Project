const express = require("express")
const app = express()
const {router} = require("./router/routes")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))

app.use (express.json())
app.use("/",router)


app.listen(8000,()=>{
    console.log("listinig");
})