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
import LeftWWorker from "./LeftWWorker";
import LeftManager from "./LeftManager";


function MyContainer(props) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState();
  const [clock, setClock] = useState();
  const [modify, setModify] = useState(false);
  const [orderId, setOrderId] = useState()
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [fil, setFil] = useState([])


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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                account = {true}
                showCart={true}
                fil={["Profile", "Products", "My Orders", "Orders in shop"]}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil} user={user}></LeftClient>
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                account = {true}
                showCart={true}
                fil={["Profile", "Products", "My Orders", "Orders in shop"]}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil} user={user}></LeftClient>

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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                account = {true}
                fil={["Profile", "Products", "My Orders", "Orders in shop"]}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil} user={user}></LeftClient>

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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                account = {true}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
                showCart={false}
                fil={["Orders", "Products"]}
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                cart={cart}
                account = {true}
                setCart={setCart}
                showCart={false}
                fil={["Orders", "Products"]}
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                setUser={setUser}
                account = {true}
                cart={cart}
                setCart={setCart}
                showCart={false}
                fil={["Orders", "Products"]}
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Orders", "Products"]}
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
          path="/wworker"
          exact
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Available Orders"]}
                setFil={setFil}
              ></MyNavBar>
              <Row>
                <LeftWWorker fil={fil} setFil={setFil}></LeftWWorker>
                <></>

              </Row>
            </>
          }
        />

        <Route
          path="/wworker/notAvailableOrders"
          element={
            <>
              <MyNavBar
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
                fil={["Available Orders"]}
                setFil={setFil}
              ></MyNavBar>
              <Row>
                <LeftWWorker fil={fil} setFil={setFil}></LeftWWorker>
                <MyNotAvailableOrders clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/wmanager"
          exact
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Deliveries", "Confirm Orders"]}
                setFil={setFil}
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Deliveries", "Confirm Orders"]}
                setFil={setFil}
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
          path="/manager"
          exact
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Unretrieved Orders"]}
                setFil={setFil}
              ></MyNavBar>
              <Row>
                <LeftManager fil={fil} setFil={setFil}></LeftManager>
                <></>

              </Row>
            </>
          }
        />
        <Route
          path="/manager/unretrievedOrders"
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Unretrieved Orders"]}
                setFil={setFil}
              ></MyNavBar>
              <Row>
                <LeftManager fil={fil} setFil={setFil}></LeftManager>
              </Row>

            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <MyNavBar setFil={setFil} account = {false} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={undefined}
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
              <MyNavBar setFil={setFil} account = {false} setShowModal={setShowModal}

                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={undefined}
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>
              <Row>
                <LeftEmployee  showModal={showModal} setShowModal={setShowModal} fil={fil} setFil={setFil} setClock={setClock} clock={clock} clock={clock}></LeftEmployee>
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>
              <Row>
                <LeftEmployee fil={fil} setFil={setFil} setClock={setClock} clock={clock}></LeftEmployee>
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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                account = {true}
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>

              <Row>
                <LeftEmployee showModal={showModal} setShowModal={setShowModal} fil={fil} setFil={setFil} setClock={setClock} clock={clock}></LeftEmployee>

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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                account = {true}
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>
              <Row>
                <LeftEmployee showModal={showModal} setShowModal={setShowModal} fil={fil} setFil={setFil} setClock={setClock} clock={clock}></LeftEmployee>
                <MyClients clock={clock} setClock={setClock}></MyClients>
              </Row>
            </>
          }
        />
        <Route
          path="/client/products"
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                account = {true}
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil} user={user}></LeftClient>


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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
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
                account = {true}
                fil={["Clients", "Products", "Orders"]}
              ></MyNavBar>
              <Row>
                <LeftEmployee showModal={showModal} setShowModal={setShowModal} fil={fil} setFil={setFil} setClock={setClock} clock={clock}></LeftEmployee>

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
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                showCart={false}
                account = {true}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftEmployee showModal={showModal} setShowModal={setShowModal} fil={fil} setFil={setFil} setClock={setClock} clock={clock}></LeftEmployee>

                <MyForm clock={clock} setClock={setClock} user={user} />

              </Row>
            </>
          }
        />
        <Route
          path="/wmanager/availableOrders"
          element={
            <>
              <MyNavBar
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
                account = {true}
                fil={["Deliveries", "Confirm Orders"]}
                setFil={setFil}
              ></MyNavBar>
              <Row>
                <LeftWManager fil={fil} setFil={setFil}></LeftWManager>
                <MyAvailableOrders clock={clock} setClock={setClock} user={user} role="VM" />

              </Row>
            </>
          }
        />
        <Route
          path="/client/availableOrders"
          element={
            <>
              <MyNavBar setFil={setFil} account = {true} setShowModal={setShowModal}
                user={user}
                setModify={setModify}
                modify={modify}
                orderId={orderId}
                clock={clock}
                setClock={setClock}
                cart={cart}
                setCart={setCart}
                account = {true}
                showCart={false}
                setUser={setUser}
              ></MyNavBar>
              <Row>
                <LeftClient fil={fil} setFil={setFil} user={user}></LeftClient>
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
