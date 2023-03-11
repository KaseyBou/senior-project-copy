//import {useContext} from 'react';
import './TableRow.css';
//import { useNavigate } from 'react-router-dom';
//import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const TableRow = (props) => {

    //defining proptypes
    TableRow.propTypes = {
        date:PropTypes.string,
        account:PropTypes.string,
        balance:PropTypes.number,

    }

    //default props
    TableRow.defaultProp = {
        date:'',
        account:'',
        balance:'',
    }

    //returning jsx
    return (

        <tr>
            <td>Account</td>
            <td>Date</td>
            <td>Amount</td>
        </tr>

    );
}

export default TableRow