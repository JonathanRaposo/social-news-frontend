import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';



const API_URL = "http://localhost:5005";


const Feed = ({ article, refreshArticles }) => {
    const [content, setContent] = useState('');
    const { theme } = useContext(AuthContext);


    const storedToken = localStorage.getItem('authToken');
    console.log('this is one article info: ', article?.user?.firstName)
    console.log('this is the author id: ', article?.user?._id)



    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            author: article?.user?._id,
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


    const firstName = article?.user?.firstName;
    const lastName = article?.user?.lastName

    return (

        <div className={"Feed " + theme}>

            <img src={article?.image} alt="oneArticle" />
            <a href={article?.url} target="_blank" rel="noreferrer">
                <h3>{article?.name}</h3>
            </a>


            <div className="comments-wrapper">
                {article?.comments?.map((comment) => {
                    return (
                        <div key={comment._id} className="card">
                            <div className="initials-display">
                                {getInitials(`${firstName} ${lastName}`)}
                            </div>

                            <div className="text-display">
                                {comment?.content}

                            </div>
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