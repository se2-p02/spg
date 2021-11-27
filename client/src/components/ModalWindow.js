import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

const ModalWindow = (props)=> {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      testId="modal-window"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" testId="modal-title">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{color:"red"}} testId="modal-text">
          {props.text}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide} testId="close-btn">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default ModalWindow;
