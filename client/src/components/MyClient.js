import { useState, useEffect } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function MyClient(props) {
  const [goBack, setGoBack] = useState(false);
  const [client, setClient] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);
  const id = new URLSearchParams(window.location.search);
  const userId = parseInt(id)
    console.log("The user id is :"+userId);

  useEffect(() => {
    if (reqUpdate) {
      API.loadClient(userId)
        .then((c) => {
          if (c.error === undefined) {
            setClient(c);
            setReqUpdate(false);
            console.log(c);
          } else {
          }
        })
        .catch((err) => {});
    }
  }, [reqUpdate]);

  if (goBack) {
    return <Navigate to="/employee"></Navigate>;
  }

  return (
    <>
      <Container
        className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"
        fluid
      >
        <Button
          size="lg"
          className="btn-danger p-2 w-25"
          onClick={() => setGoBack(true)}
        >
          Back
        </Button>
        <ListGroup className="my-3 mx-5" horizontal>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Id
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Name
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Surname
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Wallet
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Basket
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            Email
          </ListGroup.Item>
        </ListGroup>

        <ListGroup
          
          style={{ textDecoration: "none" }}
          className="my-2 mx-5"
          horizontal
        >
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.id}
            
          </ListGroup.Item>
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.name}
            
          </ListGroup.Item>
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.surname}
          </ListGroup.Item>
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.wallet}
          </ListGroup.Item>
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.basket}
          </ListGroup.Item>
          <ListGroup.Item
            variant="primary"
            className="d-flex w-100 justify-content-center"
          >
            {client.email}
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  );
}

export default MyClient;
