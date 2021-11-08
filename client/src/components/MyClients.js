import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Navigate} from 'react-router-dom';
import './MyNavBar.css';


function MyClients(props) {
    const [goBack, setGoBack] = useState(false)

    if (goBack) {
        return (<Navigate to="/employee"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav" fluid>

                <Button size="lg" className="btn-danger p-2 w-25" onClick={()=>setGoBack(true)}>Back</Button>
            </Container>
            
        </>
    );
}

export default MyClients;
