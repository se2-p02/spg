import React, { useState, useEffect } from "react";
import { Button, ListGroup, Col, Row } from "react-bootstrap";
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
            c.sort((a, b) => a.id - b.id);
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
    return <Navigate to={"/" + props.user.role}></Navigate>;
  }

  const handleConfirmation = (order) => {
    // API to call to set the order as available
    API.confirmOrderForPickUp(order)
      .then(setReqUpdate(true))
      .catch((err) => { console.log(err) })
  }

  const isConfirmable = (products) => {
    var flag = true;
    products.forEach(element => {
      flag &= availableProducts.map(it => it.product.id).includes(element.id); //1. the element must be available
      if (flag === true) {
        flag &= availableProducts.filter(elem => elem.product.id === element.id)[0].quantity >= element.quantity   //2. the quantity must be enough
      }
    });
    return flag;
  }

  return (
    <Col sm="9">
      <Container
        className={props.id ? "bg-white justify-content-center align-items-center text-center" : "bg-white min-height-100 justify-content-center align-items-center text-center below-nav"}
        fluid
      >
        <ListGroup className="my-3 mx-2" variant="flush">
          <ListGroup.Item variant="warning">
            <Row className="p-3 align-items-center">
              <Col sm="1"><b>Order</b></Col>
              <Col sm="1"><b>User</b></Col>
              <Col sm="2"><b>Products</b></Col>
              <Col sm="2"><b>Date</b></Col>
              <Col sm="2"><b>Time</b></Col>
              <Col sm="2"><b>Amount</b></Col>
              <Col sm="2"><b>Confirm</b></Col>
            </Row>
          </ListGroup.Item>

          {orders && (
            <>
              {orders.map((c) => {
                let j = JSON.parse(c.products)
                let b = "primary"
                return (
                  <ListGroup.Item>
                    <Row className="p-2 align-items-center">
                      <Col sm="1">{c.id}</Col>
                      <Col sm="1">{c.userID}</Col>
                      <Col sm="2">{j.map((x) => { return (<p className="p-1 m-0">{x.name + ":" + x.quantity}</p>) })}</Col>
                      <Col sm="2">{c.date}</Col>
                      <Col sm="2">{c.time}</Col>
                      <Col sm="2">{c.amount+" €"}</Col>
                      <Col sm="2">{(c.paid && isConfirmable(j)) ?  // check in the F_delivery table that the products are received
                        (<Button
                          onClick={() => handleConfirmation(c)}
                          className="btn-success radius_button_small"
                        >
                          Confirm
                        </Button>)
                        :
                        (<Button
                          onClick={() => handleConfirmation(c)}
                          className="btn-success radius_button_small" disabled
                        >
                          Confirm
                        </Button>)
                      }</Col>


                    </Row>
                  </ListGroup.Item>
                );
              })}
            </>
          )}
        </ListGroup>

        
      </Container>
    </Col>
  );
}

export default MyNotAvailableOrders;
