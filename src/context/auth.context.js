import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:5005";

export const AuthContext = React.createContext();

const AuthProviderWrapper = ({ children }) => {

    const [theme, setTheme] = useState('light')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);


    const navigate = useNavigate();
    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const authenticateUser = () => {
        //get the stored token from the localStorage

        const storedToken = localStorage.getItem('authToken');
        console.log(storedToken)

        if (storedToken) {

            axios.get(
                `${API_URL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }

            )
                .then((response) => {
                    console.log('this is the response from the server: ', response)
                    const user = response.data;

                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user)
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });

        }
        else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        // after loggin out, remove token from localStorage
        localStorage.removeItem("authToken");
    }
    const logOutUser = () => {
        removeToken();
        authenticateUser();
        navigate('/')
        setTheme('light')
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    // handler function to change theme color
    const toggleTheme = (e) => {
        setTheme(e.target.value)
    }




    // object with values to be passed throught the provider to be consumed
    const value = {
        theme,
        toggleTheme,
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProviderWrapper;