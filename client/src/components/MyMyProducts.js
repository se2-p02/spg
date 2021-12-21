import React, { useState, useEffect } from "react";
import { Button, ListGroup, Container, Row, Col, Alert } from "react-bootstrap";
import { PencilSquare, CheckSquare } from "react-bootstrap-icons";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './MyNavBar.css';
import API from "./API";


function MyMyProducts(props) {
    const [modal, setModal] = useState();
    const [products, setProducts] = useState([]);
    const [reqUpdate, setReqUpdate] = useState(true);
    const [product, setProduct] = useState();
    const [show, setShow] = useState(false);
    const [old_img, setOld_img] = useState(undefined)
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (props.clock && props.user && (reqUpdate || props.cart)) {
            if (props.clock.day() < 5 && props.clock.day() > 0) {
                API.loadNextProducts(props.user.role, 'current').then((p) => {
                    if (p.error === undefined) {
                        p.forEach((prod) => {
                            let find = props.cart.find((c) => c.id === prod.id)
                            if (props.cart.find((c) => c.id === prod.id)) {
                                prod.quantity = prod.quantity - find.quantity;
                            }
                        });
                        setProducts(p.filter((prod) => prod.quantity !== 0));
                        setReqUpdate(false);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
            else {
                API.loadNextProducts(props.user.role).then((p) => {
                    if (p.error === undefined) {
                        p.forEach((prod) => {
                            let find = props.cart.find((c) => c.id === prod.id)
                            if (props.cart.find((c) => c.id === prod.id)) {
                                prod.quantity = prod.quantity - find.quantity;
                            }
                        });
                        setProducts(p.filter((prod) => prod.quantity !== 0));
                        setReqUpdate(false);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }, [reqUpdate, props.cart, props.user, props.clock]);

   

    const handleModify = (id) => {
        setProduct(products.find((prod) => prod.id === id));
        handleShow();
    }



    const handleConfirm = async (id) => {

        API.updateProduct({ id: id }, { confirm: true }).then((r) => {
            if (r.error === undefined) {
                setReqUpdate(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <Col sm="9">
            <Container className="bg-white min-height-100 justify-content-center align-items-center text-center below-nav" fluid>
                {(props.clock && (!((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9)) && !(props.clock.day() === 1 && props.clock.hour() < 9))
                    &&
                    <Alert className="m-0 mt-1 mx-3 radius_button_small" variant="danger">{"You can add new products from "}<b>Friday to Saturday 9:00</b>{" and confirm products on "} <b>Monday by 9:00</b></Alert>)
                }

                <ListGroup className="my-2 mx-3 pt-1" variant="flush">
                    <ListGroup.Item variant="warning">
                        <Row className="p-3 align-items-center">
                            <Col sm="1"><b>Id</b></Col>
                            <Col sm="3"><b>Name</b></Col>
                            <Col sm="2"><b>Quantity</b></Col>
                            <Col sm="2"><b>Price</b></Col>
                            <Col sm="2"><b>Modify</b></Col>
                            <Col sm="2"><b>Confirm</b></Col>
                        </Row>
                    </ListGroup.Item>
                    {products &&
                        <>
                            {
                                products.map(p => {
                                    return (
                                        <ListGroup.Item>
                                            <Row className="p-2 align-items-center">
                                                <Col sm="1">{p.id}</Col>
                                                <Col sm="3">{p.name}</Col>
                                                <Col sm="2">{p.quantity + " " + p.unit}</Col>
                                                <Col sm="2">{p.price + " €"}</Col>
                                                <Col sm="2">{p.confirmed === 0 && (props.clock && ((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9))) ?
                                                    <Button variant="warning" className="border" onClick={() => { setModal('modify'); handleModify(p.id); setOld_img(p.image)}}><PencilSquare /></Button>
                                                    :
                                                    <Button variant="light" className="border" ><PencilSquare /></Button>
                                                }</Col>
                                                <Col sm="2">{p.confirmed === 0 && (
                                                    (props.clock && (props.clock.day() === 1 && props.clock.hour() < 9)) ?
                                                        <Button variant="success" className="border" onClick={() => handleConfirm(p.id)}><CheckSquare /></Button>
                                                        :
                                                        <Button variant="light" className="border" ><CheckSquare /></Button>
                                                )
                                                }
                                                    {p.confirmed !== 0 &&
                                                        <h6 className="m-0 p-0">CONFIRMED</h6>
                                                    }</Col>
                                            </Row>

                                        </ListGroup.Item>
                                    );
                                })
                            }
                        </>
                    }
                </ListGroup>
                <Row className=" mt-2" data-testid="ciao2">
                    <Col sm="4">
                    </Col>
                    <Col sm="4">
                        {(props.clock && ((props.clock.day() === 5) || (props.clock.day() === 6 && props.clock.hour() < 9))) ?
                            <Button size="lg" className="btn add_btn p-2 w-100 mt-3 " data-testid="apbw" onClick={() => { setModal('add'); handleShow();setOld_img(undefined) }}>New product</Button>
                            :
                            <Button size="lg" data-testId="apbnw" className="btn btn-success radius_button p-2 w-100 mt-3" disabled>New product</Button>
                        }
                    </Col>
                    <Col sm="4"></Col>

                </Row>

                <MyModal old_img={old_img} show={show} setReqUpdate={setReqUpdate} setShow={setShow} product={product} modal={modal} setProduct={setProduct} user={props.user} />
            </Container>

        </Col>
    );
}

function MyModal(props) {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [unit, setUnit] = useState("kg");
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState("All-purpose");
    const [message, setMessage] = useState([]);
    const [img, setImg] = useState(undefined);

    useEffect(() => {
        if (props.modal === 'modify') {
            setName(props.product && props.product.name);
            setQuantity(props.product && props.product.quantity);
            setPrice(props.product && props.product.price);
            setUnit(props.product && props.product.unit);
            setCategory(props.product && props.product.filter);
        }
    }, [props.modal, props.product, props.show]);

    const handleClose = () => {
        props.setProduct();
        setMessage([]);
        setName("");
        setCategory("All-purpose");
        setPrice("0");
        setUnit("kg");
        props.setShow(false);
        setImg(undefined)
    }



    const handleSubmit = () => {
        setMessage([]);
        let tmp_msg = []

        if (name === undefined || name === "") tmp_msg[0] = "Name cannot be empty"
        if (quantity === undefined || quantity === "0") tmp_msg[1] = "Quantity should be greater than 0"
        if (price === undefined || price === "0") tmp_msg[2] = "Price should be greater than 0"
        setMessage(tmp_msg)
        if (quantity === "0" || price === "0" || name === "") {
            return;
        }
        if (props.modal === 'modify') {
            const files = {...img}   
            let fileName;
            let del;
            let tmp1
            let tmp2
            if(files[0]===undefined){
                fileName=props.old_img
                del = 0;
            }
            else{
                handleImageUpload()
                fileName = files[0].name.split("\n").pop()
                del = 1;
            }
            if(unit===undefined || unit===null){
                tmp1="kg"
            }
            if(category===undefined || category===null){
                tmp2="All-purpose"
            }
            API.updateProduct({ id: props.product.id, name: name, quantity: quantity, price: price, unit: unit, filter: category, file: fileName, delete: del }, { update: true }).then((r) => {
                if (r.error === undefined) {
                    props.setReqUpdate(true);
                }
                handleClose();
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            const files = {...img}   
            let fileName
            let tmp1
            let tmp2
            if(files[0]===undefined){
                fileName="no_image.png"
            }
            else{
                handleImageUpload()
                fileName = files[0].name.split("\n").pop()
            }
            if(unit===undefined || unit===null){
                tmp1="kg"
            }
            if(category===undefined || category===null){
                tmp2="All-purpose"
            }
            API.createProduct({ name: name, quantity: quantity, unit: tmp1, price: price, filter: tmp2, file: fileName }).then((r) => {
                if (r.error === undefined) {
                    props.setReqUpdate(true);
                }
                handleClose();
            }).catch((err) => {
                console.log(err);
            });
        }
    }


    const handleDelete = () => {
        API.deleteProduct(props.product.id).then((p) => {
            if (p.error === undefined) {
                props.setReqUpdate(true);
            }
            handleClose();
        }).catch((err) => {
            console.log(err);
        });
        props.setShow(false);
    }

    const storeValue = (event) => {
        const files = event.target.files
        setImg({...files})
    }

    const handleImageUpload = () => {
        const files = {...img}    
        
        const formData = new FormData()
        formData.append('myFile', files[0])

        fetch('/api/farmer/image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.path)
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <>
        <Modal
            {...props}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            data-testid="product_modal"
        >

            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label className="w-100"><h6>Name</h6></Form.Label>
                                <Form.Control
                                    className="w-100 p-2"
                                    type="name"
                                    placeholder="Name"
                                    required
                                    onChange={(ev) => { setName(ev.target.value); }}
                                    value={name ? name : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="quantity">
                                <Form.Label className="w-100"><h6>Quantity</h6></Form.Label>
                                <Form.Control
                                    className="w-100 p-2"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    required
                                    onChange={(ev) => { setQuantity(ev.target.value); }}
                                    value={quantity ? quantity : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="unit">
                                <Form.Label className=" w-100"><h6>Unit</h6></Form.Label>
                                <Form.Select style={{
                                    backgroundColor: "unset",
                                    marginTop: "unset"
                                }} className="w-100 p-2" onChange={(ev) => { setUnit(ev.target.value); }}>
                                    <option key="kg">kg</option>
                                    <option key="g">g</option>
                                    <option key="pcs">pcs</option>
                                    <option key="l">l</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="price">
                                <Form.Label className=" w-100 mt-4"><h6>Price</h6></Form.Label>
                                <Form.Control
                                    className="w-100 p-2"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    required
                                    onChange={(ev) => { setPrice(ev.target.value); }}
                                    value={price ? price : ""}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="category">
                                <Form.Label className=" w-100 mt-4"><h6>Category</h6></Form.Label>
                                <Form.Select style={{
                                    backgroundColor: "unset",
                                    marginTop: "unset"
                                }} className="w-100 p-2" value={category} onChange={(ev) => { setCategory(ev.target.value); }}>
                                    <option key="All-purpose">All-purpose</option>
                                    <option key="Fish">Fish</option>
                                    <option key="Dairy and Eggs">Dairy and Eggs</option>
                                    <option key="Meat">Meat</option>
                                    <option key="Vegetables">Vegetables</option>
                                    <option key="Beverages">Beverages</option>
                                    <option key="Fruit">Fruit</option>
                                    <option key="Gastronomy">Gastronomy</option>
                                    <option key="Home and Garden">Home and Garden</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className=" w-100 mt-4"><h6>Image</h6></Form.Label>
                            <Form.Control type="file" id="fileUpload" accept="image/*" onChange={storeValue}/>
                            
                        </Form.Group>
                    </Row>
                    <Row>
                        {message.map((x) => {
                            return <p className="text-danger m-0 p-1 mx-2 mt-1">{x}</p>
                        })}
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="m-0">
                <Row className=" w-100">
                    <Col sm="4">{props.modal === 'modify' &&
                        <Button variant="danger" className="radius_button w-100" onClick={handleDelete}>Delete</Button>
                    }</Col>
                    <Col sm="4"><Button variant="secondary" className="radius_button w-100" onClick={handleClose}>Close</Button>
                    </Col>
                    <Col sm="4"><Button variant="success" className="radius_button w-100" data-testid="submit" onClick={() => { handleSubmit(); }}>Submit</Button>
                    </Col>
                </Row>


            </Modal.Footer>
            
        </Modal >
        
    </>

    );
}

export default MyMyProducts;
