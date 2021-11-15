import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function Orders(props) {
  const [goBack, setGoBack] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);

  const updateHandler = (id) => {
    API.updateOrder(id)
      .then((c) => {
        if (c.error === undefined) {
          setReqUpdate(true);
          //console.log(c);
        } else {
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    if (reqUpdate) {
      API.loadOrders(props.id)
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => b.id - a.id);
            setOrders(c);
            setReqUpdate(false);
            //console.log(c);
          } else {
          }
        })
        .catch((err) => { });
    }
  }, [reqUpdate]);

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
            className="d-flex w-100 justify-content-center"
          >
            id
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            userID
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            products
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            address
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            date
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            time
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            amount
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            confPreparation
          </ListGroup.Item>
          <ListGroup.Item
            variant="warning"
            className="d-flex w-100 justify-content-center"
          >
            fulfilled
          </ListGroup.Item>
        </ListGroup>
        {orders && (
          <>
            {orders.map((c) => {
              return (
                <ListGroup
                  key={c.id}
                  style={{ textDecoration: "none" }}
                  className="my-2 mx-5"
                  horizontal
                >
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.id}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.userID}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.products}
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
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.amount}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
                  >
                    {c.conf}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="d-flex w-100 justify-content-center"
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
          className="btn-danger p-2 w-50 mt-3"
          onClick={() => setGoBack(true)}
        >
          Back
        </Button>
        }
      </Container>
    </>
  );
}

export default Orders;
