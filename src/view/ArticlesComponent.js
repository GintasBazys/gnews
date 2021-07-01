import React, {useEffect, useState} from "react";
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";

const ArticlesComponent = ({search, articlesShow}) => {

    const [articles, setArticles] = useState([]);

    const renderArticles = async () => {
        await axios.get(`https://gnews.io/api/v4/search?q=${search}&token=${process.env.REACT_APP_GNEWS}&max=9`)
            .then((res) => {
                setArticles(res.data.articles)
            }).catch((error) => {
                console.log(error.message)
            })
    }


    useEffect(() => {
        renderArticles()
    }, [])

    let columns = [];

    const newSearch = () => {
        articlesShow(false);
    }

    const logArticleInfo = async (article) => {
        try {
            const response = await axios.post("http://localhost:3001/articles", {
                article: article
            })
        }catch (e) {

        }
    }

    articles.forEach((article,idx) => {
        columns.push(
            <div style={{width: "33%"}} className="col-3" key={idx}>
                <a onClick={() =>logArticleInfo(article)} style={{textDecoration: "none", color: "black"}} href={article.url}>
                    <Card className="mh-100" style={{margin: "0 auto"}}>
                        <Card.Img variant="top" src={article.image} style={{maxWidth: "100%", height: "15rem"}}/>
                        <Card.Body>
                            <Card.Title>
                                <div style={{
                                    display: "-webkit-box",
                                    "-webkit-line-clamp": "2",
                                    "-webkit-box-orient": "vertical",
                                    overflow: "hidden",
                                    textOverflow: "elipsis"
                                }}>
                                    {article.title}
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <div style={{
                                    display: "-webkit-box",
                                    "-webkit-line-clamp": "2",
                                    "-webkit-box-orient": "vertical",
                                    overflow: "hidden",
                                    textOverflow: "elipsis"
                                }}>
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

        if ((idx+1)%3===0) {columns.push(<div className="w-100" style={{padding: "2rem"}}></div>)}
    })
    return (
        <div className="row no-gutters px-0">
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{marginTop: "1rem", marginBottom: "2rem", width: "50%"}} variant="outline-success" onClick={newSearch}>Start new search</Button>
            </div>
            {columns}
        </div>
    )
}

export default ArticlesComponent;