import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyLogin from "./MyLogin";
import API from "./API";


function MyContainer(props) {

    const [user, setUser] = useState([]);

    useEffect(() => {
        API.isLoggedIn().then((response) => {
            if (response.error === undefined) {
                setUser(() => response);
            }
            else {
                setUser(() => undefined);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <Routes>
                {/* Route to show the homepage */}
                <Route
                    path="/" exact
                    element={
                        <>
                            test
                        </>
                    }
                />
                <Route
                    path="/client"
                    element={
                        <>
                            
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <MyLogin setUser={setUser} />
                        </>
                    }
                />
                <Route
                    path="/employee:id"
                    element={
                        <>
                            
                        </>
                    }
                />
                <Route
                    path="/manager"
                    element={
                        <>
                            
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default MyContainer;