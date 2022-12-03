import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';



const API_URL = "http://localhost:5005";


const Feed = ({ article, refreshArticles }) => {
    const [content, setContent] = useState('');
    const { theme } = useContext(AuthContext);
    const [comment, setComment] = useState([]);




    const storedToken = localStorage.getItem('authToken');



    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            user: article?.user,
            content: content,
            article: article._id
        }

        axios
            .post(
                `${API_URL}/api/articles/${article._id}/comment`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then((response) => {
                console.log('comment created in database: ', response);

                setContent('');
                refreshArticles();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (

        <div className={"Feed " + theme}>

            <img src={article?.image} alt="oneArticle" />
            <a href={article?.url} target="_blank" rel="noreferrer">
                <h3>{article?.name}</h3>
            </a>

            <div className="comments-wrapper">
                {article.comments.map((comment) => {
                    return (
                        <div>{comment.content}</div>
                    )
                })}

            </div>

            <h5>Comments</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor='content'></label>
                <textarea
                    className={theme}
                    name="content"
                    id="content"
                    cols="30"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit" className={theme}>Reply</button>
            </form>

        </div>
    );
}

export default Feed;