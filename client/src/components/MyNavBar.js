import { useState } from "react";
import './MyNavBar.css';
import './solidarity.png'
import { Badge, Dropdown, ListGroup, Modal, Button, Image, Navbar, Col, Row } from "react-bootstrap";
import API from "./API";

function MyNavBar(props) {

    const [show, setShow] = useState(false);

    const handleRemoveFromCart = (p) => {
        props.setCart((c) => c.filter((old) => old !== p));
    }

    return (

        <Navbar className="navbar navbar-dark navbar-expand-sm bg-primary fixed-top justify-content-between" expand="lg">
            {/*<Navbar.Toggle aria-controls="CollapseLeft" /> */}

            <Navbar.Brand >
                <Row className=" align-items-center">
                    <Col sm="3" className="p-0 m-0 d-none d-sm-block">
                        <Image src="../solidarity.png" className="w-25 m-4 mt-0 mb-0 p-0" />
                    </Col>
                    <Col xs="12" sm="9" className="p-0 m-0 ml-2 pl-2">
                        <b><h2 className="mt-0 mb-0 w-100 m-0 p-1 pb-1 pt-1">Social Purchasing Group</h2></b>
                    </Col>

                </Row>
            </Navbar.Brand>

            <Dropdown>
                <Dropdown.Toggle variant="dark" className="d-flex justify-content-between align-items-start mx-5 px-5">
                    <div className="fw-bold mx-2">Cart</div>
                    <Badge variant="primary" pill>
                        {props.cart.length}
                    </Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.cart.length !== 0 &&
                        props.cart.map((c) => (
                            <Dropdown.Item>
                                <ListGroup horizontal>
                                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.name}</ListGroup.Item>
                                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity + " " + c.unit}</ListGroup.Item>
                                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center"><Button variant="danger" onClick={() => handleRemoveFromCart(c)}>-</Button></ListGroup.Item>
                                </ListGroup>
                            </Dropdown.Item>
                        ))
                    }
                    {props.cart.length !== 0 &&
                        <ListGroup className="mx-3">
                            <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center"><Button variant="info" onClick={() => setShow(true)}>Place order</Button></ListGroup.Item>
                        </ListGroup>
                    }
                    {props.cart.length === 0 &&
                        <span className="mx-3">No products here</span>
                    }
                </Dropdown.Menu>
            </Dropdown>
            {props.cart.length !== 0 &&
                <MyModal cart={props.cart} setCart={props.setCart} show={show} setShow={setShow} />
            }
        </Navbar>
    );
}

function MyModal(props) {

    const [successful, setSuccessful] = useState(false);

    const handleClose = () => {
        setSuccessful(false);
        props.setShow(false);
    }

    const handleSubmit = async () => {
        let order;
        let products = {};
        props.cart.forEach((prod) => products = {...products, [prod.name]: prod.quantity });
        order = {
            products: products,
            amount: props.cart.reduce((a, b) => a.quantity * a.price + b.quantity * b.price)
        }
        if (props.cart.length === 1) {
            order.amount = props.cart[0].quantity * props.cart[0].price;
        }
        API.sendOrder(order).then((response) => {
            if (response.error !== undefined) {
            } else {
                setSuccessful(true);
                props.setCart([])
            }
        })
    }

    return (
        <Modal
            {...props}
            size="auto"
            aria-labelledby="contained-modal-title-vcenter"
            show={props.show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Place an order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.cart.map((c) => (
                    <ListGroup className="my-1" horizontal>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.name}</ListGroup.Item>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity + " " + c.unit}</ListGroup.Item>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity * c.price + " €"}</ListGroup.Item>
                    </ListGroup>
                ))
                }
                <ListGroup className="my-1" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-start align-items-center">Grand total:</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-end align-items-center">
                        {props.cart.length === 1 && props.cart[0].quantity * props.cart[0].price + " €"}
                        {props.cart.length !== 1 && props.cart.reduce((a, b) => a.quantity * a.price + b.quantity * b.price) + " €"}</ListGroup.Item>
                </ListGroup>
                <ListGroup className="mx-3">
                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center"><Button variant="info" onClick={handleSubmit}>Place order</Button></ListGroup.Item>
                </ListGroup>
                {successful &&
                    <ListGroup className="mx-3">
                        <ListGroup.Item variant="success" className="d-flex w-100 justify-content-center align-items-center">Order successfully submitted</ListGroup.Item>
                    </ListGroup>
                }
            </Modal.Body>
        </Modal>
    );
}

export default MyNavBar;