const express = require("express")
const router = express.Router()
const {
    users,
    signUp,
    Login,
    userUpdate
} = require("../controller/signup")
const {
    uplodcsv,
    getUplod
} = require("../controller/uplod")
router.get("/api/getUSer", users)
router.post("/api/signup", signUp)
router.post("/api/login", Login)
router.put("/api/userUpdate/:id", userUpdate)


router.post("/api/uplod", uplodcsv)
router.get("/api/uploddata", getUplod)

module.exports = {
    router
}