import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import screenshotHP from '../assets/images/screenshot-1.jpg';
import apple from '../assets/images/apple.png';
import url from '../assets/images/url.png';
import inlineBooks from '../assets/images/inlinebooks.png';

function HomePage() {

  const { theme } = useContext(AuthContext);
  return (
    <div className={"HomePage " + theme}>

      <div className="section-1">

        <div className='get-started-wrapper'>
          <h1>Get started with Social News!</h1>
          <p>Save interesting articles and share them with your peers!</p>
          <Link to="/signup" className="see-more-link">
            Join us
          </Link>
        </div>

        <div className='image-wrapper'>
          <img src={screenshotHP} alt="pic display" />
        </div>
      </div>
      <div className="section-2">
        <div className="columns-wrapper">
          <div className="column">
            <img src={apple} alt="apple on books" />
            <p>one click away</p>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="column">
            <img src={url} alt="url icon" />
            <p>Easy to use</p>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="column">
            <img src={inlineBooks} alt="inline books" />
            <p>Give it a try</p>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

      </div>


    </div>
  );
}

export default HomePage;