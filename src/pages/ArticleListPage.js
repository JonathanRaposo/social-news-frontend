import { useState, useEffect } from 'react'
import axios from 'axios';
import AddArticle from '../components/AddArticle';
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react';
import articleList from '../articleList.json';

// const API_URL = "http://localhost:5005";

const ArticleListPage = () => {

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useContext(AuthContext);


  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: { safeSearch: 'Off', textFormat: 'Raw' },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': 'd16af6ea87msh6df8da01907ff5bp1b1a28jsn8fbe0a8548ec',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };



  const getAllArticles = () => {

    axios.request(options)
      .then((response) => {

        console.log("response from Bing Search news API: ", response)
        setArticles(response.data.value)
      })
      .catch((error) => {
        console.log('Error while fetching data: ', error)
      })
  }


  useEffect(() => {
    getAllArticles();
  }, [])



  return (

    <div className={'ArticleListPage ' + theme}>

      {articles && articles.map((article, index) => {
        return (
          <AddArticle key={index} oneArticle={article} />
        )
      })}
      {!articles && <p>Loading...</p>}

    </div>
  )

}

export default ArticleListPage;