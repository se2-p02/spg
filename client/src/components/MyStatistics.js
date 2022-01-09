import React, { useState, useEffect } from "react";
import { ListGroup, Col, Row, Container } from "react-bootstrap";
import API from "./API";
import './MyNavBar.css';
import moment from 'moment';
var dayjs = require('dayjs')



function MyStatistics(props) {
  const [orders, setOrders] = useState([]);

  const [reqUpdate, setReqUpdate] = useState(true);

  useEffect(() => {
    if (reqUpdate && props.user) {
      const datetime = moment(props.clock).year()+"-"+moment(props.clock).month()+"-"+moment(props.clock).day();

      API.loadUnretrievedOrders(datetime)
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
  }, [reqUpdate, props.user, props.clock]);

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
        <Container className={props.id ? "justify-content-center align-items-center text-center" : "min-height-100 justify-content-center align-items-center text-center below-nav mt-3"} fluid data-testid="container">
          <Row>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item > <b>Week</b> </ListGroup.Item>
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
                          <ListGroup.Item data-testid = "a">
                            <Row className="align-items-center text-center p-1 m-0" data-testid = "a">
                              <Col className="align-items-center" data-testid = "a">{c.id}</Col>
                              <Col className="" data-testid = "">
                                {j.map((x) => {
                                  let elem = <p className="m-0 p-0" data-testid="test waitfor">{x.name + ": " + x.quantity}</p>
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
              </ListGroup>
            </Col>
            <Col lg="6">
              <ListGroup className="my-2 mx-3 mt-3" variant="flush">
                <ListGroup.Item ><b>Month</b> </ListGroup.Item>
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
                              <Col className="align-items-center" data-testid="col id">{c.id}</Col>
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
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </>
  );
}

export default MyStatistics;
