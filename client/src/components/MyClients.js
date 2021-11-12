import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyClients(props) {
    const [goBack, setGoBack] = useState(false);
    const [clients, setClients] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);

    useEffect(() => {
        if (reqUpdate) {
            API.loadClients().then((c) => {
                if (c.error === undefined) {
                    setClients(c);
                    setReqUpdate(false);
                }
                else {
                }
            }).catch((err) => {
            });
        }
    }, [reqUpdate]);

    if (goBack) {
        return (<Navigate to="/employee"></Navigate>)
    }



    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>

                <ListGroup className="my-3 mx-5" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Id</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Name</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center">Surname</ListGroup.Item>
                </ListGroup>
                {clients &&
                    <>
                        {
                            clients.map(c => {
                                return (
                                    <ListGroup as={Link} to={"/employee/clients/" + c.id} key={c.id} style={{ textDecoration: 'none' }} className="my-2 mx-5" horizontal>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.id}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.name}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.surname}</ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }
                <Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button>

            </Container>

        </>
    );
}

export default MyClients;
