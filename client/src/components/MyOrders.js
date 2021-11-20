import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function MyOrders(props) {
  const [goBack, setGoBack] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);

  const updateHandler = (id) => {
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
    if (reqUpdate) {
      API.loadOrders(props.id)
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => b.id - a.id);
            setOrders(c);
            setReqUpdate(false);
          } else {
            console.log(c.error)
          }
        })
        .catch((err) => { console.log(err)});
    }
  }, [reqUpdate, props.id]);

  if (goBack) {
    return <Navigate to="/employee"></Navigate>;
  }

  return (
    <>
      <Container
        className={props.id ? "bg-dark justify-content-center align-items-center text-center" : "bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
        fluid
      >
        <ListGroup className="my-3 mx-5" horizontal>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-50 justify-content-center"
          >
            <b>id</b>
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-50 justify-content-center"
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
            <b>fulfilled</b>
          </ListGroup.Item>
        </ListGroup>
        {orders && (
          <>
            {orders.map((c) => {
              let j = JSON.parse(c.products)
              let list = Object.keys(j).map((key)=>[key, j[key]])
              return (
                <ListGroup
                  key={c.id}
                  style={{ textDecoration: "none" }}
                  className="my-2 mx-5"
                  horizontal
                >
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-50 justify-content-center"
                  >
                    {c.id}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-50 justify-content-center"
                  >
                    {c.userID}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                  <ul>{list.map((x)=>{return(<li>{x[0] + ":" + x[1]}</li>)})}</ul>
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.address}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.date}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.time}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-50 justify-content-center"
                  >
                    {c.amount}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-50 justify-content-center"
                  >
                    {c.conf}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-50 justify-content-center"
                  >
                    {c.fulfilled === 0 ? (
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
