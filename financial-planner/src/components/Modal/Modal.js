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
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
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