import React, { useState, useEffect } from "react";
import { Button, Badge, Col, Row, Accordion, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./MyNavBar.css";
import API from "./API";

function MyFarmerOrders(props) {
    const [orders, setOrders] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [mydisabled, setDisabled] = useState([]);
    const [butDisable, setButDisable] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    const handleUpdate = async (order, newStatus) => {
        let doPayment = order.paid ? false : true;
        order.products.map((x) => {
            if (x.farmer === props.user.id) x.status = newStatus;
            if (x.status < 1) doPayment = false;
            return x;
        })
        API.confirmOrder({ ...order, products: JSON.stringify(order.products) })
            .then(() => {
                if (doPayment) API.payOrder(order).then((res) => {
                    if (res.error) alert('All the products were confirmed but the user had not enough money.');
                    else alert('All products were confirmed and the order was paid successfully.');
                    setReqUpdate(true);
                });
                setReqUpdate(true);
            })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        if (props.clock && !((props.clock.day() === 3 && props.clock.hour() >= 8) || props.clock.day() === 4 || (props.clock.day() === 5 && (props.clock.hour() >= 0 && props.clock.hour() <= 19)))) {
            setButDisable(true);
            setAlertShow(true);
        } else {
            setButDisable(false);
            setAlertShow(false);
        }
        if (reqUpdate && props.user) {
            const id = props.user.role === 'client' && props.user.id;
            API.loadOrders(id)
                .then((c) => {
                    
                    if (c.error === undefined) {
                        c.sort((a, b) => b.id - a.id);
                        const farmerOrders = c.filter(o => o.products.some(p => p.farmer === props.user.id));
                        const disOrders = [];
                        farmerOrders.forEach(fo => {
                            if (fo.products.some(pr => pr.farmer === props.user.id && pr.status === 3)) disOrders.push(4);
                            else if (fo.products.some(pr => pr.farmer === props.user.id && pr.status === 2)) disOrders.push(3);
                            else if (fo.products.some(pr => pr.farmer === props.user.id && pr.status === 1)) disOrders.push(2);
                            else if (fo.products.some(pr => pr.farmer === props.user.id && pr.status === 0)) disOrders.push(1);
                        });
                        setOrders(farmerOrders);
                        setDisabled(disOrders);
                        console.log(disOrders)
                        setReqUpdate(false);
                    } else {
                        console.log(c.error)
                    }
                })
                .catch((err) => { console.log(err) });
        }
    }, [reqUpdate, props.user, props.clock]);

    
    return (
        <Col sm="12" xs="12" md="9">
            <Container
                className={
                    props.full
                        ? " justify-content-center align-items-center mt-3"
                        : " min-height-100 justify-content-center align-items-center below-nav mt-3"
                } fluid>
                {alertShow && <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>You can confirm your products from Wednesday 8:00 to Friday 19:00.</Alert>}

                {orders &&
                    <Accordion>
                        {orders.map((o, i) =>
                            <Accordion.Item eventKey={i}>
                                <Accordion.Header>
                                    <Row className="acc-header-row">
                                        <h4><Col><Badge bg="success">Order #{o.id}</Badge></Col></h4>
                                        <Col><h5><Badge bg="secondary">User #{o.userID}</Badge></h5></Col>
                                        <Col>{o.paid ? <h5><Badge pill className="mb-1 badge_paid">Paid</Badge></h5>
                                            : <h5><Badge pill className="mb-1 badge_notpaid">Not paid</Badge></h5>}</Col>
                                        <Col>{o.products.every(pr => pr.status >= 1) && !o.paid
                                            && <h5><Badge pill bg="danger" className="mb-1">Pending Cancellation</Badge></h5>}
                                            {(o.products.filter(prod => prod.farmer === props.user.id).every(pr => pr.status >= 1) && o.paid && !(o.products.filter(prod => prod.farmer === props.user.id).every(pr => pr.status >= 2)))
                                                ? <h5><Badge pill className="mb-1 badge_conf">Confirmed by you</Badge></h5>
                                                : (o.products.filter(prod => prod.farmer === props.user.id).every(pr => pr.status >= 2) && o.paid && !o.fulfilled)
                                                && <h5><Badge pill className="mb-1 badge_confprep">Preparation confirmed</Badge></h5>}
                                            {o.products.filter(prod => prod.farmer === props.user.id).every(pr => pr.status === 0) && !o.fulfilled
                                                && <h5><Badge pill bg="secondary" className="mb-1">Placed</Badge></h5>}
                                            {o.fulfilled === 1
                                                && <h5><Badge pill bg="success" className="mb-1">Fulfilled</Badge></h5>}
                                        </Col>
                                    </Row>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row className="align-items-center mt-2">
                                        <Col sm={3}><h5><Badge bg="secondary">Products</Badge></h5></Col>
                                        <Col>{o.products.map(p => <h5 className="orders-text">· {p.name}: {p.quantity}</h5>)}</Col>
                                    </Row>
                                    <hr className="mb-4" />
                                    <Row className="align-items-center mt-2">
                                        <Col sm={3}><h5><Badge bg="secondary">Date and Time</Badge></h5></Col>
                                        <Col><h5 className="orders-text">{o.date + ' ' + o.time}</h5></Col>
                                    </Row>
                                    <hr className="mb-4" />
                                    <Row className="align-items-center mt-2">
                                        <Col sm={3}><h5><Badge bg="secondary">Delivery</Badge></h5></Col>
                                        <Col><h5 className="orders-text">{o.address.address + " on " + o.address.deliveryOn}</h5></Col>
                                    </Row>
                                    <hr className="mb-4" />
                                    <Row className="align-items-center mt-2">
                                        <Col sm={3}><h5><Badge bg="secondary">Amount</Badge></h5></Col>
                                        <Col><h5 className="orders-text">{o.amount} €</h5></Col>
                                    </Row>
                                    {mydisabled[i] === 1 ? <><hr className="mb-4" />
                                        <Row className="align-items-center">
                                            <Button data-testid={"buttonGreen" + i} onClick={() => handleUpdate(o, 1)} variant='success' disabled={butDisable} className="py-3 button_myorders radius_button_small">
                                                Confirm your products
                                            </Button>
                                        </Row></>
                                        : mydisabled[i] === 2 && <><hr className="mb-4" />
                                            <Row className="align-items-center">
                                                <Button data-testid={"buttonYellow" + i} onClick={() => handleUpdate(o, 2)} variant='warning' disabled={butDisable} className="py-3 button_myorders radius_button_small">
                                                    Confirm preparation of your products
                                                </Button>
                                            </Row></>}
                                </Accordion.Body>
                            </Accordion.Item>)}
                    </Accordion>
                }
            </Container>
        </Col >
    );
}

export default MyFarmerOrders;
