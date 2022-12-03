
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';


//backend API
const API_URL = "https://pink-doubtful-hen.cyclic.app";



function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);


    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);



    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password }

        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token sent from server:', response.data.authToken);

                storeToken(response.data.authToken);
                console.log("stored token: ", storeToken)
                //verify token by sending a request to the server's jwt validation point
                authenticateUser()
                navigate('/news')
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div className="LoginPage">
            <h3>Log in</h3>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <label htmlFor='email'>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Link to="/signup">
                Don't have an account yet? Sign up
            </Link>

        </div>
    );
}

export default LoginPage;