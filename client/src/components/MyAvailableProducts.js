import { useState, useEffect } from "react";
import { Badge, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyAvailableProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (reqUpdate || props.cart) {
            API.loadProducts().then((p) => {
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
                else {
                }
            }).catch((err) => {
            });
        }
    }, [reqUpdate, props.cart]);

    if (goBack) {
        return (<Navigate to="/employee"></Navigate>)
    }

    const handleAddToCart = (id, q) => {
        let items = [...products];
        let cartItems = [...props.cart];
        if (products.find((prod) => prod.id === id).quantity < q || q <= 0) return;
        let tempProduct = items.find((prod) => prod.id === id);
        let tempProductCart = cartItems.find((prod) => prod.id === id);
        if (tempProductCart) {
            tempProductCart.quantity = props.cart.find((prod) => prod.id === id).quantity + q;
            props.setCart((old) => old.filter((prod) => prod !== props.cart.find((prod) => prod.id === id)));
            props.setCart((old) => [...old, tempProductCart].sort((a, b) => a.id - b.id));
        }
        else {
            props.setCart((c) => [...c, { ...tempProduct, quantity: q }]);
        }
        tempProduct.quantity = products.find((prod) => prod.id === id).quantity - q;
        setProducts((old) => old.filter((prod) => prod !== products.find((prod) => prod.id === id)));
        if (tempProduct.quantity > 0) setProducts((old) => [...old, tempProduct].sort((a, b) => a.id - b.id));
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>

                <Row className="align-items-center mx-4">
                    <Col>
                        <Button size="lg" className="btn-danger p-2 w-25" onClick={() => setGoBack(true)}>Back</Button>
                    </Col>
                </Row>
                <ListGroup className="my-3 mx-5" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Id</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Name</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Quantity</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Farmer</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Price</ListGroup.Item>
                </ListGroup>
                {products.quantity !==0 &&
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
                                        
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }

            </Container>

        </>
    );
}

export default MyAvailableProducts;
