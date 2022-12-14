import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import moment from 'moment';




const API_URL = "http://localhost:5005";


const Feed = ({ article, refreshArticles }) => {
    const [content, setContent] = useState('');
    const { theme, user } = useContext(AuthContext);
    console.log('current user: ', user)

    const storedToken = localStorage.getItem('authToken');




    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {

            author: user._id,
            content: content,
            article: article?._id
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
    // function to get just the full name initials
    const getInitials = (name) => {
        return name.split(" ")
            .map((word) => {
                return word[0];
            })
            .join('').toUpperCase();
    }
    // console.log('author', article.comments[0].author)



    return (

        <div className={"Feed " + theme}>

            <img src={article?.image} alt="oneArticle" />
            <a href={article?.url} target="_blank" rel="noreferrer">
                <h3>{article?.name}</h3>
            </a>


            <div className="comments-wrapper">
                {article?.comments?.map((comment) => {

                    const firstName = comment?.author?.firstName;
                    const lastName = comment?.author?.lastName;
                    const date = comment?.createdAt;
                    const m = moment(date).fromNow()
                    return (

                        <div key={comment?._id} className="card">
                            <div className="initials-wrapper">
                                <div className="initials-display">
                                    {getInitials(`${firstName} ${lastName}`)}
                                </div>
                            </div>

                            <div className={"text-display "}>
                                <p className="full-name">{`${firstName} ${lastName}`}</p>
                                <p className="comment-text"> {comment?.content}</p>
                            </div>
                            <span className="show-date">{m}</span>

                        </div>
                    )
                })}

            </div>


            <h5>Comments</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor='content'></label>
                <input
                    className={theme}
                    name="content"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit" className={"reply-btn " + theme}>Post</button>
            </form>

        </div>
    );
}

export default Feed;