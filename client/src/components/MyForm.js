import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Navigate} from 'react-router-dom';
import API from "./API";


function MyForm() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessageFields, setErrorMessageFields] = useState("");
    const [goBack, setGoBack] = useState(false);

    function resetForm() {
        setErrorMessageEmail(() => "");
        setErrorMessagePassword(() => "");
    }

    if (goBack) {
        return (<Navigate to="/"></Navigate>)
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        
        if (!checkFields()) return;
        if (!checkEmail(email)) return;
        if (!checkPassword(password, repeat)) return;
        console.log("Checks passed");
        
        console.log("Sending request...");
        resetForm();
        API.addNewUser(name, surname, password, email).then((response) => {
            if (response.error === undefined) {
                setErrorMessageFields("User inserted");
            } else {
                setErrorMessageFields(response.error);
            }
        })
        
    }

    function checkFields() {
        if (name === "" || password === "" || repeat === "" || email === "" || surname === "") {
            setErrorMessageFields("Fill all the fields of the form")
            return false;
        }
        else {
            setErrorMessageFields("")
            return true;
        }
    }

    function checkEmail(email) {
        if (!(email.includes("@")) && email !== "") {
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

    function checkPassword(password, repeat) {
        if (!(password === repeat)) {
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

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center p-5 m-0" fluid>
            
                <Form className="pt-5 p-0 m-0">
                    <Row>
                    <Col lg = {2}></Col>
                    <Col>
                    <Form.Group controlId="name">
                        <Form.Label className="text-info w-100"><h5>Name</h5></Form.Label>
                        <Form.Control
                            className="w-100 p-3"
                            type="name"
                            placeholder="Name"
                            required
                            onChange={(ev) => { setName(ev.target.value); }}
                            value={name}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="surname">
                        <Form.Label className="text-info w-100"><h5>Surname</h5></Form.Label>
                        <Form.Control
                            className="w-100 p-3"
                            type="name"
                            placeholder="Surname"
                            required
                            onChange={(ev) => { setSurname(ev.target.value); }}
                            value={surname}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    </Col>
                    <Col lg = {2}></Col>
                    </Row>
                    </Form>
                    <Form className="pt-3 p-0 m-0">
                    <Row>
                    <Col lg = {2}></Col>
                    <Col>
                    <Form.Group controlId="email">
                        <Form.Label className="text-info"><h5>Email</h5></Form.Label>
                        <Form.Control
                            type="email"
                            className="w-100 p-3"
                            placeholder="Email"
                            required
                            onChange={(ev) => { setEmail(ev.target.value); }}
                            value={email}
                        />
                        {errorMessageEmail.length !== 0 && (
                        <div
                            className="alert alert-danger alert-float-static fade show"
                            role="alert"
                        >
                            {errorMessageEmail}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                    <Col lg = {2}></Col>
                    </Row>
                    </Form>
                    <Form className="pt-3 p-0 m-0">
                    <Row>
                    <Col lg = {2}></Col>
                    <Col>
                    <Form.Group controlId="Password">
                        <Form.Label className="text-info"><h5>Password</h5></Form.Label>
                        <Form.Control
                            type="password"
                            className="w-100 p-3"
                            placeholder="Password"
                            required
                            onChange={(ev) => { setPassword(ev.target.value); }}
                            value={password}
                        />
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
                    <Col>
                    <Form.Group controlId="repeatPassword">
                        <Form.Label className="text-info"><h5>Repeat Password</h5></Form.Label>
                        <Form.Control
                            type="password"
                            className="w-100 p-3"
                            placeholder="Repeat Password"
                            required
                            onChange={(ev) => { setRepeat(ev.target.value) }}
                            value = {repeat}
                        />
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
                    <Col lg = {2}></Col>
                    </Row>
                </Form>
                <Row className = "m-0">
                    <Col lg = {2}></Col>
                    <Col>
                    <Row className="pt-4">
                        <Col sm={5} className="text-left m-0 p-0">
                            
                        <Button
                            size = "lg"
                            variant="danger"
                            type="submit"
                            className="w-100 m-0"
                            onClick={() => setGoBack(true)}
                        >
                            Back
                        </Button>
                            </Col>
                            <Col sm={2} className=""></Col>
                            <br/>
                        <Col sm={5} className="text-right m-0 p-0">
                        <Button
                            size = "lg"
                            variant="success"
                            type="submit"
                            className="w-100 mr-5"
                            onClick={(ev) => handleSubmit(ev)}
                            >
                                Register
                        </Button>
                        </Col>
                        </Row>
                        <br/>
                        {errorMessageFields.length !== 0 && (
                            <div
                                className="alert alert-danger alert-float-static fade show"
                                role="alert"
                            >
                                {errorMessageFields}
                            </div>
                        )}
                    </Col>
                    <Col lg = {2}></Col>
                </Row>
            </Container>
        </>
    );
}

export default MyForm;