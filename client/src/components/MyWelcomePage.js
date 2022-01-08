import React from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";


function MyWelcomePage(props) {

    return (<>
        <Col sm={9}>
            <Container className=" min-height-100 justify-content-center align-items-center text-center below-nav" fluid>
                <h3>Welcome</h3>
                <h5 className="mt-4">Please select a page from the menu</h5>
            </Container>
        </Col>
        {props.user && props.user.role === 'client' &&
        <Modal show={props.walletAlert} className="mt-5 m-0">
            <Modal.Header closeButton><h4>Insufficient balance</h4></Modal.Header>
            <Modal.Body>
                <Row>
                    <h5>Your wallet balance is insufficient for one or more orders. Please check your wallet and your orders.</h5>
                </Row>
                <Row className="mt-3">
                    <Button variant="danger" onClick={() => props.setWalletAlert(false)}>Close</Button>
                </Row>
            </Modal.Body>
        </Modal>}
        </>
    );
}

export default MyWelcomePage;