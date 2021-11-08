import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API.js"

function MyClients(props) {
    const [goBack, setGoBack] = useState(false)
    const [clients, setClients] = useState("")

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('http://localhost:3000/api/clients');
            const responseBody = await response.json();
            if (responseBody.error) return;
            setClients(responseBody)
        }
        fetchClients();
    }, []);

    if (goBack) {
        return (<Navigate to="/employee"></Navigate>)
    }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav m-0 pl-0 pr-0 pb-0" fluid>
                <Container className="w-100 bg-success m-0 p-2">
                <ListGroup className="w-25 text-center p-0 ">
                    {clients.map((x)=>{
                        return <ListGroup.Item variant="dark" action className="text-dark w-100"><b>{x.name + " " + x.surname}</b> </ListGroup.Item>
                    })}
                </ListGroup>
                </Container>
                <Button size="lg" className="btn-danger p-2 w-25" onClick={() => setGoBack(true)}>Back</Button>
            </Container>

        </>
    );
}

export default MyClients;
