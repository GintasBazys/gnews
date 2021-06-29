import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, ListGroupItem, ListGroup, Button} from "react-bootstrap";

const HomepageComponent = () => {

    const [articles, setArticles] = useState([]);

    const renderArticles = async () => {
        await axios.get(`https://gnews.io/api/v4/search?q=example&token=${process.env.REACT_APP_GNEWS}&max=10`)
            .then((res) => {
                setArticles(res.data.articles)
            })
        await axios.get(`https://gnews.io/api/v4/search?q=example&offset=10&token=${process.env.REACT_APP_GNEWS}&max=6`)
            .then((res) => {
                setArticles(article => [...article, ...res.data.articles])
            })
    }

    useEffect(() => {
        renderArticles().then(r => {

        })
    }, [])

    const showArticle = (url, event) => {
        event.preventDefault()
         window.location.href = url;
    }

    let columns=[];
    articles.forEach((article,idx) => {
        columns.push(
            <div className="col-sm py-3" key={idx}>
                <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src={article.image}/>
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
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
                        <ListGroupItem> <Button onClick={(e) => showArticle(article.source.url, e)} className="btn btn-primary stretched-link">Read article</Button></ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        )

        if ((idx+1)%4===0) {columns.push(<div className="w-100"></div>)}
    })

    return (
        <div>
            <div className="row">
                {columns}
            </div>
        </div>
    )
}

export default HomepageComponent;