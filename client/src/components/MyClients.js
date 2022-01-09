import React, { useState, useEffect } from "react";
import { Button, Col, ListGroup, Row, Container } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyClients() {

    const [goNew, setGoNew] = useState(false);
    const [clients, setClients] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);

    useEffect(() => {
        if (reqUpdate) {
            API.loadClients().then((c) => {
                if (c.error === undefined) {
                    c = c.filter(x => x.role==="client")
                    setClients(c);
                    setReqUpdate(false);
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [reqUpdate]);

    if (goNew) {
        return (<Navigate to="/employee/form"></Navigate>)
    }


    return (
        <Col sm={12} md={9}>
            <Container className="bg-white min-height-100 justify-content-center align-items-center text-center below-nav" fluid>
                {clients &&
                    <>
                        <ListGroup  data-testid="table" className="my-3 mx-5" variant="flush">
                            <ListGroup.Item variant="warning" className="justify-content-center p-3">
                                <Row>
                                    <Col sm="4" xs="4"><b data-testid="id">Id</b></Col>
                                    <Col sm="4" xs="4"><b data-testid="name">Name</b></Col>
                                    <Col sm="4" xs="4"><b data-testid="surname">Surname</b></Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                clients.map(c => {
                                    return (
                                        <ListGroup.Item className="clientButt p-2" as={Link} to={"/employee/clients/"+c.id} data-testid={"Nino"} key={c.id} style={{textDecoration: 'none'}}>
                                            <Row>
                                                <Col sm="4" xs="4">{c.id}</Col>
                                                <Col sm="4" xs="4">{c.name}</Col>
                                                <Col sm="4" xs="4">{c.surname}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>


                    </>
                }
                <Row>
                    <Col sm="4" xs="4"></Col>
                    <Col sm="4" xs="4" className="justify-content-left align-items-left m-0 p-0">
                        <Button data-testid="add_client" size="lg" className="add_btn p-2 w-100 mt-3 text-white mb-5" onClick={() => setGoNew(true)}>Add Client</Button>
                    </Col>
                    <Col sm="4" xs="4"></Col>
                </Row>

            </Container>

        </Col>
    );
}

export default MyClients;
