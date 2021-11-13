import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyLogin from "./MyLogin";
import MyEmployee from "./MyEmployee"
import API from "./API";
import MyNavBar from "./MyNavBar";
import MyClients from "./MyClients";
import MySingleClient from "./MySingleClient";
import MyProducts from "./MyProducts";
import MyForm from "./MyForm";


function MyContainer(props) {

    const [user, setUser] = useState([]);    
    const [cart, setCart] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("cart");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
      });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

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
                    path="/signup"
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
                    path="/employee" exact
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>
                            <MyEmployee></MyEmployee>
                        </>
                    }
                />
                <Route
                    path="/employee/clients/:id"
                    element={
                        <>  
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>
                            <MySingleClient></MySingleClient>
                        </>
                    }
                />
                <Route
                    path="/employee/clients" exact
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>
                            <MyClients></MyClients>
                        </>
                    }
                />
                <Route
                    path="/employee/products"
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>
                            <MyProducts cart={cart} setCart={setCart}></MyProducts>
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