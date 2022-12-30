import './Modal.css'
import React, {useState} from "react";
import ReactDom from "react-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TestModal = (props) => {
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        {props.buttonText}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
    </>
    );
  };

/*const Modal = (props) => {
    const [domReady, setDomReady] = React.useState(true)

    React.useEffect(() => {
        setDomReady(true)
    })

    return domReady?ReactDom.createPortal(
        <>
            <div className="modal">
                TEST
            </div>
            <div onClick={() => {}} className="backdrop">

            </div>
        </>,
        document.getElementById('modal-root')
    ):null
}*/

export default TestModal;