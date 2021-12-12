import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';
import ModalWindow from "./ModalWindow";

function MyClientPage(props) {
    const [goBack, setGoBack] = useState("");


    if (goBack === "profile") {
        return (<Navigate to="/client/profile"></Navigate>)
    }
    else if (goBack === "products") {
        return (<Navigate to="/client/products"></Navigate>)
    }
    else if (goBack === "orders") {
        return (<Navigate to="/client/orders"></Navigate>)
    }
    else if (goBack === "available") {
        return (<Navigate to="/client/availableOrders"></Navigate>)
    }
    return (
        <>
        {props.showModal === true ? (
        <ModalWindow
          show={props.showModal}
          onHide={props.onHide}
          text="One or more orders have an amount greater than your wallet. Please top it up."
          header="Insufficient balance!"
        ></ModalWindow>
      ) : (
        ""
      )}
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
                        <Button size="lg" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("orders") }}><h3>My Orders</h3></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center m-0 p-0 w-100 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" data-testid="available" className="p-4 w-50 btn-primary" onClick={() => { setGoBack("available") }}><h3>Orders available in the shop</h3></Button>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
}

export default MyClientPage;
