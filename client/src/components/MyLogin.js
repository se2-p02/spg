import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import API from "./API";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


function MyLogin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [goBack, setGoBack] = useState(false)

    const history = useNavigate();

    function checkValid(username_to_check, password_to_check) {
        if (username_to_check === "") {
            setErrorMessageUsername((e) => {
                return "Should have some characters";
            });
        } else {
            setErrorMessageUsername("");
        }
        if (password_to_check === "") {
            setErrorMessagePassword((e) => {
                return "Should have some characters";
            });
        } else {
            setErrorMessagePassword("");
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault();

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
                    API.isLoggedIn().then((response) => {
                        if (response.error === undefined) {
                            //props.setUser(() => response);
                            //props.setLoggedIn(() => true);
                            //props.setFirstLogin(() => true);
                            props.setUser(() => username);
                            history.push("/" + username);
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

    if (goBack) {
        return (<Navigate to="/"></Navigate>)
      }

    return (
        <>
            <Container className="bg-dark min-height-100 justify-content-center m-0 p-0" style={{ display: 'flex' }} fluid>

            <Row className="w-100 mt-5 vheight-100 m-0 p-0">
                <Col sm={3}></Col>
                <Col sm={6} className='col-5 below-nav m-0 p-0'>
                    <Container className=" p-5 m-0 b">
                    
                        <Form className="pt-3 p-0 m-0">
                            <Form.Group controlId="formusername" className="mt-1 w-100">
                                <Form.Label className="text-info w-100"><h5>Username</h5></Form.Label>
                                <Form.Control
                                    className="w-100 p-4"
                                    type="username"
                                    placeholder="Enter username"
                                    required
                                    isInvalid={errorMessageUsername}
                                    onChange={(ev) => { setUsername(ev.target.value); checkValid(ev.target.value, password) }}
                                    value={username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorMessageUsername}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formPassword" className={errorMessageUsername ? "pt-1" : "pt-3"}>
                                <Form.Label className="text-info"><h5>Password</h5></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="w-100 p-4"
                                    placeholder="Password"
                                    required
                                    isInvalid={errorMessagePassword}
                                    onChange={(ev) => { setPassword(ev.target.value); checkValid(username, ev.target.value); }}
                                    value={password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorMessagePassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {error.length !== 0 && (
                                <div
                                    className="alert alert-danger alert-float-static fade show"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            
                        </Form>
                        <Row className="pt-4 w-100 m-0">
                                <Col sm={5} className="text-left m-0 p-0">
                                
                            <Button
                                size = "lg"
                                variant="danger"
                                type="submit"
                                //className={errorMessagePassword ? "mt-1" : "mt-3 float-right mr-4"}
                                className="w-100 m-0"
                                onClick={() => setGoBack(true)}
                            >
                                Back
                            </Button>
                                </Col>
                                <Col sm={2} className=""></Col>
                            <Col sm={5} className="text-right m-0 p-0">
                            <Button
                                size = "lg"
                                variant="success"
                                type="submit"
                                //className={errorMessagePassword ? "mt-1" : "mt-3 float-right mr-4"}
                                className="w-100 mr-5"
                                onClick={(ev) => handleSubmit(ev)}
                                >
                
                                Login
                            </Button>
                            </Col>
                            </Row>
                    </Container>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>
        </>
    );
}

export default MyLogin;
