import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';


function MyWManager(props) {
    const [goBack, setGoBack] = useState(false);

    if (goBack === "myDeliveries") {
        return (<Navigate to="/wmanager/deliveries"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav" fluid>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5 mt-5 pt-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" data-testid="myDeliveries" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("myDeliveries") }}><h3>Deliveries</h3></Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyWManager;
