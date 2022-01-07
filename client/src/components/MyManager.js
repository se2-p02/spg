import React from "react";
import './MyNavBar.css';
import { Col, Container } from "react-bootstrap";


function MyManager(props) {
    
    return (
        <Col sm="9">
            <Container className="bg-white min-height-100 justify-content-center align-items-center text-center below-nav" fluid data-testid=""/>
        </Col>
    );
}

export default MyManager;
