import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const CommentSuccessModal = props => {
  return (
    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Awesome</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thank you for your comment/question.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  )
};

export const CommentFailureModal = props => {
  return (
    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Oops</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>There was an error submitting your comment/question.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  )
}
