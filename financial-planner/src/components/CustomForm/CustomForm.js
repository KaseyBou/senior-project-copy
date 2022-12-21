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
        fields:PropTypes.string, // list of fields in form
        fieldTypes:PropTypes.string, // list of types of fields defined above (defaults to text)
        submitAction:PropTypes.func,
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
            type = props.fieldTypes[i]
        } catch {
            type = 'text'
        }

        fieldsJSX.push(
        <>
            <tr>
                <td>
                    <label htmlFor={props.fields[i]} class="formLabel">{props.fields[i]}</label>
                </td>
                <td>
                    <input type={type} class="formInput" name={props.fields[i]} id={props.fields[i]} />
                </td>
            </tr>
        </>
        )
    }

    //returning jsx
    return (

        <div className="customForm col-sm mt-3">
            <div className="formWrapper">
                <h3>{props.title}</h3>
                <table class="formTable">
                    <tbody>
                        {fieldsJSX}
                    </tbody>
                </table>
                <div class="formButtons">
                    <Button text="Submit" function={props.submitAction}/>
                    {props.isCancellable && <Button text="Cancel"/>} {/*TODO: add cancel functionality*/}
                </div>
            </div>
            {props.children}
        </div>

    );
}

export default CustomForm