import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyLogin from "./MyLogin";
import MyEmployee from "./MyEmployee";
import API from "./API";
import MyNavBar from "./MyNavBar";
import Row from "react-bootstrap/Row"
import MyFormSignUp from "./MyFormSignUp";
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
import MyNotAvailableOrders from "./MyNotAvailableOrders";
import MyAvailableOrders from "./MyAvailableOrders";
import MyWManager from "./MyWManager";
import LeftEmployee from "./LeftEmployee";
import MyDeliveries from "./MyDeliveries";
import LeftClient from "./LeftClient";
import LeftFarmer from "./LeftFarmer";
import LeftWManager from "./LeftWManager";


function MyContainer(props) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState();
  const [clock, setClock] = useState();
  const [modify, setModify] = useState(false);
  const [orderId, setOrderId] = useState()
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [fil, setFil] = useState(undefined)


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
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil}></LeftClient>
                <MyEmployee clock={clock}
                  setClock={setClock}
                  user={user}
                />
              </Row>

            </>
          }
        />
        <Route
          path="/client/profile"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil}></LeftClient>

                <MyClientProfile
                  clock={clock}
                  setClock={setClock}
                  user={user}
                  id={user ? user.id : undefined}
                />
              </Row>

            </>
          }
        />
        <Route
          path="/client/orders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
              <LeftClient fil={fil} setFil={setFil}></LeftClient>

              <MyOrders
                setModify={setModify}
                clock={clock}
                setClock={setClock}
                user={user}
                setOrderId={setOrderId}
                cart={cart}
                setCart={setCart}
                full={0}
              ></MyOrders>
              </Row>
            </>
          }
        />
        <Route
          path="/farmer"
          exact
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
              <LeftFarmer fil={fil} setFil={setFil}></LeftFarmer>
              <MyFarmer clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
              <LeftFarmer fil={fil} setFil={setFil}></LeftFarmer>

              <MyFarmerOrders
                clock={clock}
                setClock={setClock}
                user={user}
              />
              </Row>
              
            </>
          }
        />
        <Route
          path="/farmer/products"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
              <LeftFarmer fil={fil} setFil={setFil}></LeftFarmer>

              <MyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
              />
              </Row>
              
            </>
          }
        />
        <Route
          path="/farmer/myProducts"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
                <LeftFarmer fil={fil} setFil={setFil}></LeftFarmer>
                <MyMyProducts
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={true}
              />
              </Row>
            </>
          }
        />
        <Route
          path="/wmanager"
          exact
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
                <LeftWManager fil={fil} setFil={setFil}></LeftWManager>
                <MyWManager clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/wmanager/deliveries"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <Row>
                <LeftWManager fil={fil} setFil={setFil}></LeftWManager>
                <MyDeliveries
                clock={clock}
                setClock={setClock}
                user={user}
                cart={cart}
                setCart={setCart}
                showCart={false}
              />
              </Row>
              
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
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
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
              ></MyNavBar>
              <MyFormSignUp
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
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>
                <MyEmployee
                  clock={clock}
                  setClock={setClock}
                  user={user}
                ></MyEmployee>
              </Row>
            </>
          }
        />
        <Route
          path="/employee/clients/:id"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>
                <MySingleClient
                  clock={clock}
                  setClock={setClock}
                  user={user}
                ></MySingleClient>
              </Row>
            </>
          }
        />
        <Route
          path="/employee/orders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>

              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>

                <MyOrders
                  clock={clock}
                  setClock={setClock}
                  user={user}
                  full={0}
                ></MyOrders>
              </Row>

            </>
          }
        />
        <Route
          path="/employee/clients"
          exact
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={true}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>
                <MyClients clock={clock} setClock={setClock}></MyClients>
              </Row>
            </>
          }
        />
        <Route
          path="/client/products"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={true}
                setUser={setUser}
              ></MyNavBar>
              <Row>
              <LeftClient fil={fil} setFil={setFil}></LeftClient>


                <MyProducts
                  clock={clock}
                  setClock={setClock}
                  user={user}
                  cart={cart}
                  setCart={setCart}
                  showCart={true}
                ></MyProducts>
              </Row>
            </>
          }
        />

        <Route
          path="/employee/products"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={true}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>

                <MyProducts
                  clock={clock}
                  setClock={setClock}
                  user={user}
                  cart={cart}
                  setCart={setCart}
                  showCart={true}
                ></MyProducts>
              </Row>

            </>
          }
        />
        <Route path="/manager" element={<></>} />
        <Route
          path="/employee/form"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil}></LeftEmployee>

                <MyForm clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/wmanager/availableOrders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftWManager fil={fil} setFil={setFil}></LeftWManager>
              <MyAvailableOrders clock={clock} setClock={setClock} user={user} role="VM" />

              </Row>
            </>
          }
        />
        <Route
          path="/wmanager/notAvailableOrders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftWManager fil={fil} setFil={setFil}></LeftWManager>
                <MyNotAvailableOrders clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/client/availableOrders"
          element={
            <>
              <MyNavBar setFil={setFil}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <Row>
              <LeftClient fil={fil} setFil={setFil}></LeftClient>
              <MyAvailableOrders clock={clock} setClock={setClock} user={user} role="client" />

              </Row>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default MyContainer;
