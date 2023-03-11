import {useContext} from 'react';
import './Column.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ColumnBox = (props) => {

    //defining proptypes
    ColumnBox.propTypes = {
        pictureFilePath:PropTypes.string,
        title:PropTypes.string,
        altText:PropTypes.string,
        text:PropTypes.string,
        button:PropTypes.any
    }

    //default props
    ColumnBox.defaultProp = {
        button: "",
        pictureFilePath: ""
    }

    //returning jsx
    return (

        <div className="col-sm column-style">
            <h3>{props.title}</h3>
            {props.children}
            <p>{props.text}</p>
            {props.button}
        </div>

    );
}

export default ColumnBox