import {useContext} from 'react';
import './CustomForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const CustomForm = (props) => {
    //defining proptypes
    CustomForm.propTypes = {
        title:PropTypes.string,
        fields:PropTypes.array, // list of fields in form
        fieldTypes:PropTypes.array, // list of types of fields defined above (defaults to text)
        fieldIDs:PropTypes.array,
        warning:PropTypes.array,
        warningIDs:PropTypes.array,
        submitAction:PropTypes.func,
        onChange:PropTypes.func,
        isCancellable:PropTypes.bool
    }

    //default props
    CustomForm.defaultProp = {
        button: "",
        fields: ""
    }

    // generate fields from array of fields
    var fieldsJSX = [];
    for(var i = 0; i < props.fields.length; i++){
        // if a field type is given, use it. otherwise, default to text
        var type
        try{
            type = props.fieldTypes[i];
        } catch {
            type = 'text'
        }

        // all cases aside from select
        if (type !== 'select'){
            fieldsJSX.push(
            <>
                <tr>
                    <td>
                        <label htmlFor={props.fields[i]} className="formLabel">{props.fields[i]}</label>
                    </td>
                    <td>
                        <input type={type} className="formInput" name={props.fieldIDs[i]} id={props.fieldIDs[i]} onChange={props.onChange} />
                    </td>
                    <td className='column'>
                        <p id={props.warningIDs[i]} className='warning'>{props.warning[i]}</p>
                    </td>
                </tr>
            </>
            )
        } else {
            // if select, insert a select tag instead of input
            fieldsJSX.push(
            <>
                <tr>
                    <td>
                        <label htmlFor={props.fields[i]} className="formLabel">{props.fields[i]}</label>
                    </td>
                    <td>
                        <select className="formInput" name={props.fieldIDs[i]} id={props.fieldIDs[i]} onChange={props.onChange}>
                            {props.selectFields}
                        </select>
                    </td>
                    <td className='column'>
                        <p id={props.warningIDs[i]} className='warning'>{props.warning[i]}</p>
                    </td>
                </tr>
            </>
            )
        }
    }

    //returning jsx
    return (

        <div className="customForm col-sm mt-3">
            <div className="formWrapper">
                <h3>{props.title}</h3>
                <table className="formTable">
                    <tbody>
                        {fieldsJSX}
                    </tbody>
                </table>
                <div className="formButtons">
                    <Button text="Submit" function={props.submitAction}/>
                    {props.isCancellable && <Button text="Cancel"/>} {/*TODO: add cancel functionality*/}
                </div>
            </div>
            {props.children}
        </div>

    );
}

export default CustomForm