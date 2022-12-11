import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bookIcon from '../assets/images/bookstack.png';
import { useState } from 'react';

//backend API 
const API_URL = "http://localhost:5005";



const SignupPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    // event handler function when submitting the form
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        // send user info in the request body
        const requestBody = {
            email,
            password,
            firstName,
            lastName
        }
        // Make request with axios to the backend API
        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                console.log('axios response: ', response)
                navigate('/login');

            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (


        <div className={"SignupPage"}>
            <div className="Signup-section">
                <img
                    src={bookIcon}
                    alt="book icon"
                    style={{ maxWidth: "150px" }}
                />

                <h3>Create an account</h3>

                <form onSubmit={handleSignupSubmit}>

                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    // required
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    // required
                    />
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    // required
                    />

                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    // required
                    />
                    <button type="submit" className="signup-btn">Sign Up</button>

                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Link to='/login' className="login-link">
                    Already have an account? Log in now
                </Link>
            </div>


        </div>



    );
}

export default SignupPage;