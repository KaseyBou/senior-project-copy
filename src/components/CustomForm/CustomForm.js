import {useContext} from 'react';
import './CustomForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const CustomForm = (props) => {

    let selectCount = 0;
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
        isCancellable:PropTypes.bool,
        formMessage:PropTypes.string,
        linkAddr:PropTypes.string,
        linkMessage:PropTypes.string
    }

    //default props
    CustomForm.defaultProp = {
        button: "",
        fields: "",
        formMessage:"",
        linkAddr:"",
        linkMessage:""
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
                        <input type={type} className={"formInput form_" + type} colSpan="2" name={props.fieldIDs[i]} id={props.fieldIDs[i]} onChange={props.onChange} />
                    </td>
                </tr>
                <tr> 
                    <td className='column' colSpan="3">
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
                        <select className="formInput" name={props.fieldIDs[i]} id={props.fieldIDs[i]} onChange={props.onChange} colSpan="2">
                            {props.selectFields[selectCount]}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='column' colSpan="3">
                        <p id={props.warningIDs[i]} className='warning'>{props.warning[i]}</p>
                    </td>
                </tr>
            </>
            )

            selectCount++;
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
                {props.formMessage !== "" ? (
                <div>
                    <p id='formMessage'>{props.formMessage}</p>
                </div>
                ):(
                    ""
                )}
                <div className="formButtons">
                    <Button text="Submit" function={props.submitAction}/>
                    {props.isCancellable && <Button text="Cancel"/>} {/*TODO: add cancel functionality*/}
                </div>
                {props.linkAddr !== "" && props.linkMessage !== "" ? (
                        <a href={props.linkAddr}>{props.linkMessage}</a>
                    ): (
                        ""
                    )}
            </div>
            {props.children}
        </div>

    );
}

export default CustomForm