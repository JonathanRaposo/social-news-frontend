import { AuthContext } from '../context/auth.context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://pink-doubtful-hen.cyclic.app';

const AddArticle = ({ oneArticle }) => {
  const { theme, user } = useContext(AuthContext)
  const [share, setShare] = useState('Share');
  const [disabled, setDisabled] = useState(false);

  console.log('user info: ', user)

  const navigate = useNavigate();

  const image = oneArticle?.image?.thumbnail?.contentUrl;
  const { description, url, name, } = oneArticle;

  // const userId = user._id;
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      image,
      url,
      name,
      description,
      userId: user._id

    }
    console.log("body from client:", requestBody);
    const storedToken = localStorage.getItem('authToken');

    axios.post(
      `${API_URL}/api/articles`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        navigate('/news')
        setDisabled(true);
        setShare('Shared');

      })
      .catch((error) => {
        console.log('Error while sending request from client: ', error);
      });


  }



  return (
    <div className={'AddArticle ' + theme}>

      {image && <img src={oneArticle?.image?.thumbnail?.contentUrl} alt="oneArticle" />}
      {!image && <p className="no-image-para">No thumbnail available</p>}

      <a href={oneArticle?.url} target="_blank" rel="noreferrer">
        <h3>{oneArticle?.name}</h3>
      </a>
      <p >{oneArticle?.description}</p>
      <button type="submit" onClick={handleSubmit} disabled={disabled} className={'save-btn ' + theme}>{share}</button>
    </div>
  );
}

export default AddArticle;