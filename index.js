const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.penll.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const taskCollection = client.db("user").collection("bill");

    app.get("/billing-list", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });
    app.post("/billing-list", async (req, res) => {
      console.log(req.body);
      const result = await taskCollection.insertOne(req.body);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Listening to server");
});
