import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import MyArticle from '../components/MyArticle';

const API_URL = "https://pink-doubtful-hen.cyclic.app";

const MyArticleListPage = () => {
    const [myArticles, setMyArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [buttonOne, setButtonOne] = useState('show-btn-1');
    const [buttonTwo, setButtonTwo] = useState('hide-btn');


    const { theme, } = useContext(AuthContext);


    const getAllArticles = () => {


        // get token from locaStorage
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${API_URL}/api/articles`,
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
        return searchTerm === '' || value.name.toLowerCase().includes(searchTerm.toLowerCase());


    })

    //  calling backen API to sort articles in descending order
    const getDescendingArticles = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${API_URL}/api/articles/sort/descending`,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then((response) => {
                console.log('my sorted articles in descending order: ', response.data)
                setMyArticles(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // calling backend API  to sort articles in ascending order

    const getAscendingArticles = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${API_URL}/api/articles/sort/ascending`,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then((response) => {
                console.log('My sorted articles in ascending order: ', response.data)
                setMyArticles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //  handler functions to sort articles and also change button styles

    const handleButtonOne = () => {
        setButtonOne('hide-btn');
        setButtonTwo('show-btn-2');
        getDescendingArticles();
    }

    const handleButtonTwo = () => {
        setButtonTwo('hide-btn');
        setButtonOne('show-btn-1');
        getAscendingArticles();

    }
    return (
        <div className={"MyArticleListPage " + theme}>

            <input
                type="text"
                placeholder="Search article..."
                className={`search-bar ${theme}`}
                onChange={handleSearchInput}
            />
            <button
                onClick={handleButtonOne}
                className={`${buttonOne} ${theme}`}>
                Newest ⬇

            </button>

            <button
                onClick={handleButtonTwo}
                className={`${buttonTwo} ${theme}`}>
                Oldest ⬆
            </button>

            {filteredArticle.map((article) => {
                return <MyArticle article={article} refreshArticles={getAllArticles} key={article._Id} />

            })}
        </div>

    );
}

export default MyArticleListPage;

