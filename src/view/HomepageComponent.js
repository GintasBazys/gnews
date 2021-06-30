import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, ListGroupItem, ListGroup, Form, Button, Image} from "react-bootstrap";
import searchIcon from "../assets/search.svg";

const HomepageComponent = () => {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const renderArticles = async () => {
        await axios.get(`https://gnews.io/api/v4/search?q=example&token=${process.env.REACT_APP_GNEWS}&max=9`)
            .then((res) => {
                setArticles(res.data.articles)
            })
    }

    useEffect(() => {
        renderArticles().then(r => {

        })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const searchArticles = () => {
        const validationRegex = /^[\w\-\s]+$/
        console.log(search.length)
        console.log(validationRegex.test(search))
        if(search.length >=40 || !validationRegex.test(search)) {
            setError("Error")
            setTimeout(() => {
                setError("");
            }, 2000)
        }

    }


    let columns=[];
    articles.forEach((article,idx) => {
        columns.push(
            <div className="col-sm" key={idx}>
                <a href={article.source.url}>
                    <Card style={{width: "18rem", margin: "0 auto"}}>
                        <Card.Img variant="top" src={article.image} style={{maxWidth: "100%", height: "150px"}}/>
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
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{marginTop: "2rem", width: "50%"}}>
                    {
                        error.length === 0 ? <div></div> : <div><h1>{error}</h1></div>
                    }
                    <Form.Group>
                        <Form.Label>Search articles</Form.Label>
                        <Form.Control type="text" placeholder="..." value={search} onChange={handleSearchChange} />
                        <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
                            <Button variant="outline-dark" style={{marginRight: "2rem", marginBottom: "2rem"}} onClick={searchArticles}><Image src={searchIcon} fluid /> Search</Button>
                        </div>

                    </Form.Group>

                </div>
            </div>
            <div className="container">
                <div className="row no-gutter px-0">
                    {columns}
                </div>
            </div>

        </div>
    )
}

export default HomepageComponent;