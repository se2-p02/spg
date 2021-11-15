import { useState, useEffect } from "react";
import { Button, Col, ListGroup, Row, Container } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function MyClients(props) {
    
    const [goBack, setGoBack] = useState(false);
    const [goNew, setGoNew] = useState(false);
    const [clients, setClients] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);

    useEffect(() => {
        if (reqUpdate) {
            API.loadClients().then((c) => {
                if (c.error === undefined) {
                    setClients(c);
                    setReqUpdate(false);
                    //console.log(c)
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [reqUpdate]);

    if (goBack) {
        return (<Navigate to="/employee"></Navigate>)
    }
    if (goNew) {
        return (<Navigate to="/employee/form"></Navigate>)
    }


    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center text-center below-nav mt-3" fluid>

                <ListGroup className="my-3 mx-5" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Id</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Name</b></ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-center"><b>Surname</b></ListGroup.Item>
                </ListGroup>
                {clients &&
                    <>
                        {
                            clients.map(c => {
                                return (
                                    <ListGroup as={Link} to={"/employee/client?" + c.id} key={c.id} style={{ textDecoration: 'none' }} className="my-2 mx-5" horizontal>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.id}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.name}</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center">{c.surname}</ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }

                    </>
                }
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="4" className="justify-content-right align-items-right m-0 p-0 text-right">
                    <Button size="lg" className="btn-danger p-2 w-100 mt-3" onClick={() => setGoBack(true)}>Back</Button>
                    </Col>
                    <Col sm="2">
                    </Col>
                    <Col sm="4" className="justify-content-left align-items-left m-0 p-0">
                    <Button size="lg" className="btn-primary p-2 w-100 mt-3" onClick={() => setGoNew(true)}>Add Client</Button>
                    </Col>
                    <Col sm="1"></Col>
                </Row>

            </Container>

        </>
    );
}

export default MyClients;
