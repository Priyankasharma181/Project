const mysql=require("mysql");
const db = require("../config/db")
const knex = require("knex")({
  client: "mysql",
  connection: {
    host:"localhost",
    user: "root",
    password: "Pink@123",
    database: "PROJECT"
  }

});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(table) {
      table.increments("id").primary();
          table.string("Name");
          table.string("email").unique();
          table.string("password");
          table.string("image")
    });
  }
});

knex.schema.hasTable('users_details').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users_details', function(table) {
          table.integer("Age")
          table.integer("Mobile");
          table.string("Place")
          table.string("City");
          table.string("state")
          table.string("Country")
    });
  }
});

 module.exports = knex
