import React, { useEffect, useState } from "react";
import './MyNavBar.css';
import Logo from './solidarity.png';
import { Badge, Dropdown, ListGroup, Modal, Button, Navbar, Form, Container } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import API from "./API";
import { useNavigate } from "react-router-dom";
import MyClock from "./MyClock";
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';

function MyNavBar(props) {

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleRemoveFromCart = (p) => {
        props.setCart((c) => c.filter((old) => old !== p));
    }


    const handleLogout = () => {
        API.logout().then((response) => {
            if (response.error === undefined) {
                props.setUser(undefined)
                navigate("/login");
            }
        });
    }

    const updateClock = (value) => {
        API.setClock(moment(value).format('YYYY-MM-DD HH:mm')).then((response) => {
            if (response.error === undefined) props.setClock(() => moment(value));
        });
    };

    return (

        <Navbar className="navbar navbar-dark navbar-expand-sm bg-primary fixed-top justify-content-between" expand="lg">
            {/*<Navbar.Toggle aria-controls="CollapseLeft" /> */}
            <Navbar.Brand id="lll">
                <Container className="d-flex align-items-center">
                    <img
                        alt=""
                        src={Logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />&emsp;
                    <div className="navTitle"><h2>Social Purchasing Group</h2></div>
                </Container>
            </Navbar.Brand>
            <div data-testid="clock">
                <MyClock clock={props.clock} updateClock={updateClock} setClock={props.setClock} />
            </div>
            {
                props.showCart ? <ListGroup key={"cart+logout"} data-testid="dropdown" horizontal className="p-4 pt-0 pb-0">
                    <ListGroup.Item data-testid="cart" key='cartNav' variant="primary" className="d-flex justify-content-center align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle data-testid="cartIcon" key={"dropCart"} variant="dark" className="d-flex justify-content-between align-items-start" id="cart">
                                <div className="fw-bold mx-2">Cart</div>
                                <Badge variant="primary" pill>
                                    {props.cart.length}
                                </Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                {props.cart.length !== 0 &&
                                    props.cart.map((c) => (
                                        <Dropdown.Item key={c.id + "d"}>
                                            <ListGroup key={c.id + "a"} horizontal>
                                                <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.name}</ListGroup.Item>
                                                <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity + " " + c.unit}</ListGroup.Item>
                                                <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center"><Button variant="danger" onClick={() => handleRemoveFromCart(c)}>-</Button></ListGroup.Item>
                                            </ListGroup>
                                        </Dropdown.Item>
                                    ))
                                }
                                {props.cart.length !== 0 &&
                                    <ListGroup className="mx-3">
                                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center"><Button variant="info" onClick={() => setShow(true)}>Place order</Button></ListGroup.Item>
                                    </ListGroup>
                                }
                                {props.cart.length === 0 &&
                                    <span className="mx-3" id="cartpresence">No products here</span>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                    <ListGroup.Item key='loginNav' variant="primary" className="d-flex justify-content-center align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" className="d-flex p-2" data-testid="logout">
                                <PersonCircle className="mx-2"></PersonCircle>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" id="logout">
                                <Dropdown.Item>
                                    <ListGroup.Item variant="primary" className="d-flex justify-content-center align-items-center" onClick={() => handleLogout()}>Logout</ListGroup.Item>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                </ListGroup> : <></>}
            {props.cart.length !== 0 &&
                <MyModal user={props.user} cart={props.cart} setCart={props.setCart} show={show} setShow={setShow} clock={props.clock} />
            }
        </Navbar>
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
        if (u.role !== "employee")  u = props.user.id;

        props.cart.forEach((prod) => {
            let p = {
                id: prod.id,
                quantity: prod.quantity,
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
        if (orderMethod === 'address') {
            if (!address) return setErrorMsg(() => 'You must insert an address.');
            order.address = { address: address.replace(/\n/g, " "), deliveryOn: moment(datetime).format('YYYY-MM-DD HH:mm') };
        }
        else if (orderMethod === 'store') order.address = { address: 'STORE PICKUP', deliveryOn: moment(datetime).format('YYYY-MM-DD HH:mm') };

        setErrorMsg(() => '');

        await API.sendOrder(order).then((response) => {
            if (response.error === undefined) {
                setSuccessful(true);
                props.setCart([]);
                props.setShow(false);
            }
        }).catch((response) =>{ console.log(response)});
        console.log(order);
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
            <Modal.Header closeButton>
                <Modal.Title>Place an order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.cart.map((c) => (
                    <ListGroup key={c.id + "b"} className="my-1" horizontal>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.name}</ListGroup.Item>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity + " " + c.unit}</ListGroup.Item>
                        <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">{c.quantity * c.price + " €"}</ListGroup.Item>
                    </ListGroup>
                ))
                }
                <ListGroup key={"total"} className="my-1" horizontal>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-start align-items-center">Grand total:</ListGroup.Item>
                    <ListGroup.Item variant="warning" className="d-flex w-100 justify-content-end align-items-center">
                        {props.cart.length === 1 && props.cart[0].quantity * props.cart[0].price + " €"}
                        {props.cart.length !== 1 && props.cart.reduce((a, b) => a + b.quantity * b.price, 0).toFixed(2) + " €"}</ListGroup.Item>
                </ListGroup>
                <ListGroup key={"placeOrder"} className="mx-3">
                    {ordersClosed && <p className={ordersClosed ? 'ordersClosed mt-3' : ' '}>Orders can't be placed from Sunday 23:00 to Monday 09:00.</p>}
                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">
                        <Form>
                            <Form.Check inline defaultChecked
                                type="radio"
                                name="ordergroup"
                                id="checkstore"
                                label="Pickup in store"
                                onClick={() => setOrderMethod(() => 'store')} />
                            <Form.Check inline
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

                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">
                        <Form>
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
                                        setAddress(() => client.address + ' ' + client.city + ', ' + client.country);
                                        setShowAddressForm(() => false);
                                    }} /> </>}
                            {orderMethod === 'address' && showAddressForm && <><Form.Label className="mt-3">Your complete address:</Form.Label>
                                <Form.Control className="w-100" as="textarea" cols={100} rows={3}
                                    placeholder="Please include street, number, city and country."
                                    onChange={(e) => setAddress(() => e.target.value)} /></>}

                            <Form.Label className={orderMethod === 'store' ? 'mt-0' : 'mt-3'}>Select a date and a time for the delivery:</Form.Label>
                            <DateTimePicker className="mb-2"
                                onChange={setDatetime}
                                value={datetime}
                                format='yyyy-MM-dd HH:mm'
                                required={true}
                                clearIcon={null}
                                locale='en-us'
                            />
                        </Form>
                    </ListGroup.Item>
                    {errorMsg && <p className={errorMsg ? 'ordersClosed mt-3' : ' '}>{errorMsg}</p>}
                    <ListGroup.Item variant="primary" className="d-flex w-100 justify-content-center align-items-center">
                        <Button disabled={ordersClosed} variant="info" onClick={handleSubmit}>Place order</Button>
                    </ListGroup.Item>
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