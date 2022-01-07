import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, ListGroup, Col, Row, Container } from "react-bootstrap";
import API from "./API";
import './MyNavBar.css';
import moment from 'moment';
var dayjs = require('dayjs')



function MyStatistics(props) {
  const [orders, setOrders] = useState([]);
  const [tot, setTot] = useState([]);
  const [test, setTest] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(true);

  useEffect(() => {
    if (reqUpdate && props.user) {
      const datetime = moment(props.clock).year()+"-"+moment(props.clock).month()+"-"+moment(props.clock).day();

      API.loadUnretrievedOrders(datetime)
        .then((c) => {
          if (c.error === undefined) {
            c.sort((a, b) => a.id - b.id);
            console.log(c)
            setOrders(c);
            // Here I have all the products of the orders
            /* let products_to_sum = c.map((x) => x.products)
            setTest(products_to_sum)
            products_to_sum.forEach((pts) => {
              pts.forEach((p) => {
                setTest(p)
                let find_prod = tot.find((prod) => JSON.parse(prod).name === JSON.parse(p).name);

                if (find_prod) {
                  find_prod.quantity += p.quantity;
                  setTot(tot.filter((prod) => prod.name !== p.name))
                  setTot([...tot, find_prod]);
                  //setTest([...test, "A"])
                }
                else {
                  setTot([...tot, p]);
                  //setTest([...test, "B"])
                }
              })

            }) */
            setReqUpdate(false);
          } else {
            console.log(c.error)
          }
        })
        .catch((err) => { console.log(err) });
    }
  }, [reqUpdate, props.user]);

  function month(o) {
    return moment(o.date).year() === moment(props.clock).year() && moment(o.date).month() === moment(props.clock).month()
  }
  
  function sameWeek(o) {
    const datetime = dayjs(props.clock);
    const dayOfTheWeek = datetime.day();
    let first;
    let second;
    if (dayOfTheWeek === 0) {
      // it's sunday
      second = datetime;
      first = datetime.add(-7, 'day');
    }
    else {
      first = datetime.add(-1*dayOfTheWeek);
      second = first.add(7, 'day')
    }
    return dayjs(o.date).isAfter(first) && dayjs(o.date).isBefore(second)
  }

  return (
    <>
      <Col sm="12" md="9">
        <Container className={props.id ? "justify-content-center align-items-center text-center" : "min-height-100 justify-content-center align-items-center text-center below-nav mt-3"} fluid>
          <Row>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item data-testid = ""> <b>Week</b> </ListGroup.Item>
                <ListGroup.Item variant="warning" data-testid = "">
                  <Row className="p-3">
                    <Col className="p-0 m-0" data-testid="order_week"><b>OrderID</b></Col>
                    <Col className="p-0 m-0" data-testid="product_week"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>

                {orders && (
                  <>
                    {orders.filter((o) => sameWeek(o)).map((c) => {
                      let j = JSON.parse(JSON.stringify(c.products))

                      return (
                        <>
                          <ListGroup.Item>
                            <Row className="align-items-center text-center p-1 m-0" data-testid = "">
                              <Col className="align-items-center" data-testid = "">{c.id}</Col>
                              <Col className="" data-testid = "">
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
{/*
                <ListGroup.Item>
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>Total</b></Col>
                    <Col className="p-0 m-0"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>
*/}
              </ListGroup>
            </Col>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item> <b>Month</b> </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  <Row className="p-3">
                    <Col className="p-0 m-0" data-testid="order_month"><b>OrderID</b></Col>
                    <Col className="p-0 m-0" data-testid="product_month"><b>Products</b></Col>
                  </Row>
                </ListGroup.Item>

                {orders && (
                  <>
                    {orders.filter((o) => month(o)).map((c) => {
                      let j = JSON.parse(JSON.stringify(c.products))

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

                {/*<ListGroup.Item>
                  <Row className="p-3">
                    <Col className="p-0 m-0"><b>Total</b></Col>
                    {tot && (
                      <>
                        {<Col className="">
                          {tot.map((t) => {
                            return JSON.parse(t).map((x) => {
                              let elem = <p className="m-0 p-0">{x.name + ": " + x.quantity}</p>
                              return (elem);
                            })
                          })}
                          <p className="m-0 p-0">{test}</p>
                        </Col>
                        }
                      </>
                    )
                    }
                  </Row>
                </ListGroup.Item>*/}

              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </>
  );
}

export default MyStatistics;
