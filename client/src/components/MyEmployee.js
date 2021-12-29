import React from "react";
import { Col, Container } from "react-bootstrap";


function MyEmployee(props) {

   

    return (
        <Col sm={9}>
            <Container className=" min-height-100 justify-content-center align-items-center text-center below-nav" fluid>
                <h3>Welcome Employee</h3>
                <h5 className="mt-4">Please select a page from the menu</h5>
            </Container>
            </Col>
    );
}

export default MyEmployee;
