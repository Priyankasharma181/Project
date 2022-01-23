const knex = require("../model/database")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken");
const {hashSync,genSaltSync} = require("bcrypt");
 

// For cloudinary
const cloudinary = require('cloudinary').v2
require('dotenv').config()
cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.API_KEY,
api_secret: process.env.API_SECRET
});


// get users details
users = (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => {
      console.log(data);
      res.json({
        data: data
      });
    })
    .catch((er) => {
      console.log(er);
      res.json({
        message: er
      });
    });
};

//  signup 
signUp = async (req, res) => {
  if (req.files) {
    var file = req.files.image
    await file.mv(__dirname + "/images/" + file.name)
  } else {
    res.send("got error while saving image")
  }
  if (!req.body.Name || !req.body.email || !req.body.password) {
    res.send({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
    })
    console.log({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
    });
    return ""
  }
  salt = genSaltSync(10)
  await cloudinary.uploader.upload(__dirname + "/images/" + file.name, (error, result) => {
    console.log(result, error)
    if (error) {
      res.send("error while uploding")
    } else {
      const userdata = {
        "Name": req.body.Name,
        "email": req.body.email,
        "password": hashSync(req.body.password, salt),
        "image": result.url

      }

      knex("users")
        .insert(userdata)
        .then((data) => {

          res.send({
            success: `${userdata.email} registered successfully!`
          });
        })
        .catch((err) => {
          console.log(err);
          if (res.errorno = 1062) {
            res.send({
              message: "this email already exist"
            })
          } else {
            console.log(err);
            res.send({
              message: err
            });
          }
        });
    }
  });


}


// log in 
Login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
    })
    console.log({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
    });
    return ""
  }
  knex.from('users').select("*").where("email", "=", req.body.email, "password", "=", req.body.password)
    .then((data) => {
      // console.log(data);
      const token = sign({
        id: data[0].id
      }, "priyankasharma", {
        expiresIn: "6h"
      })
      // console.log(token);
      res.cookie("user", token)
      res.json({
        "success": true,
        "status": 200,
        "message": "Login successfull.",
        "token": token,
      })
      console.log({
        message: data
      });
    })
    .catch((err) => {
      res.json({
        message: err
      })
      console.log({
        message: err
      });
    })
}

userUpdate = (req, res) => {
  knex("users").update({
      "Name": req.body.Name,
      "email": req.body.email,
      "password": req.body.password,
      "image": req.body.image
    })
    .where("id", req.params.id)
    .then((data) => {
      console.log(data);
      res.send(200)
    }).catch((er) => {
      console.log(er);
    })
}


module.exports = {
  users,
  signUp,
  Login,
  userUpdate
}