/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";


const MyArticleDetailsPage = () => {
    const [article, setArticle] = useState({});
    const { theme, user } = useContext(AuthContext);
    const [content, setContent] = useState('');


    const navigate = useNavigate();
    const { articleId } = useParams();
    const storedToken = localStorage.getItem('authToken');


    const getArticle = () => {

        axios
            .get(
                `${API_URL}/api/articles/${articleId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneArticle = response.data
                setArticle(oneArticle);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getArticle();
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            author: user?._id,
            content: content,
            article: articleId
        }

        axios
            .post(
                `${API_URL}/api/articles/${articleId}/comment`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log('comment created in database: ', response);
                navigate('/feed');
                setContent('');





            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className={'MyArticleDetailsPage ' + theme}>

            <img src={article?.image} alt="oneArticle" />
            <a href={article?.url} target="_blank" rel="noreferrer">
                <h3>{article?.name}</h3>
            </a>
            <p >{article?.description}</p>





            <h5>comments</h5>

            <form onSubmit={handleSubmit}>

                <input
                    className={theme}
                    name="content"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit" className={theme}>Post</button>
            </form>
        </div>
    );
}

export default MyArticleDetailsPage;