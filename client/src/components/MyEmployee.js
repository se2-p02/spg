import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';


function MyEmployee(props) {
    const [goBack, setGoBack] = useState(false);

    if (goBack == "clients") {
        return (<Navigate to="/employee/clients"></Navigate>)
    }
    else if (goBack == "products") {
        return (<Navigate to="/employee/products"></Navigate>)
    }
    else if (goBack == "orders") {
        return (<Navigate to="/employee/orders"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav" fluid>


                <Row className="justify-content-center m-0 p-0 w-100 pt-5 mt-5 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("clients") }}><h3 data-testid="c">Clients</h3></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("products") }}><h3>Products</h3></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("orders") }}><h3>Orders</h3></Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyEmployee;
