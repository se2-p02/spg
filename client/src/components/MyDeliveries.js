import React, { useState, useEffect } from "react";
import { Button, ListGroup, Alert, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import API from "./API";

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
        <>
            <Container
                className={props.id ? "bg-dark justify-content-center align-items-center text-center" : "bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3"}
                fluid
            >
                {(props.clock && (!((props.clock.day() === 1 && props.clock.hour() >= 9) || (props.clock.day() === 2)))
                    &&
                    <Alert className="mt-3" variant="danger">You can add new deliveries from Monday 9:00 to Tuesday 23:59.</Alert>)
                }
                <Row className=" mt-2">
                    <Col>
                        <Button size="lg" className="btn-danger p-2 w-100 mt-3" onClick={() => setGoBack(true)}>Back</Button>
                    </Col>
                    <Col>
                        {(props.clock && ((props.clock.day() === 1 && props.clock.hour() >= 9) || (props.clock.day() === 2))) ?
                            <Button size="lg" className="btn-info p-2 w-100 mt-3" data-testid="apbw" onClick={() => { setShow(true); }}>Add new delivery</Button>
                            :
                            <Button size="lg" data-testId="apbnw" className="btn-light p-2 w-100 mt-3">Add new delivery</Button>
                        }
                    </Col>
                </Row>
                {!handins && <Alert variant="danger">You can accept deliveries from Monday 9:00 to Tuesday 23:59.</Alert>}
                <Row className="mx-5">
                    <ListGroup className="my-3" horizontal>
                        <ListGroup.Item as={Col} sm={1}
                            variant="warning"
                            className="d-flex justify-content-center"
                        >
                            <b>Delivery id</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={1}
                            variant="warning"
                            className="d-flex justify-content-center"
                        >
                            <b>Product id</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={2}
                            variant="warning"
                            className="d-flex  justify-content-center"
                        >
                            <b>Product name</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={2}
                            variant="warning"
                            className="d-flex  justify-content-center"
                        >
                            <b>Farmer id</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={2}
                            variant="warning"
                            className="d-flex  justify-content-center"
                        >
                            <b>Farmer name</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={2}
                            variant="warning"
                            className="d-flex  justify-content-center"
                        >
                            <b>Quantity</b>
                        </ListGroup.Item>
                        <ListGroup.Item as={Col} sm={2}
                            variant="warning"
                            className="d-flex  justify-content-center"
                        >
                            <b>Order id</b>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
                {deliveries && (
                    <>
                        {deliveries.map((c) => {
                            let b = "primary";

                            return (
                                <Row className="mx-5">
                                    <ListGroup
                                        key={c.id}
                                        style={{ textDecoration: "none" }}
                                        className="my-2"
                                        horizontal>


                                        <ListGroup.Item as={Col} sm={1}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.id}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={1}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.product.id}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={2}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.product.name}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={2}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.farmer.id}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={2}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.farmer.name}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={2}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.quantity}
                                        </ListGroup.Item>
                                        <ListGroup.Item as={Col} sm={2}
                                            variant={b}
                                            className="d-flex  justify-content-center"
                                        >
                                            {c.orderId}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Row>
                            );
                        })}
                    </>
                )}
                <MyModal show={show} setReqUpdate={setReqUpdate} setShow={setShow} />

            </Container>
        </>
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
                <Modal.Title>
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
                                        setProduct(products[farmer][0]);
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
                                        setProduct(products[farmer].filter((p) => ((p.orderId + p.name + p.farmer) === (ev.target[ev.target.selectedIndex].id)))[0]);
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
