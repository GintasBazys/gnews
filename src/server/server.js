const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const port = 3001;

app.listen(port, () => {
    console.log("Starting server")
})

app.post("/search", cors(), (req, res) => {
    const {search} = req.body;

    console.log("User searched: " + search)
})

app.post("/articles", cors(), (req) => {
    const {article} = req.body;

    console.log(article)
})
