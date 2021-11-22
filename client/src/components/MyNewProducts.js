import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyNewProducts(props) {
    const [goBack, setGoBack] = useState(false);
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);

    useEffect(() => {
        if (reqUpdate || props.cart) {
            API.getClock().then((time) => {
                API.loadNextProducts(time).then((p) => {
                    if (p.error === undefined) {
                        setProducts(p.filter((prod) => prod.quantity !== 0));
                        setReqUpdate(false);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            })
        }
    }, [reqUpdate, props.cart]);

    if (goBack) {
        return (<Navigate to={"/"+ props.user.role}></Navigate>)
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
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Availability</b></ListGroup.Item>
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
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{p.availability}</ListGroup.Item>
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
