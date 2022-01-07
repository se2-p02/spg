import React, { useEffect, useState } from "react";
import './MyNavBar.css';
import Logo from './images/solidarity_dark.png';
import { Badge, Dropdown, ListGroup, Modal, Button, Navbar, Form, Container, Row, Col, Nav } from "react-bootstrap";
import API from "./API";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import DateTimePicker from 'react-datetime-picker';

function MyNavBar(props) {

    const [show, setShow] = useState(false);


    const navigate = useNavigate();

    const handleRemoveFromCart = (p) => {
        props.setCart((c) => c.filter((old) => old !== p));
        //update the product table **quantity field**
        API.updateProductQuantity(p).then((response) => {
            if (response.error === undefined) {
                console.log("quantity updated")
            }
        });
    }

    const handleLogout = () => {
        API.logout().then((response) => {
            if (response.error === undefined) {
                props.setUser(undefined)
                props.setFil(undefined)
                navigate("/login");
            }
        });
    }

    

    return (
        <>
            <Navbar className="navbar navbar-expand-md nav-color fixed-top justify-content-between m-0 p-0" expand="md">
                {/*<Navbar.Toggle aria-controls="CollapseLeft" /> */}

                <Row className="m-0 pt-3 pb-3 w-100 align-items-center">

                    <Col md="5" sm="2" xs="2" className="align-items-center text-black">
                        <Navbar.Toggle className={props.fil ? "" : "d-none"} aria-controls="responsive-navbar-nav" ></Navbar.Toggle>

                        <Navbar.Brand id="lll" className="align-items-center d-none d-xs-none d-sm-none d-xl-block d-lg-block d-md-block">
                            <Container className="d-flex align-items-center pt-0">
                                <img
                                    alt=""
                                    src={Logo}
                                    width="50"
                                    height="50"
                                />&emsp;
                                <div className=" text-black " data-testid="name"><h1 className="title_font"><b>Social Purchasing Group</b></h1></div>
                            </Container>
                        </Navbar.Brand></Col>
                    <Col md="3" sm="6" xs="6" className="align-items-center text-black text-center" >

                        <></>
                    </Col>
                    <Col md="4" sm="4" xs="4" className=" d-flex flex-row-reverse d-flex align-items-center">
                        <div className="d-flex m-3 mt-0 mb-0 text-end justify-content-end">
                            {props.showCart &&
                                <Dropdown>
                                    <Dropdown.Toggle data-testid="cartIcon" key={"dropCart"} variant="white" className="bg-transparent p-0 m-0 no_shadow" id="cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart p-2 no_shadow" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        <Badge variant="black" className="bg-dark text-white m-0" pill>
                                            {props.cart.length}
                                        </Badge>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end" className="text-center">
                                        {props.cart.length !== 0 &&
                                            props.cart.map((c) => (
                                                <Dropdown.Item key={c.id + "d"}>
                                                    <ListGroup key={c.id + "a"} horizontal>

                                                        <ListGroup.Item variant="secondary" className="d-flex w-100 align-items-center">{c.name}</ListGroup.Item>
                                                        <ListGroup.Item variant="secondary" className="d-flex w-100 align-items-center">{c.quantity + " " + c.unit}</ListGroup.Item>
                                                        <ListGroup.Item variant="secondary" className="d-flex w-100 align-items-center"><Button className="p-2 pt-1 pb-1 no_shadow" data-testid="removeBtn" variant="danger" onClick={() => handleRemoveFromCart(c)}>-</Button></ListGroup.Item>
                                                    </ListGroup>
                                                </Dropdown.Item>
                                            ))
                                        }
                                        {props.cart.length !== 0 &&

                                            <Button variant="success" onClick={() => setShow(true)} className="add_btn mt-2">Place order</Button>

                                        }
                                        {props.cart.length === 0 &&
                                            <span className="m-auto" id="cartpresence">No products here</span>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>}


                            {props.account ?
                                <Dropdown className="no_bord no_shadow">
                                    <Dropdown.Toggle className="d-flex p-2 bg-transparent no_bord no_shadow" data-testid="userImg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" className="bi bi-person-fill text-dark no_bord no_shadow" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end" id="logout" className="bg-white">
                                        <Dropdown.Item className="text-center">
                                            <Button variant="danger" className="w-100 m-0 radius_button " onClick={() => handleLogout()}>Logout</Button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                : <></>}
                        </div></Col>
                    {props.fil && <Navbar.Collapse id="responsive-navbar-nav" className="mt-0">
                        <Nav className="d-block d-sm-block d-xs-block d-md-none text-center nav-color">
                            <ListGroup variant="flush" className="mt-3 ">
                                {props.fil.map(x => {
                                    return (<ListGroup.Item className="bg_login2 m-0  p-2 rounded"><Nav.Link href={x.toLowerCase()} className="p-0 m-0"><h5 className="p-0 m-0">{x}</h5></Nav.Link></ListGroup.Item>
                                    )
                                })}

                                <ListGroup.Item as={Button} variant="danger" onClick={() => { props.setShowModal(true) }} className="bg_login2 m-0 mt-3 no_shadow clock_collapse p-2 rounded"><h5 className="p-0 m-0">Clock</h5></ListGroup.Item>
                            </ListGroup>
                        </Nav>
                    </Navbar.Collapse>
                    }
                </Row>



                {props.cart.length !== 0 &&
                    <MyModal setModify={props.setModify} orderId={props.orderId} modify={props.modify} user={props.user} cart={props.cart} setCart={props.setCart} show={show} setShow={setShow} clock={props.clock} />
                }
            </Navbar>
            <Button data-testid="clockButton" variant="secondary" className="time_button text-end align-items-end m-2 p-3" onClick={() => { props.setShowModal(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                </svg>
            </Button>
        </>
    );
}

function MyModal(props) {

    const [successful, setSuccessful] = useState(false);
    const [ordersClosed, setOrdersClosed] = useState(true);
    const [orderMethod, setOrderMethod] = useState('store');
    const [address, setAddress] = useState('');
    const [datetime, setDatetime] = useState();
    const [client, setClient] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(true);

    const handleClose = () => {
        setSuccessful(false);
        setOrderMethod('store');
        setAddress('');
        setDatetime(null);
        setClient();
        setErrorMsg('');
        setShowAddressForm(true);
        props.setShow(false);
    }

    const handleSubmit = async () => {
        let order;
        let products = [];
        let u = undefined;
        if (props.user.role !== "employee") u = props.user.id;

        props.cart.forEach((prod) => {
            let p = {
                id: prod.id,
                quantity: prod.quantity,
                unit: prod.unit,
                price: prod.price,
                farmer: prod.farmer,
                status: 0,
                name: prod.name

            }
            products.push(p)
        });
        order = {
            products: products,
            amount: props.cart.reduce((a, b) => a + b.quantity * b.price, 0).toFixed(2),
            address: undefined,
            user: u,
            paid: 0
        }

        if (props.cart.length === 1) {
            order.amount = props.cart[0].quantity * props.cart[0].price;
        }
        if (!datetime || moment(datetime).isBefore(props.clock)) return setErrorMsg(() => 'You must insert a valid date and time for the delivery.');
        if (moment(datetime).day() !== 3 && moment(datetime).day() !== 4 && moment(datetime).day() !== 5)
            return document.getElementById('date_wetofr').style.color = 'red';
        if (orderMethod === 'address') {
            if (!address) return setErrorMsg(() => 'You must insert an address.');
            order.address = { address: address.replace(/\n/g, " "), deliveryOn: moment(datetime).format('YYYY-MM-DD HH:mm') };
        }
        else if (orderMethod === 'store') order.address = { address: 'STORE PICKUP', deliveryOn: moment(datetime).format('YYYY-MM-DD HH:mm') };

        setErrorMsg(() => '');
        console.log(props.modify)
        if (props.modify) {
            await API.modifyOrder(props.orderId, order).then((response) => {
                if (response.error === undefined) {
                    setSuccessful(true);
                    props.setCart([]);
                    props.setShow(false);
                    props.setModify(false)
                }
            }).catch((response) => { console.log(response) });
            console.log(order);
        } else {
            await API.sendOrder(order).then((response) => {
                if (response.error === undefined) {
                    setSuccessful(true);
                    props.setCart([]);
                    props.setShow(false);
                }
            }).catch((response) => { console.log(response) });
            console.log(order);
        }


    }

    useEffect(() => {
        const datetime = moment(props.clock.format('YYYY-MM-DD HH:mm'));
        setOrdersClosed(() => (datetime.day() === 0 && datetime.hour() === 23) || (datetime.day() === 1 && (datetime.hour() >= 0 && datetime.hour() <= 8)));
    }, [props.clock]);

    return (
        <Modal
            {...props}
            size="auto"
            aria-labelledby="contained-modal-title-vcenter"
            show={props.show}
            onHide={handleClose}
        >

            <Modal.Body data-testid="orderBody">
                <h4 className="text-center mt-3">Summary</h4>
                <ListGroup className="my-1" variant="flush">
                    {props.cart.map((c) => (
                        <ListGroup.Item>
                            <Row>
                                <Col sm="4 text-center"><b>{c.name}</b></Col>
                                <Col sm="4 text-center">{c.quantity + " " + c.unit}</Col>
                                <Col sm="4 text-center">{c.quantity * c.price + " €"}</Col>
                            </Row>
                        </ListGroup.Item>

                    ))
                    }
                    <ListGroup.Item className="text-end p-5 pt-2 pb-2"><b>{props.cart.length === 1 && props.cart[0].quantity * props.cart[0].price + " €"}
                        {props.cart.length !== 1 && props.cart.reduce((a, b) => a + b.quantity * b.price, 0).toFixed(2) + " €"}</b></ListGroup.Item>
                </ListGroup>
                <br />
                <h4 className="text-center pb-2">Delivery</h4>

                <ListGroup key={"placeOrder"} className="mx-3">
                    {ordersClosed && <p className={ordersClosed ? 'ordersClosed mt-3' : ' '}>Orders can't be placed from Sunday 23:00 to Monday 09:00.</p>}
                    <ListGroup.Item className="d-flex bg_login2 w-100 justify-content-center align-items-center">
                        <Form data-testid="methodForm">
                            <Form.Check inline defaultChecked
                                type="radio"
                                name="ordergroup"
                                id="checkstore"
                                label="Pickup in store"
                                onClick={() => setOrderMethod(() => 'store')} />
                            <Form.Check inline data-testid="addressCheck"
                                type="radio"
                                name="ordergroup"
                                id="checkdelivery"
                                label="Deliver to address"
                                onClick={() => {
                                    if (!client) API.loadClient(props.user.id).then((c) => { if (c.error === undefined) setClient(c); });
                                    setOrderMethod(() => 'address');
                                }} />
                        </Form>
                    </ListGroup.Item>

                    <ListGroup.Item className="d-flex w-100 bg_login2 justify-content-center align-items-center">
                        <Form data-testid="orderForm">
                            {orderMethod === 'address' && <><Form.Check defaultChecked
                                type="radio"
                                name="addressgroup"
                                id="checkspec"
                                label="Specify an address"
                                onClick={() => {
                                    setAddress(() => '');
                                    setShowAddressForm(() => true);
                                }} />
                                <Form.Check
                                    type="radio"
                                    name="addressgroup"
                                    id="checkdefadd"
                                    disabled={client ? client.address ? false : true : true}
                                    label="Deliver to registered address"
                                    onClick={() => {
                                        if (client && client !== null && client.address && client.city && client.country) {
                                            setAddress(() => client.address + ' ' + client.city + ', ' + client.country);
                                        }
                                        setShowAddressForm(() => false);
                                    }} /> </>}
                            {orderMethod === 'address' && showAddressForm && <><Form.Label className="mt-3">Your complete address:</Form.Label>
                                <Form.Control as="textarea" cols={100} rows={2} data-testid="addressBox" className="radius_button_small w-100"
                                    placeholder="Please include street, number, city and country."
                                    onChange={(e) => setAddress(() => e.target.value)} /></>}

                            <Form.Label className={orderMethod === 'store' ? 'mt-0' : 'mt-3'}>Select a date and a time for the {orderMethod === 'store' ? 'pickup' : 'delivery'}:</Form.Label>
                            <DateTimePicker className="mb-2"
                                onChange={setDatetime}
                                value={datetime}
                                format='yyyy-MM-dd HH:mm'
                                required={true}
                                clearIcon={null}
                                locale='en-us'
                            />
                            <h6 id="date_wetofr">Deliveries and Pickups are available from Wednesday to Friday.</h6>
                        </Form>
                    </ListGroup.Item>
                    {errorMsg && <p data-testid="errorMsg" className={errorMsg ? 'ordersClosed mt-3' : ' '}>{errorMsg}</p>}
                    <div className="mt-3 w-100 text-center">
                        <Button data-testid="orderButton" disabled={ordersClosed} className="add_btn w-50" onClick={handleSubmit}>Place order</Button>
                    </div>
                </ListGroup>
                {successful &&
                    <ListGroup key={"orderPlaced"} className="mx-3">
                        <ListGroup.Item variant="success" className="d-flex w-100 justify-content-center align-items-center">Order successfully submitted</ListGroup.Item>
                    </ListGroup>
                }
            </Modal.Body>
        </Modal>
    );
}




export default MyNavBar;
