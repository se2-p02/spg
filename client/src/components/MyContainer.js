import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyLogin from "./MyLogin";
import MyEmployee from "./MyEmployee"
import API from "./API";
import MyNavBar from "./MyNavBar";
import MyClients from "./MyClients";
import MySingleClient from "./MySingleClient";
import MyProducts from "./MyProducts";
import MyForm from "./MyForm";
import MyOrders from "./MyOrders";
import MyNewProducts from "./MyNewProducts";
import MyFarmer from "./MyFarmer";
import MyMyProducts from "./MyMyProducts";


function MyContainer(props) {

    const [user, setUser] = useState();
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
            if (response.error === undefined && response.role !== undefined) {
                setUser({username: response.username, role: response.role});
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
                            <Navigate to="/login"/>
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
                    path="/farmer" exact
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyFarmer user={user} />
                        </>
                    }
                />
                <Route
                    path="/farmer/products"
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyProducts user={user} cart={cart} setCart={setCart} showCart={true}/>
                        </>
                    }
                />
                <Route
                    path="/farmer/myProducts"
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyMyProducts user={user} cart={cart} setCart={setCart} showCart={true}/>
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <MyLogin user={user} setUser={setUser} />
                        </>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={false}></MyNavBar>
                            <MyForm user={user} setUser={setUser} />
                        </>
                    }
                />
                <Route
                    path="/employee" exact
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyEmployee user={user}></MyEmployee>
                        </>
                    }
                />
                <Route
                    path="/employee/clients/:id"
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MySingleClient user={user}></MySingleClient>
                        </>
                    }
                />
                <Route
                    path="/employee/orders"
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyOrders user={user}></MyOrders>
                        </>
                    }
                />
                <Route
                    path="/employee/clients" exact
                    element={
                        <>
                            <MyNavBar setUser={setUser} cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyClients></MyClients>
                        </>
                    }
                />

                <Route
                    path="/employee/products"
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart} showCart={true}></MyNavBar>
                            <MyProducts cart={cart} setCart={setCart} showCart={true}></MyProducts>
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
                <Route
                    path="/employee/form"
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>

                            <MyForm user={user}/>
                        </>
                    }
                />
                {/* just for testing */}
                <Route
                    path="/newProducts"
                    element={
                        <>
                            <MyNavBar cart={cart} setCart={setCart}></MyNavBar>

                            <MyNewProducts user={user}/>
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default MyContainer;