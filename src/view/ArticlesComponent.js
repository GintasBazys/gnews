import React, {useEffect, useState} from "react";
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";

const ArticlesComponent = ({search, articlesShow, setSearch}) => {

    const [articles, setArticles] = useState([]);

    const renderArticles = async () => {
        await axios.get(`https://gnews.io/api/v4/search?q=${search}&token=${process.env.REACT_APP_GNEWS}&max=9`)
            .then((res) => {
                setArticles(res.data.articles)
            }).catch((error) => {
                console.log(error.message)
                alert("Search limit reached");
            })
    }


    useEffect(() => {
        renderArticles()
    }, [])

    let columns = [];

    const newSearch = () => {
        setSearch("");
        articlesShow(false);
    }

    const logArticleInfo = async (article) => {
        try {
            await axios.post("http://localhost:3001/articles", {
                article: article
            })
        }catch (e) {

        }
    }

    articles.forEach((article,idx) => {
        columns.push(
            <div className="col-sm" key={idx}>
                <a onClick={() =>logArticleInfo(article)} className="link-style" href={article.url}>
                    <Card className="card-style">
                        <Card.Img variant="top" src={article.image} className="card-image"/>
                        <Card.Body>
                            <Card.Title>
                                <div className="truncate-text">
                                    {article.title}
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <div className="truncate-text">
                                    {article.description}
                                </div>

                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{new Date(article.publishedAt).toDateString()}</ListGroupItem>
                        </ListGroup>
                    </Card>
                </a>
            </div>
        )

        if ((idx+1)%3===0) {columns.push(<div className="w-100 extra-column"></div>)}
    })
    return (
        <div className="row no-gutters px-0 center">
            <div className="center">
                <Button className="new-search" variant="outline-success" onClick={newSearch}>Start new search</Button>
            </div>
            {columns}
        </div>
    )
}

export default ArticlesComponent;