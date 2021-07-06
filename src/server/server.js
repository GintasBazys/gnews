const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {MongoClient} = require("mongodb");
require("dotenv").config();

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@cluster0.zefug.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3001;

app.listen(port, () => {
    console.log("Starting server")
})

app.post("/search", cors(),async (req, res) => {

    const timestamp = Math.floor(new Date().getTime()/1000);
    const timestampDate = new Date(timestamp*1000);
    const {search} = req.body;

    const searchObj = {
        searchQuery: search,
        timestamp: timestampDate
    }

    try {

        await client.connect().catch((error) => {
            console.log(error)
        })

        const db = await client.db("test");

        await db.collection("searches").insertOne(searchObj).catch((error) => {
            console.log(error)
        })

        await db.close()
        await client.close()

    } catch (e) {

    }

    console.log("User searched: " + search)
})

app.post ("/articles", cors(), async (req) => {
    const {article} = req.body;
    console.log(article)

    try {

        await client.connect().catch((error) => {
            console.log(error)
        })

        const db = await client.db("test");

        await db.collection("articles").insertOne(article).catch((error) => {
            console.log(error)
        })

        await db.close()
        await client.close()

    } catch (e) {

    }

})
