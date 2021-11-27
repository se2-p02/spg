import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container, FloatingLabel, Col, Row } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './MyNavBar.css';
import API from "./API";


function MyProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [filter, setFilter] = useState('All');
    const [filters, setFilters] = useState(['All']);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (props.cart) {
            API.loadNextProducts().then((p) => {
                if (p.error === undefined) {
                    setFilter('All');
                    setFilters(['All']);
                    p.forEach((prod) => {
                        let find = props.cart.find((c) => c.id === prod.id)
                        if (props.cart.find((c) => c.id === prod.id)) {
                            prod.quantity = prod.quantity - find.quantity;
                        }
                    });
                    setProducts(p.filter((prod) => prod.quantity !== 0));
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [props.cart, props.clock]);

    useEffect(() => {
        if (products.length !== 0) {
            const t_filters = filters;
            products.forEach(p => {
                if (!t_filters.includes(p.filter)) t_filters.push(p.filter);
            });
            setFilters(() => t_filters);
        }
    }, [products]);

    useEffect(() => {
        if (products.length !== 0) setFilteredProducts(() => products.filter(p => filter === 'All' || p.filter === filter));
    }, [products, filter]);

    if (goBack) {
        return (<Navigate to={"/" + props.user.role}></Navigate>)
    }

    const handleAddToCart = (id, q, name, unit, price) => {
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
        document.getElementById('pQnt' + id).value = 0;
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>
                <FloatingLabel label="Filter products:" className="pb-2">
                    <Form.Select onChange={(e) => setFilter(() => e.target.value)}>
                        {filters.map((f, i) => <option key={'f' + i} value={f}>{f}</option>)}
                    </Form.Select>
                </FloatingLabel>
                {filteredProducts &&
                    <>
                        <Row className="justify-content-center align-items-start">
                            {
                                filteredProducts.map(p => {
                                    return (
                                        <>

                                            <Col className="align-items-center my-4 px-3" sm={6} md={6} lg={4}>
                                                <Card key={p.id} className="bg-dark" border="light">
                                                    <Card.Title className="text-truncate text-center">
                                                    <ListGroup.Item variant="primary" className="d-flex justify-content-center w-100 ">{p.name}</ListGroup.Item>
                                                    </Card.Title>
                                                    <Card.Body className="">
                                                        <ListGroup className="">
                                                            <ListGroup.Item as={Link} to={"/farmers/" + p.farmer} style={{ textDecoration: 'none' }} variant="primary" className="d-flex w-100 ">Farmer: <p className="text-end w-100">{p.farmerName}</p></ListGroup.Item>
                                                            <ListGroup.Item variant="primary" className="d-flex w-100 ">Quantity: <p className="text-end w-100">{p.quantity + " " + p.unit}</p></ListGroup.Item>
                                                            <ListGroup.Item variant="primary" className="d-flex w-100 ">Price: <p className="text-end w-100">{p.price + " €/" + p.unit}</p></ListGroup.Item>
                                                            <ListGroup.Item variant="primary" className="d-flex w-100 ">
                                                                <Form.Control id={'pQnt' + p.id}
                                                                    className="w-100 mx-1"
                                                                    placeholder={0}
                                                                    required
                                                                    min={0}
                                                                    max={p.quantity}
                                                                    type="number"
                                                                    onChange={(ev) => { setQuantity(ev.target.value) }}
                                                                />
                                                                <Button variant="success" onClick={() => handleAddToCart(p.id, parseFloat(quantity), p.name, p.unit, p.price)}>+</Button>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Card.Body>
                                                </Card>
                                            </Col>

                                        </>
                                    );
                                })
                            }
                        </Row>
                    </>
                }
                <Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button>
            </Container>

        </>
    );
}

export default MyProducts;
