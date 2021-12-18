import React, { useState, useEffect } from "react";
import { Button, ListGroup, OverlayTrigger, Tooltip, Col, Row } from "react-bootstrap";
import { Handbag, CheckSquare } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import "./MyNavBar.css";
import API from "./API";

function MyFarmerOrders(props) {
    const [goBack, setGoBack] = useState(false);
    const [orders, setOrders] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [mydisabled, setDisabled] = useState([]);
    const [butDisable, setButDisable] = useState(false);

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
        } else {
            setButDisable(false);
        }
        if (reqUpdate && props.user) {
            const id = props.user.role === 'client' && props.user.id;
            API.loadOrders(id)
                .then((c) => {
                    console.log(c)
                    console.log(props.user.id)
                    if (c.error === undefined) {
                        c.sort((a, b) => b.id - a.id);
                        const disOrders = [];
                        for (let elem of c) {
                            let disable = 0;
                            for (let p of elem.products) {
                                if (props.user.id === p.farmer && p.status === 2)
                                    disable = 3;
                                else if (props.user.id === p.farmer && p.status === 1)
                                    disable = 2;
                                else if (props.user.id === p.farmer && p.status === 0)
                                    disable = 1;
                            }
                            disOrders.push(disable);
                        }
                        setOrders(c);
                        setDisabled(disOrders);
                        setReqUpdate(false);
                    } else {
                        console.log(c.error)
                    }
                })
                .catch((err) => { console.log(err) });
        }
    }, [reqUpdate, props.user, props.clock]);

    if (goBack) {
        return <Navigate to={"/" + props.user.role}></Navigate>;
    }
    return (
        <Col sm="9">
            <Container
                className={props.id ? "bg-white justify-content-center align-items-center text-center" : "bg-white min-height-100 justify-content-center align-items-center text-center below-nav"}
                fluid
            >
                <ListGroup className="my-3 mx-2" variant="flush">
                    <ListGroup.Item variant="warning" >
                        <Row className="p-2">
                            <Col sm="1"><b>User</b></Col>
                            <Col sm="2"><b>Products</b></Col>
                            <Col sm="4"><b>Address</b></Col>
                            <Col sm="2"><b>Date</b></Col>
                            <Col sm="1"><b>Time</b></Col>
                        </Row>
                    </ListGroup.Item>

                    {orders && (
                        <ListGroup.Item >

                            {
                                orders.map((c, i) => {
                                    let j = c.products
                                    j = j.filter(x => props.user.id === x.farmer)

                                    let b = "primary"
                                    //console.log(c.paid)
                                    if (c.paid === 0) {
                                        b = "danger"
                                    }
                                    return (
                                        mydisabled[i] !== 0 &&
                                        <>
                                            <Row className="p-2 align-items-center">
                                                <Col sm="1">{c.userID}</Col>
                                                <Col sm="2">{j.map((x) => { return (<p className="m-0 p-1">{x.name + ": " + x.quantity}</p>) })}</Col>
                                                <Col sm="4">{c.address.address}<br></br>
                                                    {c.address.deliveryOn}</Col>
                                                <Col sm="2">{c.date}</Col>
                                                <Col sm="1">{c.time}</Col>
                                                <Col sm="2">{mydisabled[i] === 1 &&
                                                    <OverlayTrigger
                                                        placement='bottom'
                                                        overlay={<Tooltip><strong>Confirm</strong> the order.</Tooltip>}
                                                    >
                                                        {
                                                            butDisable ?
                                                                <Button data-testid={"buttonGreen" + i} variant='success' disabled ><CheckSquare /></Button>
                                                                :
                                                                <Button data-testid={"buttonGreen" + i} variant='success' onClick={() => handleUpdate(c, 1)}><CheckSquare /></Button>
                                                        }
                                                    </OverlayTrigger>}
                                                    {mydisabled[i] === 2 &&
                                                        <OverlayTrigger
                                                            placement='bottom'
                                                            overlay={<Tooltip>Confirm <strong>preparation</strong> of the order.</Tooltip>}
                                                        >
                                                            {
                                                                butDisable ?
                                                                    <Button data-testid={"buttonYellow" + i} variant='warning' disabled ><Handbag /></Button>
                                                                    :
                                                                    <Button data-testid={"buttonYellow" + i} variant='warning' onClick={() => handleUpdate(c, 2)}><Handbag /></Button>
                                                            }
                                                        </OverlayTrigger>}
                                                    {mydisabled[i] === 3 && <h5>Confirmed</h5>}</Col>

                                            </Row>

                                        </>
                                    );
                                })
                            }
                        </ListGroup.Item>

                    )}
                </ListGroup>

            </Container>
        </Col >
    );
}

export default MyFarmerOrders;
