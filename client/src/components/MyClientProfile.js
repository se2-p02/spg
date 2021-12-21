import React, { useState, useEffect } from "react";
import {  Col, Row, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";
import './MyNavBar.css';
import API from "./API";

import profile from './images/profile.jpeg'

function MyClientProfile(props) {
    const [client, setClient] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true)



    const { id } = useParams();

    useEffect(() => {
        if (reqUpdate) {
            API.loadClient(props.id).then((c) => {
                if (c.error === undefined) {
                    setClient(c);
                    setReqUpdate(false);
                    console.log(c)
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [reqUpdate, id]);



    return (
        <Col sm="9">
            <Container className="bg-white min-height-100  align-items-center text-center below-nav" fluid>
                <Image src={profile} roundedCircle fluid height={"25%"} width={"25%"} className="pt-3"/>
                <Row className="text-center mt-4 pb-4 pt-3">

                    <Col sm="1"></Col>
                    <Col sm="5" className=" m-0 p-0 border-top border-bottom border-start radius_button_half1">
                        <Row className="m-0 p-4 pb-3">
                            <Col sm="2"></Col>
                            <Col sm="4" className="m-0 p-0 text-start"><b data-testid="profileName">Name: </b>
                            </Col>
                            <Col sm="6" className="m-0 p-0 text-start">{client.name}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3 text-center">
                            <Col sm="2"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="surname"><b>Surname: </b>
                            </Col>
                            <Col sm="6" className="m-0 p-0 text-start">{client.surname}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3 text-center">
                            <Col sm="2"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="email"><b>Email: </b>
                            </Col>
                            <Col sm="6" className="m-0 p-0 text-start">{client.email}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3 text-center">
                            <Col sm="2"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="role"><b>Role: </b>
                            </Col>
                            <Col sm="6" className="m-0 p-0 text-start">{client.role}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3 text-center pb-4">
                            <Col sm="2"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="wallet"><b>Wallet: </b>
                            </Col>
                            <Col sm="6" className="m-0 p-0 text-start">{client.wallet + " €"}
                            </Col>

                        </Row>
                    </Col>
                    <Col sm="5" className=" m-0 p-0 border-top border-bottom border-end radius_button_half2">
                        <Row className="m-0 p-4 pb-3 ">
                            <Col sm="3"></Col>
                            <Col sm="4" className="m-0 p-0 text-start" data-testid="phone"><b>Phone: </b>
                            </Col>
                            <Col sm="5" className="m-0 p-0 text-start">{client.phone}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3">
                            <Col sm="3"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="address"><b>Address: </b>
                            </Col>
                            <Col sm="5" className="m-0 p-0 text-start">{client.address}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3">
                            <Col sm="3"></Col>

                            <Col sm="4" className="m-0 p-0 text-start " data-testid="city"><b>City: </b>
                            </Col>
                            <Col sm="5" className="m-0 p-0 text-start ">{client.city}
                            </Col>
                        </Row>
                        <Row className="m-0 p-4 pt-0 pb-3">
                            <Col sm="3"></Col>

                            <Col sm="4" className="m-0 p-0 text-start" data-testid="country"><b>Country: </b>
                            </Col>
                            <Col sm="5" className="m-0 p-0 text-start ">{client.country}
                            </Col>
                        </Row>

                    </Col>
                    <Col sm="1"></Col>

                </Row>


            </Container>

        </Col>
    );
}




export default MyClientProfile;
