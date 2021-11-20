import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Link, Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import './MyNavBar.css';
import API from "./API";


function MyMyProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [id, setId] = useState();
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
        setId(id);
        handleShow();
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>


                <ListGroup className="my-3 mx-5" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Id</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Name</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Quantity</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Farmer</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Price</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Modify</b></ListGroup.Item>
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
                                            <Button variant="warning" onClick={() => handleModify(p.id)}><PencilSquare /></Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }
                <Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button>
                <MyModal show={show} products={products} setShow={setShow} id={id}/>
            </Container>

        </>
    );
}

function MyModal(props) {

    const handleClose = () => props.setShow(false);

    return (
        <Modal
            {...props}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modify product {props.products.find((prod) => prod.id === props.id) && props.products.find((prod) => prod.id === props.id).name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyMyProducts;
