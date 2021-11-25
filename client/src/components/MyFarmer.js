import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';


function MyFarmer(props) {
    const [goBack, setGoBack] = useState(false);

    if (goBack === "profile") {
        return (<Navigate to="/farmer/profile"></Navigate>)
    }
    else if (goBack === "products") {
        return (<Navigate to="/farmer/products"></Navigate>)
    }
    else if (goBack === "myProducts") {
        return (<Navigate to="/farmer/myProducts"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav" fluid>

                <Row className="justify-content-center m-0 p-0 w-100 pt-5 mt-5 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("profile") }}><h3>Profile</h3></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("products") }}><h3>Products</h3></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("myProducts") }}><h3>My products</h3></Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyFarmer;
