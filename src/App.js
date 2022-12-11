import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import NewsListPage from "./pages/NewsListPage";
import MyArticleListPage from './pages/MyArticleListPage';
import Footer from './components/Footer';
import { AuthContext } from './context/auth.context';
import { useContext } from 'react';
import MyArticleDetailsPage from './pages/MyArticleDetailsPage';
import FeedListPage from './pages/FeedListPage';
import ProfilePage from './pages/ProfilePage';




function App() {

  const { theme, user } = useContext(AuthContext)
  return (

    <div className={`App ${user && theme}`}>


      <div className={"wrapper " + theme}>
        <Navbar />
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/articles" element={<MyArticleListPage />} />
          <Route path="/articles/:articleId" element={<MyArticleDetailsPage />} />
          <Route path="/feed" element={<FeedListPage />} />
          <Route path="/profile" element={<ProfilePage />} />


        </Routes>
        <div className="push"></div>
      </div>




      <Footer />
    </div>

  );
}

export default App;
