import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TransferButton(props) {
   
  const [show, setShow] = useState(false);
  const [userWallet, setUserWallet] = useState('')
  const [transferToWallet, setTransferToWallet] = useState('')
//   const mike = () => setUserWallet(props.userWallet)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('debug: handleSubmit Function triggered')
    setUserWallet(props.userWallet)
    const object_to_transfer= {userWallet, transferToWallet}
    console.log(object_to_transfer)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Transfer
      </Button>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Transfer NFT to another account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{props.title}</Form.Label>
              <Form.Control
                 
                type="text"
                value={props.userWallet}
                // on = {(e) => setUserWallet (e.target.value)}
                placeholder="current address"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Transfer to wallet addresss:</Form.Label>
              <Form.Control as="textarea" rows={1} 
              value={props.transferToWallet}
              onChange = {(e) => setTransferToWallet (e.target.value)} 
              placeholder = '0x....'
              />
               
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

 

 
export default TransferButton;