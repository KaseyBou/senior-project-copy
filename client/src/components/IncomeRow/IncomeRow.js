import {useContext, useState} from 'react';
import './IncomeRow.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const IncomeRow = (props) => {

    //defining proptypes
    IncomeRow.propTypes = {
        name:PropTypes.string,
        source:PropTypes.string,
        date:PropTypes.string,
        amount:PropTypes.number,
        id:PropTypes.string,
        editFunction:PropTypes.func,
        deleteFunction:PropTypes.func
    }

    //default props
    IncomeRow.defaultProp = {
        button: ""
    }

    //returning jsx
    return (

        <div className="incomeRow">
            <div className="incomeDetails">
                <h3>{props.name}</h3>
                <p>Source: {props.source}</p>
                <p>Date: {props.date}</p>
                <p>Amount: ${props.amount}</p>
            </div>
            <div className="incomeButtons">
                <Button text="Edit" function={props.editFunction}/>
                <Button text="Delete" function={props.deleteFunction}/>
            </div>
        </div>

    );
}

export default IncomeRow