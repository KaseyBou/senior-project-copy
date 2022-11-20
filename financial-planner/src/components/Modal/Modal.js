import React from "react";
import ReactDom from "react-dom";

const Modal = (props) => {
    const [domReady, setDomReady] = React.useState(false)

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
}

export default Modal;