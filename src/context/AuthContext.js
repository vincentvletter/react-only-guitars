import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        status: "pending",
        user: null,
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwt_decode(token)
            console.log(decodedToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
            fetchUserData(token);
        } else {
            setAuth({
                ...auth,
                status: "done",
            })
        }
    }, [])

    const history = useHistory();

    async function fetchUserData(token) {
        try {
            const response = await axios.get("http://localhost:8080/profiles", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setAuth({
                ...auth,
                isAuth: true,
                status: "done",
                user: {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role,
                }
            });
        } catch (e) {
            console.error(e);
            setAuth({
                ...auth,
                status: "done",
            })
        }
    }

    function login(jwtToken) {

        localStorage.setItem("token", jwtToken);

        const decodedToken = jwt_decode(jwtToken);
        console.log(decodedToken);
        console.log("ingelogd");
        setAuth({
            ...auth,
            isAuth: true,
            status: "done",
        })

        fetchUserData(jwtToken);
        history.push("/profile")
    }

    function logout() {
        console.log("uitgelogd");
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
        });
    }

    const contextData = {
        ...auth,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;