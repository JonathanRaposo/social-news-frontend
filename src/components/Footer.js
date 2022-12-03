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

                <div className={"social-media-icons-wrapper " + theme}>
                    <a href="https://instagram.com">
                        <FaInstagram className="icon" />

                    </a>

                    <a href="https://facebook.com">
                        <FaFacebook className="icon" />
                    </a>

                    <a href="https://twitter.com">
                        <FaTwitter className="icon" />

                    </a>
                    <p> &copy; {currentYear} Social News, inc. All rights reserved</p>
                </div>
            </ul>

        </footer>
    );
}

export default Footer;