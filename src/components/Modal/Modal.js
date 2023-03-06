import './Modal.css'
import React, {useEffect, useState} from "react";
import ReactDom from "react-dom";
import Modal from 'react-bootstrap/Modal';
import PropTypes, { bool } from 'prop-types';

const TestModal = (props) => {
  //defining proptypes
  TestModal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
  }

  //default props
  TestModal.defaultProp = {
    show: false,
    handleClose: () => {},
    title: ""
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
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