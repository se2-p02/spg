import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Navigate} from 'react-router-dom';
import './MyNavBar.css';


function MyEmployee(props) {
    const [goBack, setGoBack] = useState(false);

    if (goBack==="clients") {
        return (<Navigate to="/employee/clients"></Navigate>)
    }
    else if(goBack === "products"){
        return (<Navigate to="/employee/products"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav" fluid>


                <Row className="justify-content-center m-0 p-0 w-100 pt-5 mt-5 mb-5">
                    <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-5 w-50 btn-primary" onClick={() => { setGoBack("clients") }}><h3>Clients</h3></Button>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center m-0 p-0 w-100">
                <Col className=" m-0 p-0" sm={6}>
                        <Button size="lg" className="p-5 w-50 btn-primary" onClick={() => { setGoBack("products") }}><h3>Products</h3></Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyEmployee;
