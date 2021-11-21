import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyLogin from "./MyLogin";
import MyEmployee from "./MyEmployee";
import API from "./API";
import MyNavBar from "./MyNavBar";
import MyClients from "./MyClients";
import MySingleClient from "./MySingleClient";
import MyProducts from "./MyProducts";
import MyForm from "./MyForm";
import MyOrders from "./MyOrders";

function MyContainer(props) {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.loadClient(user.id)
      .then((c) => {
        if (c.error === undefined) {
          const json = c.basket;
          const basket = JSON.parse(json);
          console.log(basket);
          setCart([...basket], cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.isLoggedIn()
      .then((response) => {
        if (response.error === undefined) {
            
          setUser(() => response);
        } else {
          setUser(() => undefined);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Routes>
        {/* Route to show the homepage */}
        <Route path="/" exact element={<>test</>} />
        <Route path="/client" element={<></>} />

        <Route
          path="/login"
          element={
            <>
              <MyLogin setUser={setUser} />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <MyNavBar
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyForm setUser={setUser} />
            </>
          }
        />
        <Route
          path="/employee"
          exact
          element={
            <>
              <MyNavBar
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyEmployee></MyEmployee>
            </>
          }
        />
        <Route
          path="/employee/clients/:id"
          element={
            <>
              <MyNavBar
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MySingleClient></MySingleClient>
            </>
          }
        />
        <Route
          path="/employee/orders"
          element={
            <>
              <MyNavBar
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyOrders></MyOrders>
            </>
          }
        />
        <Route
          path="/employee/clients"
          exact
          element={
            <>
              <MyNavBar
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyClients></MyClients>
            </>
          }
        />

        <Route
          path="/employee/products"
          element={
            <>
              <MyNavBar
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyProducts
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyProducts>
            </>
          }
        />
        <Route path="/manager" element={<></>} />
        {/* just for testing */}
        <Route
          path="/employee/form"
          element={
            <>
              <MyNavBar cart={cart} setCart={setCart}></MyNavBar>

              <MyForm />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default MyContainer;
