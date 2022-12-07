/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import girlWithPhone from '../assets/images/girl-with-phone.jpeg';
import manReading from '../assets/images/man-reading.png'
import axios from 'axios';



const API_URL = "http://localhost:5005"

const ProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [deleteMessage, setDeleteMessage] = useState('');


    const navigate = useNavigate();
    const { theme, user, logOutUser } = useContext(AuthContext);
    const userId = user?._id


    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(
                `${API_URL}/api/user/${userId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log('user info from server: ', response)
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);


            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            firstName,
            lastName,
            email,
            password
        }

        const storedToken = localStorage.getItem('authToken')
        axios
            .put(
                `${API_URL}/api/user/${userId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
            .then((response) => {
                console.log('User updated: ', response)
                navigate('/profile');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteAccount = () => {

        const storedToken = localStorage.getItem('authToken');

        axios
            .delete(
                `${API_URL}/api/user/${userId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log('Account deleted: ', response)
                const deletedAccount = response?.data?.message;
                setDeleteMessage(deletedAccount);
                setTimeout(() => {
                    logOutUser();
                }, 5000)
            })
            .catch((error) => {
                const errorDescription = error?.response?.data?.message;
                setErrorMessage(errorDescription);
                console.log(error)
            })
    }

    return (
        <div className={"ProfilePage " + theme}>

            <div className="feature-wrapper">

                <div className="photo-wrapper">
                    <h1>Manage your account</h1>
                    <img src={girlWithPhone} alt="girl holding phone" />
                </div>

                <div className="para-wrapper">
                    <h2>Keep your profile up to date</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate architecto labore deleniti,quo,distinctio consectetur facere culpa temporibus nulla sit sapiente dolores corrupti minima voluptates aliquiaperiamfugiat voluptatum error. Eius aliquam consequatur aperiam, esse sed nihil ipsam cum perferendis quas oditobcaecatirem incidunt eaque? A, quas nobis. Quibusdam dolor, iure exp.</p>
                </div>

            </div>
            <h3 className='profile-info-heading'>Profile information</h3>
            <div className="info-wrapper">

                <form onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First name</label>
                    <input
                        className={theme}
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}

                    />
                    <label htmlFor='lastName'>Last name</label>
                    <input
                        className={theme}
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}

                    />

                    <label htmlFor='email' className="email-label">Email</label>
                    <input
                        className={theme}
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className={theme}>Update</button>
                </form>



                <div className="photo-wrapper">
                    <h3>Stay current with Social News</h3>
                    <img src={manReading} alt="girl holding phone" />
                </div>

            </div>
            {deleteMessage && <p className='delete-message'>{deleteMessage}</p>}

            <div className="password-wrapper">
                <form onSubmit>
                    <label htmlFor='password' className='password-label'>Password</label>
                    <input
                        className={theme}
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button type="submit" className={theme}>Change password</button>
                </form>

            </div>
            <div className='delete-wrapper'>

                <div>
                    <p>Delete my Social News account</p>
                </div>

                <div>
                    <button onClick={deleteAccount} className={theme}>Delete Account</button>
                </div>
            </div>

        </div>

    );





}



export default ProfilePage;