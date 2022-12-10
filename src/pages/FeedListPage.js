import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Feed from '../components/Feed';



const API_URL = "http://localhost:5005";

const FeedListPage = () => {
    const [myArticles, setMyArticles] = useState([]);
    const { theme, } = useContext(AuthContext);


    const getAllArticles = () => {

        //get token from localStorage
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(
                `${API_URL}/api/articles`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log('my articles: ', response.data);
                setMyArticles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }
    useEffect(() => {
        getAllArticles();
    }, []);



    return (
        <div className={"FeedListPage " + theme}>
            <h3 className="my-feed-heading">Feed</h3>
            {myArticles.map((article) => {
                return <Feed key={article._id} article={article} refreshArticles={getAllArticles} />

            })}

        </div>
    )
}

export default FeedListPage;