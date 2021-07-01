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
        if(search.length >=40) {
            setError("Please enter no more than 40 characters")
            setTimeout(() => {
                setError("");
            }, 2000)

            try {
                await axios.post("http://localhost:3001/search", {
                    search: search
                })
            }catch (e) {

            }

        } else if(!validationRegex.test(search)) {

            setError("Please enter alphanumerical characters only")
            setTimeout(() => {
                setError("");
            }, 2000)

            try {
                await axios.post("http://localhost:3001/search", {
                    search: search
                })
            }catch (e) {

            }

        } else {
            setArticlesShow(true);
            try {
                await axios.post("http://localhost:3001/search", {
                    search: search
                })
            }catch (e) {

            }
        }

    }

    return (
        <div>
            <div className="center">
                <div className="search-form">

                    <Form.Group>
                        <Form.Label>Search articles</Form.Label>
                        {
                            error.length === 0 ? <div></div> : <div className="error"><h5>{error}</h5></div>
                        }
                        <Form.Control type="text" placeholder="..." value={search} onChange={handleSearchChange} />
                        <div className="search-center">
                            <Button variant="outline-dark" className="search-button" onClick={searchArticles}><Image src={searchIcon} fluid /> Search</Button>
                        </div>

                    </Form.Group>

                </div>
            </div>
            <div className="container" >
                {
                    articlesShow ? <ArticlesComponent search={search} setSearch={setSearch} articlesShow={setArticlesShow}/> : <div></div>
                }
            </div>

        </div>
    )
}

export default HomepageComponent;