import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";

const EventModal = (props) => {

    
  return (
    <Modal show={props.modalFlg} onHide={props.onModalClose} centered>
      <Modal.Header>
        <Modal.Title>
          <h5>予定の追加</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="text"
            className="fs-5"
            placeholder="予定タイトル"
            autoComplete="off"
            name="title"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <InputGroup>
            <Form.Control type="date" name="date" />
            <Form.Select name="startTime"></Form.Select>
            <span className="p-1">–</span>
            <Form.Select name="endTime"></Form.Select>
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">取り消し</Button>
        <Button variant="primary" type="submit">
          追加
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
