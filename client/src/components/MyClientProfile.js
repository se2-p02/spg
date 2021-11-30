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
            <Row>
                <Col sm="6" className=" m-0 p-0">
                <Row className="m-0 p-4 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="profileName">Name: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.name}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="surname">Surname: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.surname}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="email">Email: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.email}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="role">Role: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.role}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="wallet">Wallet: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white m-0 p-0">{client.wallet + " €"}</h3>
                    </Col>
                </Row>
                </Col>
                <Col sm="6" className=" m-0 p-0">
                <Row className="m-0 p-4 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="phone">Phone: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.phone===null?"NaN":client.phone}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="address">Address: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.address}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="city">City: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.city}</h3>
                    </Col>
                </Row>
                <Row className="m-0 p-4 pt-0 pb-2">
                    <Col sm="4" className="m-0 p-0"><h3 className="text-white"><b data-testid="country">Country: </b></h3>
                    </Col>
                    <Col sm="8" className="m-0 p-0"><h3 className="text-white">{client.country}</h3>
                    </Col>
                </Row>
                
                </Col>
            </Row>


                <Row className="text-center justify-content-center p-0 pt-2 pb-5"><Button testId="back" size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button></Row>
            </Container>

        </>
    );
}


export default MyClientProfile;
