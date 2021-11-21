import React, { useState, useEffect } from "react";
import { Button, Col, Row, Container} from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";



function MyClientProfile(props) {
    const [goBack, setGoBack] = useState(false);
    const [client, setClient] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true)


    useEffect(() => {
        if (reqUpdate) {
            API.loadClient(props.id).then((c) => {
                if (c.error === undefined) {
                    setClient(c);
                    setReqUpdate(false);
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [reqUpdate, props.id]);

    if (goBack) {
        return (<Navigate to={"/" + props.user.role}></Navigate>)
    }



    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center align-items-center below-nav mt-3" fluid>

                <Row className="m-0 p-4 pb-2">
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Name: </b></h2>
                    </Col>
                    <Col sm="4" className="m-0 p-0"><h2 className="text-white">{client.name}</h2>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Surname: </b></h2>
                    </Col>
                    <Col sm="4" className="m-0 p-0"><h2 className="text-white">{client.surname}</h2>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Email: </b></h2>
                    </Col>
                    <Col sm="4" className="m-0 p-0"><h2 className="text-white">{client.email}</h2>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Role: </b></h2>
                    </Col>
                    <Col sm="4" className="m-0 p-0"><h2 className="text-white">{client.role}</h2>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Wallet: </b></h2>
                    </Col>
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white m-0 p-0">{client.wallet + " €"}</h2>
                    </Col>
                </Row>


                <Row className="text-center justify-content-center p-0 pt-2 pb-5"><Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button></Row>
            </Container>

        </>
    );
}


export default MyClientProfile;
