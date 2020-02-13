/*
 * app.js
 * Copyright (C) 2020 sandeep <sandeep@sandeep-pc>
 *
 * Distributed under terms of the MIT license.
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const connectionString = "mongodb://localhost:27017/";
// const dbName  = "newdb";
const crud = require("crud-sdk");

//MONGO

// mongoose.connect("mongodb://localhost:27017/newdb", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });


// const db = mongoose.connection;

//USERS

// const UserSchema = new mongoose.Schema({
//   id: Number,
//   email: String,
//   password: String
// });

// const UserModel = mongoose.model("users", UserSchema);

// ram.save((err,data)=>{
// 	if(err) console.log(err);
// 	console.log(data)
// })

// NOTES

// const NotesSchema = new mongoose.Schema({
//   title: String,
//   subtitle: String,
//   content: String
// });

// const NotesModel = new mongoose.model("notesnew", NotesSchema);

// const note1 = new NotesModel({
//   title: "Peaches",
//   subtitle: "It's a fruit",
//   content: "It's yellow and tasty and supposedly king of fruits"
// });
// note1.save((err,data)=>{
// 	if(err) console.log(err);
// 	console.log(data);
// })

//SERVER

const PORT = 8072;

const server = express();
server.use(cors());
server.use(bodyParser.json()); // to support JSON-encoded bodies
server.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
server.use(express.json());

//API(s)

// console.log(NotesModel.find());

server.get("/notes", (req, res) => {
  // console.log("notes was called");
  crud.readByCondition("notesnews",{},{},(err, data) => {
    // console.log(data);
    res.json(data);
  });
});

server.post("/savenote", (req, res) => {
  // console.log(req.body);
  if (req.body.id) {
	  crud.updateById("notesnews",req.body,req.body.id,
      (err) => {
        if (err) console.log(err);
        res.send({"message":"saved sucessfully"});
      }
    );
  } else {
    crud.create("notesnews",{
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content
    },(err) => {
      if (err) console.log(err);
    });
  }
});

server.get("/note/:id", (req, res) => {
  // console.log(`REQ for ID ${req.params.id}`);
 crud.readById("notesnews",req.params.id,{}, (err, data) => {
    if (err) console.log(err);
    // console.log(data);
    res.json(data);
  });
});

server.delete("/deletenote/:id", (req, res) => {
  // console.log(req.params.id);
  crud.deleteById("notesnews",req.params.id, (err) => {
    if (err) console.log(err);
    // console.log(data);
    res.send({ message: "sucessfully deleted" });
  });
});

// server.get("/", (req, res) => res.send("test2"));

//SERVER LISTEN
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
