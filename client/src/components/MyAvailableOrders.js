import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
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
    return <Navigate to={"/"+props.user.role}></Navigate>;
  }

  return (
    <>
      <Container
        className={props.id ? "bg-dark justify-content-center align-items-center text-center" : "bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
        fluid
      >
        <br/>
        <h1 className="text-white">Orders ready to be picked up</h1>
        <ListGroup className="my-3 mx-5" horizontal>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Order ID</b>
          </ListGroup.Item>
          {!(props.role === "client") &&    // the userID is not shown if we are the user
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>User ID</b>
          </ListGroup.Item>}
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Products</b>
          </ListGroup.Item>
          {/*<ListGroup.Item
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
          </ListGroup.Item>*/}
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            <b>Amount</b>
          </ListGroup.Item>
        </ListGroup>
        {orders && (
          <>
            {orders.filter((elem) => {if (props.role === "client") {return elem.userID === props.user.id} else return true}).map((c) => {
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
                  {!(props.role === "client") &&
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.userID}
                  </ListGroup.Item>
                  }
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    <ul>{j.map((x) => {return (<li>{x.name + ":" + x.quantity}</li>) })}</ul>
                  </ListGroup.Item>
                  {/*}
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
                */}
                  <ListGroup.Item
                    variant={b}
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.amount}
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

export default MyAvailableOrders;
