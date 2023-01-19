import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import MyArticle from '../components/MyArticle';

const API_URL = "https://pink-doubtful-hen.cyclic.app";

const MyArticleListPage = () => {
    const [myArticles, setMyArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(true);


    const { theme, } = useContext(AuthContext);


    const getAllArticles = (string) => {


        // get token from locaStorage
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${API_URL}/api/articles?sort=${string}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then((response) => {
                console.log('all of my articles: ', response.data)
                setMyArticles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        getAllArticles()
    }, [])


    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }
    const filteredArticle = myArticles.filter((value) => {
        return value.name.toLowerCase().includes(searchTerm.toLowerCase());


    })



    //  handler functions to sort articles and also change button styles

    const handleButton = (descending) => {

        setShow(!show);
        getAllArticles(descending)
    }


    return (
        <div className={"MyArticleListPage " + theme}>

            <input
                type="text"
                placeholder="Search article...🔍"
                className={`search-bar ${theme}`}
                onChange={handleSearchInput}
            />
            <button
                onClick={() => handleButton(true)}
                className={show ? 'show-btn' : 'hide-btn'}>
                Newest ⬇

            </button>

            <button
                onClick={() => handleButton(false)}
                className={show ? 'hide-btn' : 'show-btn'}>
                Oldest ⬆
            </button>

            {filteredArticle.map((article) => {
                return <MyArticle article={article} refreshArticles={getAllArticles} key={article._Id} />

            })}
        </div>

    );
}

export default MyArticleListPage;

