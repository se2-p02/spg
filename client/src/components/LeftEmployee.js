import { ListGroup, Button, Modal, Row } from 'react-bootstrap'
import Col from "react-bootstrap/Col"
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './MyNavBar.css';
import clients from './images/customer.png'
import carrot from './images/carrot.png'
import API from "./API";
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import MyClock from "./MyClock";


function LeftEmployee(props) {
    let filters = ["Clients", "Products", "Orders"];

    return (
        <Col sm={3} className=" d-none d-xl-block d-lg-block d-md-block below-nav vheight-100 leftBG" >

            <ListGroup variant="flush" className=" p-2 m-2 mt-0 mb-0 mr-0 pt-0 pb-0">
                {filters.map(
                    (x) => {
                        return (<FilterRow filterName={x} fil={props.fil} setFil={props.setFil} key={x} />)
                    })
                }
            </ListGroup>
            <Button variant="secondary" className="time_button text-end align-items-end m-2 p-3" onClick={() => { props.setShowModal(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                </svg>
            </Button>
            <MyModal setShow={props.setShowModal} show={props.showModal} setClock={props.setClock} clock={props.clock}></MyModal>
        </Col>
    );
}

function MyModal(props) {
    const updateClock = (value) => {
        API.setClock(moment(value).format('YYYY-MM-DD HH:mm')).then((response) => {
            if (response.error === undefined) props.setClock(() => moment(value));
        });
    };

    const [value, setValue] = useState();

    useEffect(() => {
        if (props.clock) {
            setValue(() => new Date(props.clock));
        }
    }, [props.clock]);

    return (
        <Modal show={props.show} className="mt-5 m-0">
            <Modal.Header className="m-0 p-2"><h3>Please, select the date and time</h3></Modal.Header>
            <Modal.Body>
                <Row className="m-0 p-0">
                    <MyClock value={value} setValue={setValue} clock={props.clock} />
                    <Row className="w-100 m-0 p-0 mt-3">
                        <Col xs={1} sm={1}></Col>
                        <Col xs={4} sm={4}>
                            <Button onClick={() => { setValue(() => new Date(props.clock)); props.setShow(false) }} variant="danger" className="button radius_button w-100">Abort</Button>
                        </Col>
                        <Col xs={2} sm={2}></Col>
                        <Col xs={4} sm={4}>
                            <Button onClick={() => { updateClock(value); props.setShow(false) }} variant="success" className="button add_btn w-100">Confirm</Button>
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
    let icon


    if (props.fil === props.filterName) {
        active = true;
    }
    if (props.filterName === "Clients") {
        icon = <img
            alt=""
            src={clients}
            width="20"
            height="20"
            className="m-2"
        />
    }
    if (props.filterName === "Products") {
        icon = <img
            alt=""
            src={carrot}
            width="20"
            height="20"
            className="m-2"
        />
    }
    if (props.filterName == "Orders") {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-checklist m-2" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
        </svg>
    }
    return (<ListGroup.Item as={Link} to={"/employee/" + props.filterName.toLowerCase()} data-testid={props.filterName.toLowerCase()} onClick={(e) => { props.setFil(props.filterName) }} action active={active} className="leftButton ">
        {icon}
        {" " + props.filterName}</ListGroup.Item>);
}



export default LeftEmployee;
