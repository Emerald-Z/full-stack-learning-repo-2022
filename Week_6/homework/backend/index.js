const { readdirSync } = require("graceful-fs");
const { expressJwtSecret } = require("jwks-rsa");
const retryRequest = require("retry-request");
const firebase = require("./firebase/cred.js");
const express = require("express");
const cors = require("cors");
const app = express();
const db = firebase.firestore;
require("dotenv").config();

app.use(express.json());

//fetch a person's todo's
app.get("/todo/:email", async(req, res) => {
    const todos = db.collection("todo");
    let email = req.params.email;
    const query = await todos.where("email", "==", email).get();
    const ret = query.docs.map((data) => data.data());
    res.status(200).json(ret);
})

var corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.post("/todo/", cors(corsOptions), async(req, res) => {
    const body = req.body

    if(body.email == undefined || body.todo == undefined) {
        return res.json({
          msg: "Error: body not defined in request",
          data: {},
        });
    }

    let r = (Math.random() + 1).toString(36).substring(2);

    const data = {
        email: req.body.email,
        todo: req.body.todo,
        //randomly generate?
        uid: r
    }

    //best way to handle this?
    const query = await db.collection('todo').doc(data.uid).set(data);
    res.status(200).json(query);
})

app.delete("/todo/", async(req, res) => {
    const body = req.body;

    if(body.uid == undefined) {
        return res.json({
          msg: "Error: uid not defined in request",
          data: {},
        });
    }

    //check taskName too?
    await db.collection("todo").doc(body.uid).delete();
    res.status(200).json("Delete Successful");
})

app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);
