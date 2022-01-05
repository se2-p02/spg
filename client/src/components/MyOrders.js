import React, { useState, useEffect } from "react";
import { Button, Alert, Col, Row, Accordion, Badge } from "react-bootstrap";
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
            ? " justify-content-center align-items-center mt-3"
            : " min-height-100 justify-content-center align-items-center below-nav mt-3"
        } fluid>
        {!handouts && (
          <Alert variant="danger">
            You can hand out products from Wednesday 8:00 to Friday 19:00.
          </Alert>
        )}

        {orders.length !== 0 &&
          <Accordion>
            {orders.map((o, i) =>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>
                  <Row className="acc-header-row">
                    <h4><Col><Badge bg="success">Order #{o.id}</Badge></Col></h4>
                    <Col><h5><Badge bg="secondary">User #{o.userID}</Badge></h5></Col>
                    {o.paid ? <Col><h5><Badge pill className="mb-1 badge_paid">Paid</Badge></h5></Col>
                      : <Col><h5><Badge pill className="mb-1 badge_notpaid">Not paid</Badge></h5></Col>}
                    {o.products.every(pr => pr.status >= 1) && !o.paid
                      && <Col><h5><Badge pill bg="danger" className="mb-1">Pending Cancellation</Badge></h5></Col>}
                    {(o.products.every(pr => pr.status >= 1) && !(o.products.every(pr => pr.status >= 2)))
                      ? <Col><h5><Badge pill className="mb-1 badge_conf">Confirmed by Farmers</Badge></h5></Col>
                      : (o.products.every(pr => pr.status >= 2) && !o.products.every(pr => pr.status >= 3))
                      && <Col><h5><Badge pill className="mb-1 badge_confprep">In preparation</Badge></h5></Col>}
                    {o.products.some(pr => pr.status === 0) && !o.fulfilled
                      && <Col><h5><Badge pill bg="secondary" className="mb-1">Placed</Badge></h5></Col>}
                    {o.status === 'available' && !o.fulfilled
                      && <Col><h5><Badge pill bg="success" className="mb-1">Available for Pickup</Badge></h5></Col>}
                    {o.fulfilled === 1
                      && <Col><h5><Badge pill bg="success" className="mb-1">Fulfilled</Badge></h5></Col>}
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center mt-2">
                    <Col sm={3}><h5><Badge bg="secondary">Products</Badge></h5></Col>
                    <Col>{o.products.map(p => <h5 className="orders-text">· {p.name}: {p.quantity}</h5>)}</Col>
                  </Row>
                  <hr className="mb-4" />
                  <Row className="align-items-center mt-2">
                    <Col sm={3}><h5><Badge bg="secondary">Delivery</Badge></h5></Col>
                    <Col><h5 className="orders-text">{JSON.parse(o.address).address + " on " + JSON.parse(o.address).deliveryOn}</h5></Col>
                  </Row>
                  <hr className="mb-4" />
                  <Row className="align-items-center mt-2">
                    <Col sm={3}><h5><Badge bg="secondary">Amount</Badge></h5></Col>
                    <Col><h5 className="orders-text">{o.amount} €</h5></Col>
                  </Row>
                  <hr className="mb-4" />
                  {props.user.role === 'employee' &&
                    <Row className="align-items-center">
                      <Button disabled={o.fulfilled} onClick={() => updateHandler(o.id)} className="py-3 button_myorders radius_button_small">
                        HAND OUT
                      </Button>
                    </Row>}
                  <Row className="align-items-center justify-content-center mt-2">
                    {o.products.every(pr => pr.status >= 1) ?
                      <Button disabled variant="success" className="py-3 button_myorders radius_button_small">MODIFY</Button>
                      : <Link to="/client/products" className="btn btn-success py-3 button_myorders radius_button_small"
                        onClick={() => modifyHandler(o.id, o.products)}>
                        MODIFY
                      </Link>}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        }
      </Container>
    </Col>
  );
}

export default MyOrders;
