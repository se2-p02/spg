import React, { useState, useEffect } from "react";
import { Button, ListGroup, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function MyAvailableOrders(props) {
  const [goBack, setGoBack] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);

  useEffect(() => {
    if (reqUpdate && props.user) {
      API.loadAvailableOrders("available")
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
    }
  }, [reqUpdate, props.user]);

  if (goBack) {
    return <Navigate to={"/" + props.user.role}></Navigate>;
  }

  return (
    <Col sm="9">
      <Container
        className={props.id ? "justify-content-center align-items-center text-center" : " min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
        fluid
      >
        
        <ListGroup
          className="my-2 mx-5"
          variant="flush">

          <ListGroup.Item className=" p-3" variant="warning">
            <Row className="align-items-center">
              <Col sm="4"><b>Order ID</b></Col>
              <Col sm="4"><b>Products</b></Col>
              <Col sm="4"><b>Amount</b></Col>
            </Row>
          </ListGroup.Item>
          {orders && (
            <>
              {orders.filter((elem) => { if (props.role === "client") { return elem.userID === props.user.id } else return true }).map((c) => {
                let j = JSON.parse(c.products)
                let b = "primary"

                return (
                  <ListGroup.Item>
                    <Row className="align-items-center p-2">
                      <Col sm="4" className="d-flex justify-content-center align-items-center">{c.id}</Col>
                      <Col sm="4" className="d-flex justify-content-center align-items-center">{j.map((x) => {return(x.name + ": " + x.quantity+" "+x.unit)} )}</Col>
                      <Col sm="4" className="d-flex justify-content-center align-items-center">{c.amount + " €"}</Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </>
          )}</ListGroup>
        
        
      </Container>
    </Col>
  );
}

export default MyAvailableOrders;
