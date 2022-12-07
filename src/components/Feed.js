import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';



const API_URL = "https://pink-doubtful-hen.cyclic.app";


const Feed = ({ article, refreshArticles }) => {
    const [content, setContent] = useState('');
    const { theme } = useContext(AuthContext);



    const storedToken = localStorage.getItem('authToken');


    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            author: article?.user,
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
                console.log('response from server: ', response);

                setContent('');
                refreshArticles();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // firstname.charAt(0);
    // lastname.charAt(0)

    const getInitials = (name) => {
        return name.split(" ")
            .map((word) => {
                return word[0];
            })
            .join('');
    }
    const firstName = article?.user?.firstName;
    const lastName = article?.user?.lastName;

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
                            <div className="num-display">
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

export default Feed;