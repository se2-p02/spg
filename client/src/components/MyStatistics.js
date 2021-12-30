import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, ListGroup, Col, Row, Container } from "react-bootstrap";
import API from "./API";
import './MyNavBar.css';




function MyStatistics(props) {
  const [goBack, setGoBack] = useState(false)
  const [orders, setOrders] = useState([]);
  const [tot, setTot] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);

  useEffect(() => {
    if (reqUpdate && props.user) {
      //API to collect the orders
      //just for testing purposes this API is used
      API.loadAvailableOrders("available")
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => a.id - b.id);
            setOrders(c);
            let products_to_sum = [...c.products]
            products_to_sum.forEach((p) => {
              let find_prod = tot.find((prod) => prod.name = p.name);
              if (find_prod) {
                find_prod.quantity += p.quantity;
                setTot(tot.filter((prod) => prod.name = p.name))
                setTot([...tot, find_prod]);
              }
            })
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
    <>
      <Col sm="12" md="9">
        <Container className={props.id ? "justify-content-center align-items-center text-center" : "min-height-100 justify-content-center align-items-center text-center below-nav mt-3"} fluid>
          <Row>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item> <b>Week</b> </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>OrderID</b></Col>
                    <Col className="p-0 m-0"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>

                {orders && (
                  <>
                    {orders.map((c) => {
                      let j = JSON.parse(c.products)

                      return (
                        <>
                          <ListGroup.Item>
                            <Row className="align-items-center text-center p-1 m-0">
                              <Col className="align-items-center">{c.id}</Col>
                              <Col className="">
                                {j.map((x) => {
                                  let elem = <p className="m-0 p-0">{x.name + ": " + x.quantity}</p>
                                  return (elem);
                                })}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </>)

                    })
                    }
                  </>
                )
                }

                <ListGroup.Item>
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>Total</b></Col>
                    <Col className="p-0 m-0"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>

              </ListGroup>
            </Col>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item> <b>Month</b> </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>OrderID</b></Col>
                    <Col className="p-0 m-0"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>

                {orders && (
                  <>
                    {orders.map((c) => {
                      let j = JSON.parse(c.products)

                      return (
                        <>
                          <ListGroup.Item>
                            <Row className="align-items-center text-center p-1 m-0">
                              <Col className="align-items-center">{c.id}</Col>
                              <Col className="">
                                {j.map((x) => {
                                  let elem = <p className="m-0 p-0">{x.name + ": " + x.quantity}</p>
                                  return (elem);
                                })}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </>)

                    })
                    }
                  </>
                )
                }

                <ListGroup.Item>
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>Total</b></Col>
                    {tot !== [] && (
                      <>
                        {<Col className="">
                          {tot.map((x) => {
                            let elem = <p className="m-0 p-0">{x.name + ": " + x.quantity}</p>
                            return (elem);
                          })}
                        </Col>

                        }
                      </>
                    )
                    }
                    {tot === [] && (
                      <>
                        {<Col className="">
                          <p>AAAAAAAAAAAA</p>
                        </Col>

                        }
                      </>
                    )
                    }
                  </Row>
                </ListGroup.Item>

              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </>
  );
}

export default MyStatistics;
