import Col from "react-bootstrap/Col"
import { Link } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";
import MyClock from "./MyClock";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ListGroup, Button, Row, Modal } from 'react-bootstrap'


function LeftManager(props) {

    let filters = ["Unretrieved Orders"];

    return (
        <Col sm={3} className="d-none d-xl-block d-lg-block d-md-block below-nav vheight-100 leftBG " id="navbarTogglerDemo01" >

            <ListGroup variant="flush" className=" p-2 m-2 mt-0 mb-0 mr-0 pt-0 pb-0">
                {filters.map(
                    (x) => {
                        return (<FilterRow filterName={x} fil={props.fil} setFil={props.setFil} key={x} />)
                    })
                }
                <MyModal data-testid="modalTime" setShow={props.setShowModal} show={props.showModal} setClock={props.setClock} clock={props.clock}></MyModal>

            </ListGroup>
        </Col>
    );
}

function MyModal(props) {
    const updateClock = (new_value) => {
        API.setClock(moment(new_value).format('YYYY-MM-DD HH:mm')).then((response) => {
            if (response.error === undefined) {
                props.setClock(() => moment(new_value));
            }
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
                <Row className="m-0 p-0" data-testid="">
                    <MyClock value={value} setValue={setValue} clock={props.clock} />
                    <Row className="w-100 m-0 p-0 mt-3" data-testid="">
                        <Col xs={1} sm={1} data-testid=""></Col>
                        <Col xs={4} sm={4} data-testid="">
                            <Button onClick={() => { setValue(() => new Date(props.clock)); props.setShow(false) }} variant="danger" className="button radius_button w-100">Abort</Button>
                        </Col>
                        <Col xs={2} sm={2} data-testid=""></Col>
                        <Col xs={4} sm={4} data-testid="">
                            <Button onClick={() => { updateClock(value); props.setShow(false) }} variant="success" className="button add_btn w-100">Confirm</Button>
                        </Col>
                        <Col xs={1} sm={1} data-testid=""></Col>

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
    if (props.filterName === "Unretrieved Orders") {
        path = "unretrievedOrders"
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up m-2 mt-1 ml-3" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
        </svg>
    }
    else {
        path = props.filterName.toLowerCase()
    }
    return (<ListGroup.Item as={Link} to={"/manager/" + path} data-testid={path} onClick={(e) => { props.setFil(props.filterName) }} action active={active} className="leftButton ">
        {icon}
        {props.filterName}
    </ListGroup.Item>);
}



export default LeftManager;
