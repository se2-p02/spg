import { ListGroup, Col, Row, Button, Modal } from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";
import MyClock from "./MyClock";
import moment from "moment";

function LeftWWorker(props) {

    let filters = ["Available Orders"];


    return (
        <Col sm={3} className="d-none d-xl-block d-lg-block d-md-block below-nav vheight-100 leftBG " id="navbarTogglerDemo01" data-testid = "col lww">

            <ListGroup variant="flush" className=" p-2 m-2 mt-0 mb-0 mr-0 pt-0 pb-0" data-testid = "listg ww">
                {filters.map(
                    (x) => {
                        return (<FilterRow filterName={x} fil={props.fil} setFil={props.setFil} key={x} />)
                    })
                }
            </ListGroup>
            <MyModal data-testid="modalTime" setShow={props.setShowModal} show={props.showModal} setClock={props.setClock} clock={props.clock}></MyModal>
        </Col>
    );
}

function MyModal(props) {

    const [value, setValue] = useState();

    const updateClock = (v) => {
        API.setClock(moment(v).format('YYYY-MM-DD HH:mm')).then((response) => {
            if (response.error === undefined) props.setClock(() => moment(v));
        });
    };

    useEffect(() => {
        if (props.clock) {
            setValue(() => new Date(props.clock));
        }
    }, [props.clock]);

    return (
        <Modal show={props.show} className="mt-5 m-0">
            <Modal.Header className="m-0 p-2"><h3>Please, select the date and time</h3></Modal.Header>
            <Modal.Body>
                <Row className="m-0 p-0" data-testid = "row ww">
                    <MyClock value={value} setValue={setValue} clock={props.clock} />
                    <Row className="w-100 m-0 p-0 mt-3" data-testid = "ro2 wworker">
                        <Col xs={1} sm={1} data-testid = "col ww"></Col>
                        <Col xs={4} sm={4}>
                            <Button onClick={() => { setValue(() => new Date(props.clock)); props.setShow(false) }} variant="danger" className="button radius_button w-100" data-testid = "abort ww">Abort</Button>
                        </Col>
                        <Col xs={2} sm={2} data-testid = "col 2 wwork"></Col>
                        <Col xs={4} sm={4} data-testid = "c">
                            <Button onClick={() => { updateClock(value); props.setShow(false) }} variant="success" className="button add_btn w-100" data-testid = "confirm ww">Confirm</Button>
                        </Col>
                        <Col xs={1} sm={1}></Col>

                    </Row>
                </Row>

            </Modal.Body>
        </Modal>
    )
}


function FilterRow(props) {

    let active = false;
    let path = ""
    let icon

    if (props.fil === props.filterName) {
        active = true;
    }
    if (props.filterName === "Available Orders") {
        path = "notAvailableOrders"
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-list m-2" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
        </svg>
    }
    else {
        path = props.filterName.toLowerCase()
    }
    return (<ListGroup.Item as={Link} to={"/wworker/" + path} data-testid={path} onClick={(e) => { props.setFil(props.filterName) }} action active={active} className="leftButton ">
        {icon}
        {"  " + props.filterName}
    </ListGroup.Item>);
}



export default LeftWWorker;
