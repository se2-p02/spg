import React, { useState, useEffect } from "react";
import { Button, ListGroup, Alert, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import API from "./API";
import './MyNavBar.css';

function MyDeliveries(props) {
    const [goBack, setGoBack] = useState(false);
    const [deliveries, setDeliveries] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [handins] = useState(true);
    const [show, setShow] = useState(false);



    useEffect(() => {
        if (reqUpdate && props.user) {
            API.loadDeliveries()
                .then((d) => {
                    if (d.error === undefined) {

                        d.sort((a, b) => b.id - a.id);
                        setDeliveries(d);
                        setReqUpdate(false);
                    } else {
                        console.log(d.error)
                    }
                })
                .catch((err) => { console.log(err) });
        }
    }, [reqUpdate, props.user]);

    if (goBack) {
        return <Navigate to={"/" + props.user.role}></Navigate>;
    }

    return (
        <Col sm="9">
            <Container
                className={props.id ? "bg-white justify-content-center align-items-center text-center" : "bg-white min-height-100 justify-content-center align-items-center text-center below-nav"}
                fluid
            >
                {(props.clock && (!((props.clock.day() === 1 && props.clock.hour() >= 9) || (props.clock.day() === 2)))
                    &&
                    <Alert className="mt-1" variant="danger">{"You can add new deliveries from "}<b>Monday 9:00</b>{" to "}<b>Tuesday 23:59</b></Alert>)
                }

                {!handins && <Alert variant="danger">You can accept deliveries from Monday 9:00 to Tuesday 23:59.</Alert>}
                <ListGroup className="mt-3 mx-2" variant="flush">
                    <ListGroup.Item variant="warning">
                        <Row className="p-2 align-items-center">
                            <Col sm="2"><b>Delivery ID</b></Col>
                            <Col sm="3"><b>Product</b></Col>
                            <Col sm="3"><b>Farmer</b></Col>
                            <Col sm="2"><b>Quantity</b></Col>
                            <Col sm="2"><b>Order ID</b></Col>
                        </Row>
                    </ListGroup.Item>

                
                {deliveries && (
                    <>
                                                        {console.log(deliveries)}

                        {deliveries.map((c) => {
                            let b = "primary";

                            return (
                                <ListGroup.Item>
                                <Row className="align-items-center p-1">
                                    <Col sm="2">{c.id}</Col>
                                    <Col sm="3">{c.product.name}</Col>
                                    <Col sm="3">{c.farmer.name}</Col>
                                    <Col sm="2">{c.quantity+" "}</Col>
                                    <Col sm="2">{c.orderId}</Col>
                                </Row>
                                </ListGroup.Item>
                            );
                        })}
                    </>
                )}
                </ListGroup>
                <Row className=" mt-2">
                    <Col sm="4">
                    </Col>
                    <Col sm="4">
                        {(props.clock && ((props.clock.day() === 1 && props.clock.hour() >= 9) || (props.clock.day() === 2))) ?
                            <Button variant="success" size="lg" className="add_btn p-2 w-100 mt-3" data-testid="apbw" onClick={() => { setShow(true); }}> New Delivery</Button>
                            :
                            <Button variant="success" size="lg" data-testid="apbnw" className="radius_button p-2 w-100 mt-3" disabled>New Delivery</Button>
                        }
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <MyModal show={show} setReqUpdate={setReqUpdate} setShow={setShow} />

            </Container>
        </Col>
    );
}

function MyModal(props) {

    const [farmer, setFarmer] = useState("");
    const [product, setProduct] = useState();
    const [products, setProducts] = useState();

    useEffect(() => {
        if (props.show) {
            API.loadDeliverableProducts().then((o) => {
                if (o.error === undefined) {
                    setFarmer(Object.keys(o)[0]);
                    setProduct(o[Object.keys(o)[0]] && o[Object.keys(o)[0]][0]);
                    setProducts(o);
                } else {
                    console.log(o.error)
                }
            })
                .catch((err) => { console.log(err) });
        }
    }, [props.show]);

    const handleClose = () => {
        setProduct();
        setFarmer("");
        props.setShow(false);
    }

    const handleSubmit = () => {
        if (farmer === "" || product === undefined) {
            return;
        }
        API.createDelivery(product).then((r) => {
            if (r.error === undefined) {
                props.setReqUpdate(true);
            }
            handleClose();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Modal
            {...props}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title data-testid="modal">
                    Add delivery
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="">
                    <Row>
                        <Col>
                            <Form.Group controlId="farmerName">
                                <Form.Label className="text-info w-100 mt-2"><h5>Farmer</h5></Form.Label>
                                <Form.Select
                                    style={{
                                        backgroundColor: "unset",
                                        marginTop: "unset"
                                    }}
                                    className="w-100 p-3 mt-1"
                                    type="name"
                                    onChange={(ev) => {
                                        setFarmer(ev.target.value);
                                        if (products && products !== null && products[farmer] && products[farmer][0]) {
                                            setProduct(products[farmer][0]);
                                        }

                                    }}
                                    value={farmer ? farmer : ""}
                                >
                                    {
                                        products && Object.keys(products).map(f => {
                                            return (
                                                <option>{f}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="productName">
                                <Form.Label className="text-info w-100 mt-1"><h5>Product</h5></Form.Label>
                                <Form.Select
                                    style={{
                                        backgroundColor: "unset",
                                        marginTop: "unset"
                                    }}
                                    className="w-100 p-3 mt-2"
                                    type="name"
                                    onChange={(ev) => {
                                        if (products && products !== null && products[farmer]) {
                                            setProduct(products[farmer].filter((p) => ((p.orderId + p.name + p.farmer) === (ev.target[ev.target.selectedIndex].id)))[0]);
                                        }
                                    }}
                                    value={product ? product.name : ""}
                                >
                                    {
                                        products && farmer && products[farmer].map(p => {
                                            return (
                                                <option id={p.orderId + p.name + p.farmer}>{p.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="quantity">
                                <Form.Label className="text-info w-100 my-1"><h5>Quantity</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-3 mt-2"
                                    type="text"
                                    readOnly
                                    placeholder={product && product.quantity}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {!farmer && <p className="text-danger">No product available for delivery</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="success" data-testid="submit" onClick={() => { handleSubmit(); }}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default MyDeliveries;
