import { useState, useEffect } from "react";
import { Button, Col, Row, Modal, Form, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {  Navigate } from 'react-router-dom';
import { useParams } from "react-router";

import './MyNavBar.css';
import API from "./API";


function MySingleClient(props) {
    const [goBack, setGoBack] = useState(false);
    const [client, setClient] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true)
    const [showMod, setShowMod] = useState(false)


    const { id } = useParams();

    useEffect(() => {
        if (reqUpdate) {
            API.loadClient(id).then((c) => {
                if (c.error === undefined) {
                    setClient(c);
                    setReqUpdate(false);
                }
                else {
                }
            }).catch((err) => {
            });
        }
    }, [reqUpdate, id]);

    if (goBack) {
        return (<Navigate to="/employee/clients"></Navigate>)
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
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white"><b>Wallet: </b></h2>
                    </Col>
                    <Col sm="2" className="m-0 p-0"><h2 className="text-white">{client.wallet + " €"}</h2>
                    </Col>
                    <Col sm="2" className="m-0 p-0" fluid="true">
                    <Button className="bg-transparent border border-dark p-0 m-4 mt-0 mb-0" onClick={()=>setShowMod(true)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-plus-circle text-info m-0 p-0 mt-0 mb-0" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg></Button>
                    </Col>
                </Row>
                <Row className="text-center justify-content-center"><Button size="lg" className="btn-danger p-2 w-50 mt-3" onClick={() => setGoBack(true)}>Back</Button></Row>
                <MyModal show={showMod} setShow={setShowMod} id={id} wallet={client.wallet} setUpdate={setReqUpdate}></MyModal>
            </Container>

        </>
    );
}

function MyModal(props) {
    const [amount, setAmount] = useState("")
    const [trigger, setTrigger]= useState(false)

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
        let new_amount = Number(props.wallet) + Number(amount)
        let send_obj = {"wallet": new_amount}  
        if(trigger){
            updateWallet()
            setAmount("")
            setTrigger(false)
            
        }
    }, [trigger, amount, props.id, props.wallet]);

    const handleAmount = (event) => { setAmount(event.target.value); };

    return (
        <Modal show={props.show} className="p-4">
            <Container className="bg-dark w-100 p-4">
                <h3 className="text-white text-left">Select the amount to add:</h3>
                <Form className="m-0 mt-3 mb-3">
                    <FormControl type="number" placeholder="€" value={amount} onChange={handleAmount}></FormControl>
                </Form>
                <Row className="p-3 pb-1">
                    <Col sm="5"><Button size="lg" variant="danger" className="p-auto m-0 w-100" onClick={()=>{props.setShow(false); setAmount("")}}>Delete</Button></Col>
                    <Col sm="2"></Col>
                    <Col sm="5"><Button size="lg" variant="success" className="p-auto m-0 w-100" onClick={()=>{setTrigger(true); setAmount(amount); props.setShow(false); props.setUpdate(true)}}>Confirm</Button></Col>
                
                </Row>
            </Container>
        </Modal>
    );
}


export default MySingleClient;
