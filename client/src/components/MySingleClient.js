import React, { useState, useEffect } from "react";
import { Button, Col, Row, Modal, Form, FormControl, Container, Image, Badge } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import './MyNavBar.css';
import API from "./API";
import MyOrders from "./MyOrders";
import minus from './images/minus.png';
import plus from './images/plus.png';
import profile from './images/profile.jpeg'

function MySingleClient(props) {
    const [goBack, setGoBack] = useState(false);
    const [client, setClient] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true)
    const [showMod, setShowMod] = useState(false)
    const [text, setText] = useState()


    const { id } = useParams();

    useEffect(() => {
        if (reqUpdate) {
            API.loadClient(id).then((c) => {
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

    if (goBack) {
        return (<Navigate to={"/" + props.user.role + "/clients"}></Navigate>)
    }



    return (
        <Col sm="12" xs="12" md="9">
            <Container className="bg-white min-height-100  align-items-center text-left below-nav" fluid>
                <Row className="p-0 pt-4">
                    <Col sm="3" className="p-0 m-0 text-center pt-3">
                        <Image src={profile} roundedCircle fluid height={"50%"} width={"50%"} />
                    </Col>
                    <Col sm="9">
                        <Row>
                            <Col sm="6" xs="6" className=" m-0 p-0">
                                <Row className="m-0 p-4 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="profileName">Name: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.name}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="5" xs="5" className="m-0 p-0" data-testid="Surname"><b>Surname: </b>
                                    </Col>
                                    <Col sm="7" xs="7" className="m-0 p-0">{client.surname}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="Email">Email: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.email}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="Role">Role: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.role}
                                    </Col>
                                </Row>

                            </Col>
                            <Col sm="6" xs="6" className=" m-0 p-0">
                                <Row className="m-0 p-4 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="Phone">Phone: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.phone === null ? "NaN" : client.phone}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="5" xs="5" className="m-0 p-0"><b data-testid="Address">Address: </b>
                                    </Col>
                                    <Col sm="7" xs="7" className="m-0 p-0">{client.address}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="City">City: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.city}
                                    </Col>
                                </Row>
                                <Row className="m-0 p-4 pt-0 pb-2">
                                    <Col sm="4" xs="4" className="m-0 p-0"><b data-testid="Country">Country: </b>
                                    </Col>
                                    <Col sm="8" xs="8" className="m-0 p-0">{client.country}
                                    </Col>
                                </Row>

                            </Col>
                            <Row className="py-2"></Row>
                            <br></br>
                            <Row className="m-0 p-4 pt-0 pb-0">
                                <Col xs="2" sm="2" className="m-0 p-0 mt-1"><b data-testid="Wallet">Wallet: </b>
                                </Col>
                                <Col xs="3" sm="3" className="m-0 p-0 mt-1">{client.wallet + " €"}
                                </Col>
                                <Col xs="1" sm="1" className="m-0 p-0" fluid="true">
                                    <Button className="bg-transparent border-white text-dangers border-0 no_shadow p-0 m-0 mt-0 mb-0" onClick={() => { setText("add"); setShowMod(true) }}>
                                        <Image data-testid="plus" height={"75%"} width={"100%"} src={plus} className="m-0 mt-0 mb-0 p-2 pt-0 border-0" fluid />
                                    </Button>
                                </Col>
                                <Col xs="1" sm="1" className="m-0 p-0" fluid="true">
                                    <Button className="bg-transparent border-white  border-0 no_shadow   p-0 m-0 mt-0 mb-0" onClick={() => { setText("subtract"); setShowMod(true) }}>
                                        <Image data-testid="minus" height={"75%"} width={"100%"} src={minus} className="m-0 mt-0 mb-0 p-2 pt-0" fluid />
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Row>
                    </Col>
                </Row>

                <hr className="text-black mt-5 mb-4" style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: '0',
                    borderTop: '1px solid rgba(0, 0, 0, 1)'
                }} />
                <h3 testid="header" className="text-black text-center" data-testid="Orders">Orders</h3>

                {!reqUpdate && <MyOrders dim={1} setUser={props.setUser} user={client.id} full={1} />}
                <Row>
                    <Col sm="4" xs="4"></Col>
                    <Col sm="4" xs="4">
                        <Button size="lg" className="btn-danger p-2 w-100 mt-3 radius_button mb-3" onClick={() => setGoBack(true)} data-testid="Back">Back</Button>
                    </Col>
                    <Col sm="4" xs="4"></Col>
                </Row>
                <MyModal show={showMod} setShow={setShowMod} id={id} wallet={client.wallet} setUpdate={setReqUpdate} text={text}></MyModal>
            </Container>

        </Col>
    );
}

function MyModal(props) {
    const [amount, setAmount] = useState("")
    const [trigger, setTrigger] = useState(false)
    const [error, setError] = useState()

    let notShow = props.setShow

    useEffect(() => {
        //insert survey with the list of questions
        const updateWallet = async () => {
            const response = await fetch('/api/clients/' + props.id + '/wallet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(send_obj)
            });
            if (response.status === 500) {
                console.log(response.err);
            }
        }
        //set up the data to be send by the post
        let new_amount = 0
        if (props.text === "add") {
            new_amount = Number(props.wallet) + Number(amount)
        }
        else {
            new_amount = Number(props.wallet) - Number(amount)
        }
        let send_obj = { "wallet": new_amount }
        if (trigger) {
            if (new_amount < 0) {
                setError("The new amount would be negative!")

            }
            else if (amount < 0) {
                setError("Cannot set a negative value")
            }
            else {
                updateWallet()
                setAmount("")
                setTrigger(false)
                notShow(false)
                setError(undefined)
            }

        }
    }, [trigger, amount, props.id, props.wallet, props.text, notShow]);

    const handleAmount = (event) => { setAmount(event.target.value); };

    return (
        <Modal show={props.show} className="p-4">
            <Container className=" w-100 p-4">
                Select the amount to {props.text}:
                <Form className="m-0 mt-3 mb-3">
                    <FormControl type="number" placeholder="€" value={amount} onChange={handleAmount}></FormControl>
                </Form>
                {
                    error ? <Badge bg="danger" pill>{error}</Badge> : <></>
                }
                <Row className="p-3 pb-1">
                    <Col sm="5"><Button size="lg" variant="danger" className="p-auto m-0 w-100 radius_button" onClick={() => { props.setShow(false); setAmount(""); setError(undefined) }}>Delete</Button></Col>
                    <Col sm="2"></Col>
                    <Col sm="5"><Button size="lg" variant="success" className="p-auto m-0 w-100 radius_button" onClick={() => { setTrigger(true); setAmount(amount); props.setUpdate(true) }}>Confirm</Button></Col>

                </Row>

            </Container>
        </Modal>
    );
}


export default MySingleClient;
