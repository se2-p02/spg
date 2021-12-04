import React, { useState, useEffect } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";
import moment from "moment";

function MyOrders(props) {
  const [goBack, setGoBack] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);
  const [handouts, setHandouts] = useState(true);

  const updateHandler = async (id) => {
    const response = await API.getClock();
    const datetime = moment(response.serverTime);
    const permitted = (datetime.day() === 3 && datetime.hour() >= 8) || datetime.day() === 4 || (datetime.day() === 5 && (datetime.hour() >= 0 && datetime.hour() <= 19));
    setHandouts(() => permitted);
    if (permitted)
      API.updateOrder(id)
        .then((c) => {
          if (c.error === undefined) {
            setReqUpdate(true);
          } else {
            console.log(c.error)
          }
        })
        .catch((err) => { console.log(err) });
  };

  useEffect(() => {
    if (reqUpdate && props.user) {
      const id = props.user.role === 'client' && props.user.id;
      API.loadOrders(id)
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
    }
  }, [reqUpdate, props.user]);

  if (goBack) {
    return <Navigate to={"/"+props.user.role}></Navigate>;
  }

  return (
    <>
      <Container
        className={props.id ? "bg-dark justify-content-center align-items-center text-center" : "bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
        fluid
      >
        {!handouts && <Alert variant="danger">You can hand out products from Wednesday 8:00 to Friday 19:00.</Alert>}
        <ListGroup className="my-3 mx-5" horizontal>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>id</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>userID</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>products</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>address</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>date</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>time</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>amount</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>confPreparation</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>{props.user && props.user.role === 'employee' ? 'fulfilled' : 'paid'}</b>
          </ListGroup.Item>
        </ListGroup>
        {orders && (
          <>
            {orders.map((c) => {
              let j = JSON.parse(c.products)
              let b = "primary"
              //console.log(c.paid)
              if (c.paid===0){
                  b = "danger"
              }

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
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.address}
                  </ListGroup.Item>
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
                    {c.conf}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {props.user.role === 'client' ?
                    c.paid === 0 ? (
                      <Button
                        onClick={() => alert('Fake button')}
                        className="btn-success"
                      >
                        Pay
                      </Button>
                    ) : (
                      <p>Paid</p>
                    )
                    : props.user.role === 'employee' &&
                    c.fulfilled === 0 ? (
                      <Button
                        onClick={() => {
                          updateHandler(c.id);
                        }}
                        className="btn-success"
                      >
                        hand out to customer
                      </Button>
                    ) : (
                      <p>delivered</p>
                    )}
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

export default MyOrders;
