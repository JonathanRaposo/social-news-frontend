import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';


const Footer = () => {
    const { theme, } = useContext(AuthContext)

    const currentYear = new Date().getFullYear();
    return (
        <footer className={theme}>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link>Contact</Link>
                </li>
                <li>
                    <Link>Support</Link>
                </li>


            </ul>
            <div className={"social-media-icons-wrapper " + theme}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FaInstagram className="icon" />

                </a>

                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <FaFacebook className="icon" />
                </a>

                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <FaTwitter className="icon" />

                </a>
                <p> &copy; {currentYear} Raposo, Inc. All rights reserved</p>
            </div>

        </footer>
    );
}

export default Footer;