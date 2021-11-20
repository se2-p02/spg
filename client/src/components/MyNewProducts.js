import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyNewProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [quantity, setQuantity] = useState(0);

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
            props.setCart((old) => old.filter((prod) => prod !== props.cart.find((product) => product.id === id)));
            props.setCart((old) => [...old, tempProductCart].sort((a, b) => a.id - b.id));
        }
        else {
            props.setCart((c) => [...c, { ...tempProduct, quantity: q }]);
        }
        tempProduct.quantity = products.find((prod) => prod.id === id).quantity - q;
        setProducts((old) => old.filter((prod) => prod !== products.find((product) => product.id === id)));
        if (tempProduct.quantity > 0) setProducts((old) => [...old, tempProduct].sort((a, b) => a.id - b.id));
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
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Add</b></ListGroup.Item>
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
                                            <Form.Control
                                                className="w-100 mx-1"
                                                placeholder={0}
                                                required
                                                type="number"
                                                onChange={(ev) => { setQuantity(ev.target.value) }}
                                            />
                                            <Button variant="success" onClick={() => handleAddToCart(p.id, parseFloat(quantity))}>+</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }
                <Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button>
            </Container>

        </>
    );
}

export default MyNewProducts;
