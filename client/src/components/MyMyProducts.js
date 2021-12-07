import React, { useState, useEffect } from "react";
import { Button, ListGroup, Container, Row, Col, Alert } from "react-bootstrap";
import { PencilSquare, CheckSquare } from "react-bootstrap-icons";
import { Link, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './MyNavBar.css';
import API from "./API";


function MyMyProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [modal, setModal] = useState();
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [product, setProduct] = useState();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    useEffect(() => {
        if (props.clock && props.user && (reqUpdate || props.cart)) {
            if (props.clock.day() < 5 && props.clock.day() > 0) {
                API.loadNextProducts(props.user.role, 'current').then((p) => {
                    if (p.error === undefined) {
                        p.forEach((prod) => {
                            let find = props.cart.find((c) => c.id === prod.id)
                            if (props.cart.find((c) => c.id === prod.id)) {
                                prod.quantity = prod.quantity - find.quantity;
                            }
                        });
                        setProducts(p.filter((prod) => prod.quantity !== 0));
                        setReqUpdate(false);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
            else {
                API.loadNextProducts(props.user.role).then((p) => {
                    if (p.error === undefined) {
                        p.forEach((prod) => {
                            let find = props.cart.find((c) => c.id === prod.id)
                            if (props.cart.find((c) => c.id === prod.id)) {
                                prod.quantity = prod.quantity - find.quantity;
                            }
                        });
                        setProducts(p.filter((prod) => prod.quantity !== 0));
                        setReqUpdate(false);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }, [reqUpdate, props.cart, props.user, props.clock]);

    if (goBack) {
        return (<Navigate to={"/" + props.user.role}></Navigate>)
    }

    const handleModify = (id) => {
        setProduct(products.find((prod) => prod.id === id));
        handleShow();
    }

    const handleConfirm = async (id) => {
        API.updateProduct({ id: id }, { confirm: true }).then((r) => {
            if (r.error === undefined) {
                setReqUpdate(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>
                {(props.clock && (!((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9)) && !(props.clock.day() === 1 && props.clock.hour() < 9))
                    &&
                    <Alert className="mt-3" variant="danger">You can add new products from Friday to Saturday 9:00 and confirm products on Monday by 9:00.</Alert>)
                }
                <Row className=" mt-2">
                    <Col>
                        <Button size="lg" className="btn-danger p-2 w-100 mt-3" onClick={() => setGoBack(true)}>Back</Button>
                    </Col>
                    <Col>
                        {(props.clock && ((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9))) ?
                            <Button size="lg" className="btn-info p-2 w-100 mt-3" data-testid="apbw" onClick={() => { setModal('add'); handleShow(); }}>Add new product</Button>
                            :
                            <Button size="lg" data-testId="apbnw" className="btn-light p-2 w-100 mt-3">Add new product</Button>
                        }
                    </Col>
                </Row>
                <ListGroup className="my-3 mx-5 pt-3" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Id</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Name</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Quantity</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Farmer</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Price</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Modify</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Confirm</b></ListGroup.Item>
                </ListGroup>
                {products &&
                    <>
                        {
                            products.map(p => {
                                return (
                                    <ListGroup key={p.id} className="my-2 mx-5" horizontal>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{p.id}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{p.name}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{p.quantity + " " + p.unit}</ListGroup.Item>
                                        <ListGroup.Item as={Link} to={"/employee/farmers/" + p.farmer} style={{ textDecoration: 'none' }} variant="primary" className="d-flex w-100 justify-content-center">{p.farmerName}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{p.price + " €"}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">
                                            {p.confirmed === 0 && (props.clock && ((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9))) ?
                                                <Button variant="warning" onClick={() => { setModal('modify'); handleModify(p.id); }}><PencilSquare /></Button>
                                                :
                                                <Button variant="light" ><PencilSquare /></Button>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">
                                            {p.confirmed === 0 && (
                                                (props.clock && ((props.clock.day() === 1 && props.clock.hour() < 9))) ?
                                                    <Button variant="success" onClick={() => handleConfirm(p.id)}><CheckSquare /></Button>
                                                    :
                                                    <Button variant="light" ><CheckSquare /></Button>
                                            )
                                            }
                                            {p.confirmed !== 0 &&
                                                <p>Confirmed</p>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }


                <MyModal show={show} setReqUpdate={setReqUpdate} setShow={setShow} product={product} modal={modal} setProduct={setProduct} />
            </Container>

        </>
    );
}

function MyModal(props) {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [unit, setUnit] = useState("kg");
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState("All-purpose");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.modal === 'modify') {
            setName(props.product && props.product.name);
            setQuantity(props.product && props.product.quantity);
            setPrice(props.product && props.product.price);
            setUnit(props.product && props.product.unit);
            setCategory(props.product && props.product.filter);
        }
    }, [props.modal, props.product, props.show]);

    useEffect(() => {
        setMessage("");
        if (name === "") setMessage("Name shouldn't be empty.");
        if (quantity === "0") setMessage((old) => old.concat(" Quantity should be greater than 0."));
        if (price === "0") setMessage((old) => old.concat(" Price should be greater than 0."));
    }, [quantity, name, price]);

    const handleClose = () => {
        props.setProduct();
        setMessage("");
        setName("");
        setCategory("All-purpose");
        setPrice("0");
        setUnit("kg");
        props.setShow(false);
    }

    const handleSubmit = () => {
        if (quantity === "0" || price === "0" || name === "") {
            return;
        }
        if (props.modal === 'modify') {
            API.updateProduct({ id: props.product.id, name: name, quantity: quantity, price: price, unit: unit, filter: category }, { update: true }).then((r) => {
                if (r.error === undefined) {
                    props.setReqUpdate(true);
                }
                handleClose();
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            API.createProduct({ name: name, quantity: quantity, unit: unit, price: price, filter: category }).then((r) => {
                if (r.error === undefined) {
                    props.setReqUpdate(true);
                }
                handleClose();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleDelete = () => {
        API.deleteProduct(props.product.id).then((p) => {
            if (p.error === undefined) {
                props.setReqUpdate(true);
            }
            handleClose();
        }).catch((err) => {
            console.log(err);
        });
        props.setShow(false);
    }

    return (
        <Modal
            {...props}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                {props.modal === 'modify' &&
                    <Modal.Title>
                        Modify product {props.product ? props.product.name : ""}
                    </Modal.Title>
                }
                {props.modal === 'add' &&
                    <Modal.Title>
                        Add product
                    </Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                <Form className="">
                    <Row>
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label className="text-info w-100"><h5>Name</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-3"
                                    type="name"
                                    placeholder="Name"
                                    required
                                    onChange={(ev) => { setName(ev.target.value); }}
                                    value={name ? name : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="quantity">
                                <Form.Label className="text-info w-100"><h5>Quantity</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-3"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    required
                                    onChange={(ev) => { setQuantity(ev.target.value); }}
                                    value={quantity ? quantity : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="unit">
                                <Form.Label className="text-info w-100"><h5>Unit</h5></Form.Label>
                                <Form.Select style={{
                                    backgroundColor: "unset",
                                    marginTop: "unset"
                                }} className="w-100 p-3" onChange={(ev) => { setUnit(ev.target.value); }}>
                                    <option key="kg">kg</option>
                                    <option key="g">g</option>
                                    <option key="pcs">pcs</option>
                                    <option key="l">l</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="price">
                                <Form.Label className="text-info w-100 mt-2"><h5>Price (€)</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-3"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    required
                                    onChange={(ev) => { setPrice(ev.target.value); }}
                                    value={price ? price : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="category">
                                <Form.Label className="text-info w-100 mt-2"><h5>Category</h5></Form.Label>
                                <Form.Select style={{
                                    backgroundColor: "unset",
                                    marginTop: "unset"
                                }} className="w-100 p-3" value={category} onChange={(ev) => { setCategory(ev.target.value); }}>
                                    <option key="All-purpose">All-purpose</option>
                                    <option key="Fish">Fish</option>
                                    <option key="Dairy and Eggs">Dairy and Eggs</option>
                                    <option key="Meat">Meat</option>
                                    <option key="Vegetables">Vegetables</option>
                                    <option key="Beverages">Beverages</option>
                                    <option key="Fruit">Fruit</option>
                                    <option key="Gastronomy">Gastronomy</option>
                                    <option key="Home and Garden">Home and Garden</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <p className="text-danger mt-3">{message}</p>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {props.modal === 'modify' &&
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                }
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="success" data-testid="submit" onClick={() => { handleSubmit(); }}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default MyMyProducts;
