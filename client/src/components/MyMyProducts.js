import React, { useState, useEffect } from "react";
import { Button, ListGroup, Container, Row, Col } from "react-bootstrap";
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
        if (reqUpdate || props.cart) {
            API.loadNextProducts().then((p) => {
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
    }, [reqUpdate, props.cart, props.user]);

    if (goBack) {
        return (<Navigate to={"/" + props.user.role}></Navigate>)
    }

    const handleModify = (id) => {
        setProduct(products.find((prod) => prod.id === id));
        handleShow();
    }

    const handleConfirm = (id) => {
        setProduct(products.find((prod) => prod.id === id));
        handleShow();
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>

                <Row>
                    <Col>
                        <Button size="lg" className="btn-danger p-2 w-100 mt-3" onClick={() => setGoBack(true)}>Back</Button>
                    </Col>
                    <Col>
                        <Button size="lg" className="btn-info p-2 w-100 mt-3" onClick={() => { setModal('add'); handleShow(); }}>Add new product</Button>
                    </Col>
                </Row>
                <ListGroup className="my-3 mx-5" horizontal>
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
                                            <Button variant="warning" onClick={() => { setModal('modify'); handleModify(p.id); }}><PencilSquare /></Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">
                                            <Button variant="success" onClick={() => handleConfirm(p.id)}><CheckSquare /></Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }

                <MyModal show={show} setShow={setShow} product={product} modal={modal} setProduct={setProduct} />
            </Container>

        </>
    );
}

function MyModal(props) {

    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [unit, setUnit] = useState();

    const handleClose = () => {        
        props.setProduct();
        props.setShow(false);
    }
    
    useEffect(() => {
        if(props.modal === 'modify'){
            setName(props.product && props.product.name);
            setQuantity(props.product && props.product.quantity);
            setUnit(props.product && props.product.unit);
        }
    }, [ props.modal, props.product]);

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
                                    value={ quantity ? quantity : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="unit">
                                <Form.Label className="text-info w-100"><h5>Unit</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-3"
                                    type="text"
                                    placeholder="Unit"
                                    required
                                    onChange={(ev) => { setUnit(ev.target.value); }}
                                    value={ unit ? unit : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success">Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyMyProducts;
