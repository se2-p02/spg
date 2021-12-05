import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import MyFarmer from "./MyFarmer";
import MyMyProducts from "./MyMyProducts";
import MyClientPage from "./MyClientPage";
import moment from 'moment';
import MyClientProfile from './MyClientProfile';
import MyFarmerOrders from "./MyFarmerOrders";
import MyAvailableOrders from "./MyAvailableOrders";

function MyContainer(props) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState();
  const [clock, setClock] = useState();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    API.getClock().then((c) => {
      if (c.error === undefined) {
        setClock(() => moment(c.serverTime) || moment());
      }
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  useEffect(() => {
    API.isLoggedIn()
      .then((response) => {
        if (response.error === undefined && response.role !== undefined) {
          setUser({
            username: response.username,
            role: response.role,
            id: response.id,
          });
        } else {
          setUser(() => undefined);
        }
        setLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //getting the wallet amount from the db after the user is set
  useEffect(() => {
    if (user) {
      API.loadWallet(user.id)
        .then((c) => {
          if (c.error === undefined) 
            setShowModal(c);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  //update the basket ftrom the db after the user is  set
  useEffect(() => {
    if (user) {
      API.updateBasket(user.id, cart)
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, cart]);

  //getting the items from the user table and fill the state(cart)
  useEffect(() => {
    if (user) {
      API.loadClient(user.id)
        .then((c) => {
          if (c.error === undefined) {
            const json = c.basket;
            const basket = JSON.parse(json);
            setCart([...basket]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  if (login && !user && location.pathname !== "/login" && location.pathname !== "/signup") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Routes>
        {/* Route to show the homepage */}
        <Route
          path="/"
          exact
          element={
            <>
              <Navigate to="/login" />
            </>
          }
        />
        <Route
          path="/client"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyClientPage clock={clock} setClock={setClock}
                showModal={showModal}
                onHide={() => setShowModal(false)} />
            </>
          }
        />
        <Route
          path="/client/profile"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyClientProfile
                clock={clock}
                setClock={setClock}
                user={user}
                id={user ? user.id : undefined}
              />
            </>
          }
        />
        <Route
          path="/client/orders"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyOrders
                clock={clock}
                setClock={setClock}
                user={user}
              ></MyOrders>
            </>
          }
        />
        <Route
          path="/farmer"
          exact
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyFarmer clock={clock} setClock={setClock} user={user} />
            </>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyFarmerOrders
              clock={clock}
              setClock={setClock}
              user={user}
              />
            </>
          }
        />
        <Route
          path="/farmer/products"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={true}
              />
            </>
          }
        />
        <Route
          path="/farmer/myProducts"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyMyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={true}
              />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyLogin
                user={user}
                setUser={setUser}
              />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyForm
                clock={clock}
                setClock={setClock}
                user={user}
                setUser={setUser}
              />
            </>
          }
        />
        <Route
          path="/employee"
          exact
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyEmployee
                clock={clock}
                setClock={setClock}
                user={user}
              ></MyEmployee>
            </>
          }
        />
        <Route
          path="/employee/clients/:id"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MySingleClient
                clock={clock}
                setClock={setClock}
                user={user}
              ></MySingleClient>
            </>
          }
        />
        <Route
          path="/employee/orders"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyOrders
                clock={clock}
                setClock={setClock}
                user={user}
              ></MyOrders>
            </>
          }
        />
        <Route
          path="/employee/clients"
          exact
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <MyClients clock={clock} setClock={setClock}></MyClients>
            </>
          }
        />
        <Route
          path="/client/products"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={true}
                setUser={setUser}
              ></MyNavBar>
              <MyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyProducts>
            </>
          }
        />

        <Route
          path="/employee/products"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={true}
                setUser={setUser}
              ></MyNavBar>
              <MyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyProducts>
            </>
          }
        />
        <Route path="/manager" element={<></>} />
        <Route
          path="/employee/form"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <MyForm clock={clock} setClock={setClock} user={user} />
            </>
          }
        />
      { /* TEST */}
      <Route
          path="/availableProd"
          element={
            <>
              <MyNavBar
                user={user}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <MyAvailableOrders clock={clock} setClock={setClock} user={user} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default MyContainer;
