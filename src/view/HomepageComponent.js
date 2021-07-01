import React, {useState} from "react";
import ArticlesComponent from "./ArticlesComponent";
import axios from "axios";
import LoadingComponent from "./LoadingComponent";

const HomepageComponent = () => {

    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false)

    const renderArticles = async () => {
        setLoading(true);
        await axios.get(`https://gnews.io/api/v4/search?q=${search}&token=${process.env.REACT_APP_GNEWS}&max=9`)
            .then((res) => {
                setArticles(res.data.articles)
                setLoading(false);
            }).catch((error) => {
                console.log(error.message)
                alert("Search limit reached");
                setLoading(false)
            })
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const searchArticles = async () => {
        const validationRegex = /^[\w ]+$/

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
            renderArticles()
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
            {
                loading ? <div style={{marginTop: "2rem"}} className="center"><LoadingComponent /></div> : <div></div>
            }
            <div className="container" >
                <ArticlesComponent search={search} articles={articles} error={error} handleSearchChange={handleSearchChange} setSearch={setSearch} searchArticles={searchArticles} /> : <div></div>
            </div>

        </div>
    )
}

export default HomepageComponent;