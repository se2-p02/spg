import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function MyNotAvailableOrders(props) {
  const [goBack, setGoBack] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);
  const [availableProducts, setProducts] = useState([]);

  useEffect(() => {
    if (reqUpdate && props.user) {
      API.loadAvailableOrders("not_available")  
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => b.id - a.id);
            setOrders(c);
            setReqUpdate(false);
          } else {
            console.log(c.error)
          }
        })
        .catch((err) => { console.log(err) });
      
        API.loadDeliveries()
          .then((p) => {
            if (p.error === undefined) {
              setProducts(p);
            }
          })
          .catch((err) => console.log(err));
    }
  }, [reqUpdate, props.user]);

  if (goBack) {
    return <Navigate to={"/"+props.user.role}></Navigate>;
  }

  const handleConfirmation = (order) => {
      // API to call to set the order as available
      API.confirmOrderForPickUp(order)
        .then(setReqUpdate(true))
        .catch((err) => {console.log(err)})
  }

  const isConfirmable = (products) => {
    var flag = true;
    products.forEach(element => {
      flag &= availableProducts.map(it => it.product.id).includes(element.id); //1. the element must be available
      if (flag == true) {
        flag &= !(availableProducts.filter(elem => elem.product.id == element.id)[0].quantity < element.quantity)   //2. the quantity must be enough
      } 
    });
    return flag;
}

  return (
    <>
      <Container
        className={props.id ? "bg-dark justify-content-center align-items-center text-center" : "bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
        fluid
      >
        <br/>
        <h1 className="text-white">Confirm the orders that are ready to be picked up</h1>
        <ListGroup className="my-3 mx-5" horizontal>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Order ID</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>User ID</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Products</b>
          </ListGroup.Item>
          {/* <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Address</b>
          </ListGroup.Item> */ /* with a single warehouse we don't need this*/}
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Date</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Time</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Amount</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Confirm availablility</b>
          </ListGroup.Item>
        </ListGroup>
        {orders && (
          <>
            {orders.map((c) => {
              let j = JSON.parse(c.products)
              let b = "primary"
              return (
                <ListGroup
                  key={c.id}
                  style={{ textDecoration: "none" }}
                  className = "my-2 mx-5"
                  horizontal>
                
                    
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.id}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.userID}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    <ul>{j.map((x) => {return (<li>{x.name + ":" + x.quantity}</li>) })}</ul>
                  </ListGroup.Item>
                  {/*<ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {JSON.parse(c.address).address}
                  </ListGroup.Item>*/}
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.date}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.time}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.amount}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {(c.paid && isConfirmable(j))?  // check in the F_delivery table that the products are received
                        (<Button
                        onClick={() => handleConfirmation(c)}
                        className="btn-success"
                        >
                        Confirm
                        </Button>)
                        :
                        (<p>The order cannot be confirmed</p>)
                    }
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </>
        )}
        {!props.id && <Button
          size="lg"
          className="btn-danger p-2 w-50 mt-3 mb-5"
          onClick={() => setGoBack(true)}
        >
          Back
        </Button>
        }
      </Container>
    </>
  );
}

export default MyNotAvailableOrders;
