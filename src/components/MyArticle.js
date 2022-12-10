import { AuthContext } from "../context/auth.context";
import { useContext, } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';


const API_URL = "http://localhost:5005";



const MyArticle = ({ article, refreshArticles }) => {
    const { theme } = useContext(AuthContext)

    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken')


    const deleteArticle = () => {
        window.confirm('This will remove this article from your profile.')

        axios
            .delete(

                `${API_URL}/api/articles/${article._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then(() => {
                navigate('/articles')
                refreshArticles();
            })

    }


    return (
        <div className={"article-wrapper " + theme} key={article?._id}>
            <a href={article?.url} target="_blank" rel="noreferrer">
                <div>
                    <img src={article?.image} alt="article pic" />
                </div>
            </a>

            <Link to={`/articles/${article?._id}`}>
                <h3>{article?.name}</h3>
            </Link>
            <div className="button-wrapper">
                <div className="each-button">
                    <button className={`delete-btn ${theme}`} onClick={deleteArticle}>
                        <FaTimes color='purple' />
                    </button>

                </div>


            </div>

        </div>
    );
}



export default MyArticle;