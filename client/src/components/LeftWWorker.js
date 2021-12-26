import { ListGroup } from 'react-bootstrap'
import React from "react";
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function LeftWWorker(props) {

    let filters = ["Available Orders"];


    return (
        <Col sm={3} className="d-none d-xl-block d-lg-block d-md-block below-nav vheight-100 leftBG " id="navbarTogglerDemo01" >

            <ListGroup variant="flush" className=" p-2 m-2 mt-0 mb-0 mr-0 pt-0 pb-0">
                {filters.map(
                    (x) => {
                        return (<FilterRow filterName={x} fil={props.fil} setFil={props.setFil} key={x} />)
                    })
                }
            </ListGroup>
        </Col>
    );
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
