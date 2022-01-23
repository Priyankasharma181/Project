const knex = require("../model/database")


const parse = require('csv-parser')
const fs = require('fs')
uplodcsv = async (req, res) => {
    if (req.files) {
        var file = req.files.filecsv
        // console.log(file);
        await file.mv(__dirname + "/data/" + file.name)
        const results = [];
        fs.createReadStream(__dirname + "/data/" + file.name)
            .pipe(parse())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                for (i of results) {
                    knex("users_details").insert(i)
                        .then((data) => {
                            console.log("data inserted");
                        })
                        .catch((er) => {
                            console.log(er);
                        })
                }
            })
    }
    res.send("ok")
}

getUplod = (req, res) => {
    knex.select("*").from("users_details")
        .then((data) => {
            // console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


module.exports = {
    uplodcsv,
    getUplod
}