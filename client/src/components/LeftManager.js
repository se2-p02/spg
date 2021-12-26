import { ListGroup } from 'react-bootstrap'
import React from "react";
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import './MyNavBar.css';
import API from "./API";


function LeftManager(props) {

    let filters = ["Unretrieved orders"];

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
    if (props.filterName === "Unretrieved orders") {
        path = "unretrievedOrders"
        icon = <img src="https://img.icons8.com/external-prettycons-lineal-prettycons/20/000000/external-stats-business-and-finance-prettycons-lineal-prettycons.png"/>
    }
    else {
        path = props.filterName.toLowerCase()
    }
    return (<ListGroup.Item as={Link} to={"/manager/" + path} data-testid={path} onClick={(e) => { props.setFil(props.filterName) }} action active={active} className="leftButton ">
        {icon}
        {"  " + props.filterName}
    </ListGroup.Item>);
}



export default LeftManager;
