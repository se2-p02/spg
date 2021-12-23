import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row, InputGroup } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import API from "./API";
import './MyNavBar.css';




function MyLogin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [goBack, setGoBack] = useState(false)

    const navigate = useNavigate();

    function checkValid(username_to_check, password_to_check) {
        if (username_to_check === "") {
            setErrorMessageUsername("Email cannot be empty");
        } else {
            setErrorMessageUsername("");
        }
        if (password_to_check === "") {
            setErrorMessagePassword("Password cannot be empty")
        } else {
            setErrorMessagePassword("");
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault();

        checkValid(username, password)

        let valid = true;
        if (username === "") {
            valid = false;
        }
        if (password === "") {
            valid = false;
        }

        if (valid) {
            resetForm();
            API.login({ username: username, password: password }).then((response) => {
                if (response.error === undefined) {
                    API.isLoggedIn().then((res) => {
                        if (res.error === undefined) {
                            // comment props.setUser(() => res);
                            // comment props.setLoggedIn(() => true);
                            // comment props.setFirstLogin(() => true);
                            props.setUser({ username: username, role: res.role, id: res.id });
                            navigate("/" + res.role);
                        }
                    });
                } else {
                    setError(() => response.error);
                }
            });
        }
    }

    function resetForm() {
        setErrorMessageUsername(() => "");
        setErrorMessagePassword(() => "");
        setError(() => "");
    }

    useEffect(() => {
        if (error.length !== 0) {
            setTimeout(() => setError(""), 3000);
        }
    }, [error]);

    if (props.user) {
        return (<Navigate to={"/" + props.user.role}></Navigate>)
    }

    if (goBack) {
        return (<Navigate to="/"></Navigate>)
    }


    return (
        <>
            <Container className=" min-height-100 justify-content-center m-0 p-0 below-nav pt-5 bg_login" style={{ display: 'flex' }} fluid>

                <Row className="w-100 mt-5 vheight-100 m-0 p-0">
                    <Col xs="2" sm="2" md="3"></Col>
                    <Col xs="8" sm="8" md="6" className=' below-nav m-0 p-0 '>
                        <Container className="radius_button p-5 mb-0 mt-5 bg-white border">

                            <Form className="pt-1 p-0 m-0">
                                <Form.Group className="mt-1 w-100">
                                    <Form.Label className=" w-100"><h5>Email</h5></Form.Label>
                                    <Form.Control
                                        className="w-100 p-2"
                                        type="username"
                                        id="username"
                                        placeholder="Enter email"
                                        required
                                        isInvalid={errorMessageUsername}
                                        onChange={(ev) => { setUsername(ev.target.value) }}
                                        value={username}
                                    />
                                    
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                {errorMessageUsername?<p className="text-danger fs-6">{errorMessageUsername}</p>:<></>}


                                <Form.Group className={errorMessageUsername ? "pt-1" : "pt-3"}>
                                    <Form.Label className="text p-0 pt-4"><h5>Password</h5></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="p-2"
                                            placeholder="Password"
                                            required
                                            isInvalid={errorMessagePassword}
                                            onChange={(ev) => { setPassword(ev.target.value); }}
                                            value={password}
                                            onKeyDown={(ev) => { if (ev.key === 'Enter') handleSubmit(ev); }}
                                        />
                                        <Button variant="secondary" onClick={() => setShowPassword((sp) => !sp)}>{showPassword ? <EyeSlashFill /> : <EyeFill size="20" />}</Button>
                                    </InputGroup>
                                    {errorMessagePassword?<p className="text-danger fs-6">{errorMessagePassword}</p>:<></>}
                                </Form.Group>
                                {error.length !== 0 && (
                                    <div
                                        className="alert alert-danger alert-float-static fade show"
                                        id="error"
                                        role="alert"
                                        data-testid="error"
                                    >
                                        {error}
                                    </div>
                                )}

                            </Form>
                            <p className="text p-0 pt-2 ">Not registered yet? <a className="text-primary" href="/signup">Sign up</a></p>
                            <Row className="pt-4 w-100 m-0">
                                <Col xs="5" sm="5" className="text-left m-0 p-0">

                                    <Button
                                        size="lg"
                                        variant="danger"
                                        type="submit"
                                        //className={errorMessagePassword ? "mt-1" : "mt-3 float-right mr-4"}
                                        className="w-100 m-0 radius_button"
                                        onClick={() => setGoBack(true)}
                                    >
                                        Back
                                    </Button>
                                </Col>
                                <Col sm="2" xs="2" className=""></Col>
                                <Col sm="5" xs="5" className="text-right m-0 p-0">
                                    <Button
                                        size="lg"
                                        variant="success"
                                        type="submit"
                                        id="submit"
                                        //className={errorMessagePassword ? "mt-1" : "mt-3 float-right mr-4"}
                                        className="w-100 mr-5 add_btn"
                                        onClick={(ev) => handleSubmit(ev)}
                                    >

                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs="2" sm="2" md="3"></Col>
                </Row>
            </Container>
        </>
    );
}

export default MyLogin;
