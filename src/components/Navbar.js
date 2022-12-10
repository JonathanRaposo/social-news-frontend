import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/images/typing1.png'


const Navbar = () => {

  const {
    theme,
    toggleTheme,
    isLoggedIn,
    logOutUser,
    user } = useContext(AuthContext)



  return (
    <nav className={"Navbar " + theme}>
      <Link to="/">
        <img src={logo} alt="logo icon" />

      </Link>
      <ul>
        <span>{user && user.firstName}</span>

        {isLoggedIn && (
          <div>
            <li>
              <Link to="/news">
                News
              </Link>
            </li>
            <li>
              <Link to="/feed">
                Feed
              </Link>
            </li>
            <li>
              <Link to="/articles">
                My articles
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>



            <li>
              <button onClick={logOutUser} className={"logout-btn " + theme}>Log out</button>

            </li>
            <li>
              <select value={theme} onChange={toggleTheme} className={theme}>
                <option>light</option>
                <option>dark</option>
                <option>bisque</option>

              </select>
            </li>


          </div>
        )}


        {!isLoggedIn && (
          <div>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/About">
                About
              </Link>
            </li>
            <li>
              <Link to="/signup">
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login">
                Log in
              </Link>
            </li>


          </div>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;




