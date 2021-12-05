import React, { useState, useEffect } from "react";
import { Button, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
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

    const handleUpdate = async (order, newStatus) => {
        let doPayment = order.paid ? false : true;
        order.products.map((x) => {
            if (x.farmer === props.user.id) x.status = newStatus;
            if(x.status < 1) doPayment = false;
            return x;
        })
        API.confirmOrder({ ...order, products: JSON.stringify(order.products) })
            .then(() => {
                if(doPayment) API.payOrder(order).then((res) => {
                    if(res.error) alert('All the products were confirmed but the user had not enough money.');
                    else alert('All products were confirmed and the order was paid successfully.');
                    setReqUpdate(true);
                });
                setReqUpdate(true);
            })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        if (reqUpdate && props.user) {
            const id = props.user.role === 'client' && props.user.id;
            API.loadOrders(id)
                .then((c) => {
                    if (c.error === undefined) {
                        c.sort((a, b) => b.id - a.id);
                        const disOrders = [];
                        for (let elem of c) {
                            elem.products = JSON.parse(elem.products);
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
    }, [reqUpdate, props.user]);

    if (goBack) {
        return <Navigate to={"/" + props.user.role}></Navigate>;
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
                        <b>userID</b>
                    </ListGroup.Item>
                    <ListGroup.Item
                        variant="warning"
                        className="d-flex w-50 justify-content-center"
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
                        className="d-flex w-50 justify-content-center"
                    >
                        <b>date</b>
                    </ListGroup.Item>
                    <ListGroup.Item
                        variant="warning"
                        className="d-flex w-50 justify-content-center"
                    >
                        <b>time</b>
                    </ListGroup.Item>
                    <ListGroup.Item
                        variant="warning"
                        className="d-flex w-50 justify-content-center"
                    >
                        <b>confirm</b>
                    </ListGroup.Item>


                </ListGroup>
                {orders && (
                    <>
                        {orders.map((c, i) => {
                            let j = c.products
                            j = j.filter(x => props.user.id === x.farmer)

                            let b = "primary"
                            //console.log(c.paid)
                            if (c.paid === 0) {
                                b = "danger"
                            }

                            return (
                                mydisabled[i] !== 0 && <ListGroup
                                    key={c.id}
                                    style={{ textDecoration: "none" }}
                                    className="my-2 mx-5"
                                    horizontal>

                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-50 align-items-center justify-content-center"
                                    >
                                        {c.userID}
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-50 align-items-center justify-content-center"
                                    >
                                        <ul>{j.map((x) => { return (<li>{x.name + ": " + x.quantity}</li>) })}</ul>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-100 align-items-center justify-content-center"
                                    >
                                        <b>Address:</b>&nbsp;{c.address.address}&emsp;
                                        <b>Date of Delivery:</b>&ensp;{c.address.deliveryOn}
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-50 align-items-center justify-content-center"
                                    >
                                        {c.date}
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-50 align-items-center justify-content-center"
                                    >
                                        {c.time}
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        variant={b}
                                        className="d-flex w-50 align-items-center justify-content-center"
                                    >
                                        {mydisabled[i] === 1 &&
                                            <OverlayTrigger
                                                placement='bottom'
                                                overlay={<Tooltip><strong>Confirm</strong> the order.</Tooltip>}
                                            >
                                                <Button variant='success' onClick={() => handleUpdate(c, 1)}><CheckSquare /></Button>
                                            </OverlayTrigger>}
                                        {mydisabled[i] === 2 &&
                                            <OverlayTrigger
                                                placement='bottom'
                                                overlay={<Tooltip>Confirm <strong>preparation</strong> of the order.</Tooltip>}
                                            >
                                                <Button variant='warning' onClick={() => handleUpdate(c, 2)}><Handbag /></Button>
                                            </OverlayTrigger>}
                                        {mydisabled[i] === 3 && <h5>Confirmed</h5>}
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

export default MyFarmerOrders;
