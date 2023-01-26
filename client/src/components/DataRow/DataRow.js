// TODO: add "key" prop

import './DataRow.css'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const DataRow = (props) => {
    //defining proptypes
    DataRow.propTypes = {
        title:PropTypes.string,
        labels:PropTypes.array, // list of labels for subrows
        rows:PropTypes.array, // list of subrows in row
        HandleEdit:PropTypes.func,
        HandleDelete:PropTypes.func
    }

    //default props
    DataRow.defaultProp = {
        title: "",
        labels: [],
        rows: [],
        HandleEdit:() => {},
        HandleDelete:() => {}
    }

    // generate rows from prop
    var subrowsJSX = []
    if(props.rows){
        for(var i = 0; i < props.rows.length; i++){
            subrowsJSX.push(
                <div className='DataSubrow'>
                    <b>{props.labels[i]}</b>
                    <span>{props.rows[i]}</span>
                    <br />
                </div>
            )
        }
    }

    return(
        <div className="dataRowWrapper">
            <div className="dataRowText">
                {props.title && <p className='dataRowTitle'>{props.title}</p>}
                {subrowsJSX}
            </div>
            <div className="dataRowButtons">
                <Button onClick={props.HandleEdit}>Edit</Button>
                <Button onClick={props.HandleDelete}>Delete</Button>
            </div>
        </div>
    )
}

export default DataRow