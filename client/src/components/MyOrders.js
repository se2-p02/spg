import React, { useState, useEffect } from "react";
import { Button, ListGroup, Alert, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";
import moment from "moment";

function MyOrders(props) {
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);
  const [handouts, setHandouts] = useState(true);

  const updateHandler = async (id) => {
    const response = await API.getClock();
    const datetime = moment(response.serverTime);
    const permitted =
      (datetime.day() === 3 && datetime.hour() >= 8) ||
      datetime.day() === 4 ||
      (datetime.day() === 5 && datetime.hour() >= 0 && datetime.hour() <= 19);
    setHandouts(() => permitted);
    if (permitted)
      API.updateOrder(id)
        .then((c) => {
          if (c.error === undefined) {
            setReqUpdate(true);
          } else {
            console.log(c.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    if (reqUpdate && props.user) {
      const id = props.user.role === "client" && props.user.id;
      API.loadOrders(id)
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => b.id - a.id);
            console.log(c);
            c.map((x) => {
              x.address = JSON.stringify(x.address);
              return x;
            });
            setOrders(c);
            setReqUpdate(false);
          } else {
            console.log(c.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reqUpdate, props.user]);

  //handle the modify button
  const modifyHandler = (id, products) => {
    const newProducts = products;
    console.log(newProducts);
    props.setOrderId(id);
    props.setCart(newProducts);
    props.setModify(true);
  };


  return (
    <Col sm="12" md="9">
      <Container
        className={
          props.full
            ? " justify-content-center align-items-center text-center mt-3"
            : " min-height-100 justify-content-center align-items-center text-center below-nav mt-3"
        } fluid>
        {!handouts && (
          <Alert variant="danger">
            You can hand out products from Wednesday 8:00 to Friday 19:00.
          </Alert>
        )}
        <ListGroup className="my-2 mx-3" variant="flush">
          <ListGroup.Item variant="warning">
            <Row className="p-3">
              <Col sm="1" xs="1" className="p-0 m-0"><b>Order</b></Col>
              <Col sm="1" xs="0" className="p-0 m-0 d-none d-xl-block d-lg-block d-md-block"><b>User</b></Col>
              <Col sm="3" md="2" xs="3" ><b>Products</b></Col>
              <Col sm="2" xs="2"><b>Delivery</b></Col>
              <Col sm="2" xs="2"><b>Amount</b></Col>
              <Col sm="2" xs="2"><b>Fulfilled</b></Col>
              <Col sm="2" xs="1"><b>Modify</b></Col>
            </Row>
          </ListGroup.Item>

          {orders && (
            <>
              {orders.map((c) => {
                let b = "primary";
                //console.log(c.paid)
                if (c.paid === 0) {
                  b = "danger";
                }

                return (
                  <>
                    <ListGroup.Item>
                      <Row className="align-items-center text-center p-1 m-0">
                        <Col sm="1" xs="1" className="align-items-center">{c.id}</Col>
                        <Col sm="1" xs="1" className="d-none d-xl-block d-lg-block d-md-block">{c.userID}</Col>
                        <Col md="2" sm="3"  xs="3" className="">
                          {c.products.map((x) => {
                            let elem = <p className="m-0 p-0">{x.name + ": " + x.quantity}</p>
                            return (elem);
                          })}
                        </Col>
                        <Col sm="2" xs="2" className="d-xs-block d-sm-block d-xl-none d-lg-none d-md-none">{JSON.parse(c.address).address}
                        </Col>                        
                        <Col sm="2" xs="2" className="d-none d-xl-block d-lg-block d-md-block">{JSON.parse(c.address).address + " on " + JSON.parse(c.address).deliveryOn}
                        </Col>
                        <Col sm="2" xs="2">{c.amount + " €"}</Col>
                        <Col sm="2" xs="2">{props.user.role === "client" ? (
                          c.paid === 0 ? (
                            <Button
                              onClick={() => alert("Fake button")}
                              className="btn_hand radius_button_small"
                            >
                              PAY
                            </Button>
                          ) : (
                            <h6 className="m-0 p-0">PAID</h6>
                          )
                        ) : props.user.role === "employee" && c.fulfilled === 0 ? (
                          <Button
                            onClick={() => {
                              updateHandler(c.id);
                            }}
                            className="btn_hand p-1 px-2 m-0 radius_button_small"
                          >
                            HAND OUT
                          </Button>
                        ) : (
                          <h6 className="p-0 m-0">DELIVERED</h6>
                        )}</Col>
                        <Col sm="2" xs="1">{c.conf || c.paid ?
                          <>
                            <Link to="/client/products">
                              <Button
                                className="px-1 py-3 m-0 radius_button_small"
                                variant="success"
                                onClick={() => {
                                  modifyHandler(c.id, c.products);
                                }}
                              >
                                MODIFY
                              </Button>
                            </Link>

                          </>:<></>
                        }</Col>
                      </Row></ListGroup.Item>
                  </>)

              })
              }
            </>
          )
          }


        </ListGroup>
      </Container>
    </Col>
  );
}

export default MyOrders;
