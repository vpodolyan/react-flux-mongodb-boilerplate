import express from "express";

import {MongoClient} from "mongodb";

let app = express();

app.use(express.static("public"));

// MongoDb url is expected as first cli argument, default url otherwise
let mongoUrl = process.argv[2] ? process.argv[2] : "mongodb://rgrjs:123456@ds025469.mlab.com:25469/rgrjs";
let db
MongoClient.connect(mongoUrl, (err, database) => {
  if (err) throw err;

  db = database;
  console.log(process.env.MONGO_URL);
  app.listen(3000, () => console.log("Listening on port 3000"));
});

app.get("/data/links", (req, res) => {
  db.collection("links").find({}).toArray((err, links) => {
    if (err) throw err;

    res.json(links);
  });
});
