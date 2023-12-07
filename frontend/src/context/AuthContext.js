import React, { createContext, useCallback, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? (JSON.parse(localStorage.getItem('authTokens'))) : (null))
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? (jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)) : (null))
    const navigate = useNavigate()

    const loginUser = async (formData) => {
        const url = 'http://127.0.0.1:8000/api/token/'

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            let data = await response.json()

            if (!response.ok) {
                throw new Error(response)
            } else {
                localStorage.setItem('authTokens', JSON.stringify(data))
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const registerUser = async (formData) => {
        const url = 'http://127.0.0.1:8000/api/users/'

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error(response)
            } else {
                const logData = {
                    username: formData.username,
                    password: formData.password
                }
                loginUser(logData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const logoutUser = useCallback(() => {
        localStorage.removeItem('authTokens')
        setUser(null)
        setAuthTokens(null)
        navigate('/login')
    }, [navigate, setAuthTokens, setUser])

    useEffect(() => {
        const updateToken = async () => {
            const url = 'http://127.0.0.1:8000/api/token/refresh/'
            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'refresh': authTokens.refresh })
                });
                let data = await response.json();

                if (response.ok) {
                    setAuthTokens(data);
                    setUser(jwtDecode(data.access));
                    localStorage.setItem('authTokens', JSON.stringify(data));
                } else {
                    setAuthTokens(null);
                    setUser(null);
                    localStorage.removeItem('authTokens');
                    throw new Error(response)
                }
            } catch (err) {
                return false
            }
        }

        // Refreshing logic
        const refresher = 1000
        const interval = setInterval(() => updateToken(), refresher)
        return () => clearInterval(interval)

    }, [authTokens, logoutUser])

    const authContextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}