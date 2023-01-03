//import {useContext} from 'react';
import './InformationDisplay.css';
//import { useNavigate } from 'react-router-dom';
//import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const InformationDisplay = (props) => {

    //defining proptypes
    InformationDisplay.propTypes = {
        button:PropTypes.any,
        informationCategory1:PropTypes.string,
        information1:PropTypes.string,
        informationCategory2:PropTypes.string,
        information2:PropTypes.string,
        informationCategory3:PropTypes.string,
        information3:PropTypes.string
    }

    //default props
    InformationDisplay.defaultProp = {
        button: "",
        informationCategory1:PropTypes.string,
        information1:PropTypes.string,
        informationCategory2:PropTypes.string,
        information2:PropTypes.string,
        informationCategory3:PropTypes.string,
        information3:PropTypes.string
    }

    //returning jsx
    return (

        <div className="col-sm column-style">
            {props.button}
            <h3>{props.informationCategory1}</h3>
            <p>{props.information1}</p>
            <h3>{props.informationCategory2}</h3>
            <p>{props.information2}</p>
            <h3>{props.informationCategory3}</h3>
            <p>{props.information3}</p>
        </div>

    );
}

export default InformationDisplay