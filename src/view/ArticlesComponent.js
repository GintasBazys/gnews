import React from "react";
import {Card, ListGroup, ListGroupItem, Button, Form, Image} from "react-bootstrap";
import axios from "axios";
import searchIcon from "../assets/search.svg";

const ArticlesComponent = ({search, articles, searchArticles, error, handleSearchChange}) => {

    let columns = [];

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
                                <div className="truncate-title">
                                    {article.title}
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <div className="truncate-description">
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
        <div>
            <div className="center">
                <div className="search-form">

                    <Form.Group>
                        {
                            error.length === 0 ? <div></div> : <div className="error"><p>{error}</p></div>
                        }
                        <Form.Control type="text" placeholder="Search articles" value={search} onChange={handleSearchChange} />
                        <div className="search-center">
                            <Button variant="outline-dark" className="search-button" onClick={searchArticles}><Image src={searchIcon} fluid /> Search</Button>
                        </div>

                    </Form.Group>

                </div>
            </div>
            <div className="row no-gutters px-0 center">
                {columns}
            </div>
        </div>

    )
}

export default ArticlesComponent;