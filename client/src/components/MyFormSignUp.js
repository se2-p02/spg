import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Navigate } from 'react-router-dom';
import API from "./API";
import './MyNavBar.css';


function MyFormSignUp(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [repeat, setRepeat] = useState("");

    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessageFields, setErrorMessageFields] = useState("");
    const [goBack, setGoBack] = useState(false);
    const [registered, setRegistered] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");

    function resetForm() {
        setErrorMessageEmail(() => "");
        setErrorMessagePassword(() => "");
    }

    if (goBack) {
        if (props.user === undefined) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        return (<Navigate to={"/" + props.user.name}></Navigate>)
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        var r = false;
        if (!checkFields()) r = true;
        if (!checkEmail(email)) r = true;
        if (!checkPassword(password, repeat)) r = true;
        if (!checkNumber()) r = true;

        // inserted to check each time all the fields
        if (r) return;

        resetForm();
        API.addNewUser(name, surname, password, email, phoneNumber, city, address, country).then((response) => {
            if (response.error === undefined) {
                setErrorMessageFields("");
            } else {
                setErrorMessageFields(response.error);
            }
        });
        setRegistered(true);
    }

    function checkNumber() {
        if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            setErrorNumber("Insert a valid phone number");
            return false;
        }
        else {
            setErrorNumber("");
            return true;
        }
    }

    function checkFields() {
        if (name === "" || password === "" || repeat === "" || email === "" || surname === "" || phoneNumber === "" || country === "" || city === "" || address === "") {
            setErrorMessageFields("Fill all the fields of the form")
            return false;
        }
        else {
            setErrorMessageFields("")
            return true;
        }
    }

    function checkEmail(email_rec) {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(re.test(email_rec))) {
            setErrorMessageEmail((e) => {
                return "The email is not valid";
            })
            return false;
        }
        else {
            setErrorMessageEmail((e) => {
                return "";
            })
            return true;
        }
    }


    function checkPassword(password_to_check, repeat_to_check) {
        if (password_to_check !== repeat_to_check) {
            setErrorMessagePassword((e) => {
                return "The password is different";
            })
            return false;
        }
        else {
            setErrorMessagePassword((e) => {
                return "";
            })
            return true;
        }
    }

    function handleGoBack() {
        setRegistered(false);
        setGoBack(true);
    }

    return (
        <>
            <Container className="bg_login min-height-100 justify-content-center align-items-center below-nav text-center p-0 pt-5 " fluid>
                {registered === true && (
                    <>
                        <h1 className="text-black text-center mt-5 pt-5">User Registered Successfully!</h1>
                        <Row className="justify-content-center m-0 p-0 w-100 pt-5 mt-5 mb-5">
                            <Col lg={1} />
                            <Col className=" m-0 p-0" sm={5} lg={3}>
                                <Button
                                    size="lg"
                                    variant="danger"
                                    type="submit"
                                    className="w-100 m-0 p-2"
                                    onClick={() => handleGoBack()}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col sm={2} />
                            <br />
                            <Col className=" m-0 p-0" sm={5} lg={3}>
                                <Button
                                    size="lg"
                                    variant="success"
                                    type="submit"
                                    className="w-100 m-0 p-2"
                                    onClick={() => setRegistered(false)}
                                >
                                    Register another user
                                </Button>
                            </Col>
                            <Col lg={1} />
                        </Row>
                        <h1>User registration completed!</h1>

                    </>
                )}
                {registered === false && (
                    <>
                        <Row className="mt-4">
                            <Col xs="2" sm="2" md="3"></Col>
                            <Col xs="8" sm="8" md="6" className="mb-3 p-5 pt-0 pb-0 mt-5 border radius_button bg-white" >
                                <Form className="pt-2 p-0 m-0 mt-0" >
                                    <Row className="mt-2">
                                        <Col sm="6">
                                            <Form.Group controlId="name">
                                                <Form.Label className="text-black w-100 p-0 m-0"><h6>Name</h6></Form.Label>
                                                <Form.Control
                                                    className="w-100 p-2"
                                                    type="name"
                                                    placeholder="Name"
                                                    required
                                                    onChange={(ev) => { setName(ev.target.value); }}
                                                    value={name}
                                                />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col sm="6">
                                            <Form.Group controlId="surname">
                                                <Form.Label className="text-black w-100 p-0 m-0"><h6>Surname</h6></Form.Label>
                                                <Form.Control
                                                    className="w-100 p-2"
                                                    type="name"
                                                    placeholder="Surname"
                                                    required
                                                    onChange={(ev) => { setSurname(ev.target.value); }}
                                                    value={surname}
                                                />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                                <Form className="pt-3 p-0 m-0">
                                    <Row>
                                        <Col sm={12}>
                                            <Form.Group controlId="email">
                                                <Form.Label className="text-black p-0 pt-2 m-0"><h6>Email</h6></Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    className="w-100 p-2 m-0"
                                                    placeholder="Email"
                                                    required
                                                    onChange={(ev) => { setEmail(ev.target.value); }}
                                                    value={email}
                                                />
                                                {errorMessageEmail.length !== 0 && (
                                                    <div
                                                        className="alert alert-danger alert-float-static fade show p-1"
                                                        role="alert"
                                                    >
                                                        {errorMessageEmail}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                                <Form className="pt-3 p-0 m-0">
                                    <Row>
                                        <Col sm="6">
                                            <Form.Group controlId="Password">
                                                <Form.Label className="text-black pt-2  m-0"><h6>Password</h6></Form.Label>
                                                <InputGroup>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        className="p-2"
                                                        placeholder="Password"
                                                        required
                                                        onChange={(ev) => { setPassword(ev.target.value); }}
                                                        value={password}
                                                    />
                                                    <Button variant="secondary" onClick={() => setShowPassword((sp) => !sp)}>{showPassword ? <EyeSlashFill size="27" /> : <EyeFill size="27" />}</Button>
                                                </InputGroup>
                                            </Form.Group>
                                            {errorMessagePassword.length !== 0 && (
                                                <div
                                                    className="alert alert-danger alert-float-static fade show"
                                                    role="alert"
                                                    data-testid = "alert password"
                                                >
                                                    {errorMessagePassword}
                                                </div>
                                            )}
                                        </Col>
                                        <Col sm="6">
                                            <Form.Group controlId="repeatPassword">
                                                <Form.Label className="text-black p-0 pt-2  m-0 "><h6>Repeat Password</h6></Form.Label>
                                                <InputGroup>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        className="p-2"
                                                        placeholder="Repeat Password"
                                                        required
                                                        onChange={(ev) => { setRepeat(ev.target.value) }}
                                                        value={repeat}
                                                    />
                                                    <Button variant="secondary" onClick={() => setShowPassword((sp) => !sp)}>{showPassword ? <EyeSlashFill size="27" /> : <EyeFill size="27" />}</Button>
                                                </InputGroup>
                                            </Form.Group>
                                            {errorMessagePassword.length !== 0 && (
                                                <div
                                                    className="alert alert-danger alert-float-static fade show"
                                                    role="alert"
                                                >
                                                    {errorMessagePassword}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </Form>
                                <Form className="pt-3 p-0 m-0">
                                    <Row>
                                        <Col sm="6">
                                            <Form.Group controlId="number">
                                                <Form.Label className="text-black p-0 pt-2  m-0"><h6>Phone Number</h6></Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    className="w-100 p-2"
                                                    placeholder="Phone number"
                                                    required
                                                    onChange={(ev) => { setPhoneNumber(ev.target.value) }}
                                                    value={phoneNumber}
                                                />
                                            </Form.Group>
                                            {errorNumber.length !== 0 && (
                                                <div
                                                    className="alert alert-danger alert-float-static fade show p-0"
                                                    role="alert"
                                                >
                                                    {errorNumber}
                                                </div>

                                            )}
                                        </Col>
                                        <Col sm="6">
                                            <Form.Group controlId="country">
                                                <Form.Label className="text-black p-0 pt-2  m-0"><h6>Country</h6></Form.Label>
                                                <Form.Control
                                                    className="w-100 p-2"
                                                    placeholder="Country"
                                                    required
                                                    onChange={(ev) => { setCountry(ev.target.value) }}
                                                    value={country}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                                <Form className="pt-3 p-0 m-0">
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="city">
                                                <Form.Label className="text-black p-0 pt-2  m-0"><h6>City</h6></Form.Label>
                                                <Form.Control
                                                    className="w-100 p-2"
                                                    placeholder="City"
                                                    required
                                                    onChange={(ev) => { setCity(ev.target.value) }}
                                                    value={city}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="address">
                                                <Form.Label className="text-black p-0 pt-2  m-0"><h6>Address</h6></Form.Label>
                                                <Form.Control
                                                    className="w-100 p-2"
                                                    placeholder="Address"
                                                    required
                                                    onChange={(ev) => { setAddress(ev.target.value) }}
                                                    value={address}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Row className="m-0 mt-3">
                                            <Col>
                                                <Row className="pt-2 mb-3">
                                                    <Col sm={5} className="text-left m-0 p-0">

                                                        <Button
                                                            size="lg"
                                                            variant="danger"
                                                            type="submit"
                                                            className="w-100 m-0 radius_button"
                                                            onClick={() => setGoBack(true)}
                                                        >
                                                            Back
                                                        </Button>
                                                    </Col>
                                                    <Col sm={2}></Col>
                                                    <br />
                                                    <Col sm={5} className="text-right m-0 p-0">
                                                        <Button data-testid="formBtn"
                                                            size="lg"
                                                            variant="success"
                                                            type="submit"
                                                            className="w-100 mr-5 add_btn"
                                                            onClick={(ev) => handleSubmit(ev)}
                                                        >
                                                            Register
                                                        </Button>
                                                    </Col>
                                                    <br />
                                                    {errorMessageFields.length !== 0 && (
                                                        <div
                                                            className="alert alert-danger alert-float-static fade show mt-4 p-2"
                                                            role="alert"
                                                        >
                                                            {errorMessageFields}
                                                        </div>
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Form>
                            </Col>
                            <Col xs="2" sm="2" md="3"></Col>

                        </Row>


                    </>)}
            </Container>
        </>
    );
}

export default MyFormSignUp;