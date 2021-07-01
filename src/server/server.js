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

    console.log("Article title: " + article.title)
    console.log("Article decription: " + article.description)
    console.log("Article content: " + article.content)
    console.log("Article url: " + article.url)
    console.log("Article image: " + article.image)
    console.log("Article published at: " + new Date(article.publishedAt))
    console.log("Article name: " + article.source.name)
    console.log("Article website: " + article.source.url)
})
