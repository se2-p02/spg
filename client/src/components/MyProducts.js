import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container, FloatingLabel, Col, Row, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { XCircleFill } from "react-bootstrap-icons";
import Card from 'react-bootstrap/Card';
import './MyNavBar.css';
import API from "./API";


function MyProducts(props) {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [wordFilter, setWordFilter] = useState('');
    const [filters, setFilters] = useState(['All']);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        API.loadNextProducts().then(p => {
            setFilter('All');
            setFilters(['All']);
            if (props.modify) {
                props.cart.forEach(prod => {
                    const modp = p.find(pro => pro.id === prod.id);
                    if (modp) modp.quantity = modp.quantity + prod.quantity;
                    else p.push(Object.assign({}, prod));
                });
            }
            setAllProducts(p.filter(pr => pr.quantity > 0));
        });
    }, [props.clock]);

    useEffect(() => {
        if (props.updateProducts) {
            API.loadNextProducts().then(p => setAllProducts(p.filter(pr => pr.quantity > 0)));
            props.setUpdateProducts(false);
        }
    }, [props.updateProducts]);

    useEffect(() => {
        if (allProducts.length !== 0) {
            if (props.cart.length === 0) setProducts(allProducts);
            else {
                const newP = [];
                allProducts.forEach(prod => {
                    const tempP = Object.assign({}, prod);
                    const cart_find = props.cart.find((c) => c.id === prod.id);
                    if (cart_find) tempP.quantity = prod.quantity - cart_find.quantity;
                    newP.push(tempP);
                });
                setProducts(newP.filter(prod => prod.quantity > 0));
            }
        }
    }, [allProducts, props.cart]);

    useEffect(() => {
        const t_filters = filters;
        products.forEach(p => {
            if (!t_filters.includes(p.filter)) t_filters.push(p.filter);
        });
        setFilters(() => t_filters);
    }, [products, filters]);

    useEffect(() => {
        setFilteredProducts(() => products.filter(p => (filter === 'All' || p.filter === filter) && (!wordFilter || p.name.toLowerCase().includes(wordFilter.toLowerCase()))));
    }, [products, filter, wordFilter]);

    const handleAddToCart = (id, q, name, unit, price) => {
        let items = [...products];
        let cartItems = [...props.cart];
        if (products.find((prod) => prod.id === id).quantity < q || q <= 0) return;
        let tempProduct = items.find((prod) => prod.id === id);
        let tempProductCart = cartItems.find((prod) => prod.id === id);
        if (tempProductCart) {
            tempProductCart.quantity = props.cart.find((prod) => prod.id === id).quantity + q;
            //const oldCart = props.cart.filter(prod => prod !== props.cart.find(product => product.id === id))
            props.setCart((old) => old.filter((prod) => prod !== props.cart.find((product) => product.id === id)));
            props.setCart((old) => [...old, tempProductCart].sort((a, b) => a.id - b.id));
        }
        else {
            props.setCart((c) => [...c, { ...tempProduct, quantity: q }]);
        }
        document.getElementById('pQnt' + id).value = 0;
    }


    return (
        <Col sm="12" md="9">
            <Container className={
                props.full
                    ? " justify-content-center align-items-center mt-3"
                    : " min-height-100 justify-content-center align-items-center below-nav mt-3"
            } fluid>
                <FloatingLabel label="Filter products:" className="pb-2">
                    <Form.Select className="bg-transparent" onChange={(e) => setFilter(() => e.target.value)}>
                        {filters.map((f, i) => <option key={'f' + i} value={f}>{f}</option>)}
                    </Form.Select>
                </FloatingLabel>
                <InputGroup className="mt-3 d-flex search-form" >
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search for a product"
                        value={wordFilter}
                        onChange={(e) => setWordFilter(() => e.target.value)} />
                    <Button variant="secondary" size="lg" onClick={() => setWordFilter(() => '')}><XCircleFill size="25" /></Button>
                </InputGroup>
                {filteredProducts &&
                    <>
                        <Row className="justify-content-center align-items-start" data-testid="productCards">
                            {
                                filteredProducts.map(p => {
                                    return (
                                        <>
                                            <Col className="align-items-center my-4 px-3" sm={6} md={6} lg={4}>
                                                <Card key={p.id} className="bg_login2 p-0">
                                                    <Card.Title className="text-truncate text-center">
                                                        <img id="loadedimage" src={"http://localhost:3000/images/" + p.image} alt="myImg" className="img_product" />
                                                    </Card.Title>
                                                    <Card.Body className="m-0 p-3 pt-2 ">
                                                        <ListGroup variant="flush" className="bg-white radius_button_small border" >
                                                            <ListGroup.Item className="d-flex w-100 bg-transparent m-0 p-2">Product: <p className="text-end w-100 m-0 p-0">{p.name}</p></ListGroup.Item>
                                                            <ListGroup.Item as={Link} to={"/farmers/" + p.farmer} style={{ textDecoration: 'none' }} variant="" className="d-flex w-100 bg-transparent m-0 p-2">Farmer: <p className="text-end w-100 m-0 p-0">{p.farmerName}</p></ListGroup.Item>
                                                            <ListGroup.Item className="d-flex w-100 bg-transparent m-0 p-2">Quantity: <p className="text-end w-100 m-0 p-0 ">{p.quantity + " " + p.unit}</p></ListGroup.Item>
                                                            <ListGroup.Item className="d-flex w-100 bg-transparent m-0 p-2">Price: <p className="text-end w-100 m-0 p-0">{p.price + " €/" + p.unit}</p></ListGroup.Item>
                                                        </ListGroup>
                                                        <Row className="p-0 m-0 mt-4">
                                                            <Col md="9" sm="9" xs="10" className="m-0 p-0 mx-2">
                                                                <Form.Control id={'pQnt' + p.id}
                                                                    className="radius_button w-100"
                                                                    placeholder={0}
                                                                    required
                                                                    min={0}
                                                                    max={p.quantity}
                                                                    type="number"
                                                                    onChange={(ev) => { setQuantity(ev.target.value) }}
                                                                />
                                                            </Col>
                                                            <Col sm="1" xs="1" className="p-0"> <Button data-testid={'addCart' + p.id} variant="success" className="btn btn-circle btn-sm m-0 align-items-center" onClick={() => handleAddToCart(p.id, parseFloat(quantity), p.name, p.unit, p.price)}><h5>+</h5></Button></Col>
                                                        </Row>
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
            </Container>
        </Col>
    );
}

export default MyProducts;
