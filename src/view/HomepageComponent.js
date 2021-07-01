import React, {useState} from "react";
import {Form, Button, Image} from "react-bootstrap";
import searchIcon from "../assets/search.svg";
import ArticlesComponent from "./ArticlesComponent";
import axios from "axios";

const HomepageComponent = () => {

    const [articlesShow, setArticlesShow] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");


    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const searchArticles = async () => {
        const validationRegex = /^[\w-]+$/
        if(search.length >=40 || !validationRegex.test(search)) {
            setError("Error")
            setTimeout(() => {
                setError("");
            }, 2000)

            try {
                const response = await axios.post("http://localhost:3001/search", {
                    search: search
                })
            }catch (e) {

            }

        } else {
            setArticlesShow(true);
            try {
                const response = await axios.post("http://localhost:3001/search", {
                    search: search
                })
            }catch (e) {

            }
        }

    }

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
            <div className="container" >
                {
                    articlesShow ? <ArticlesComponent search={search} articlesShow={setArticlesShow}/> : <div></div>
                }
            </div>

        </div>
    )
}

export default HomepageComponent;