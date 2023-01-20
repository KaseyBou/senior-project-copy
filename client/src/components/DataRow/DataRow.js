// TODO: add "key" prop

import './DataRow.css'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const DataRow = (props) => {
    //defining proptypes
    DataRow.propTypes = {
        title:PropTypes.string,
        rows:PropTypes.string, // list of subrows in row
        HandleEdit:PropTypes.func,
        HandleDelete:PropTypes.func
    }

    //default props
    DataRow.defaultProp = {
        title: "",
        rows: [],
        HandleEdit:() => {},
        HandleDelete:() => {}
    }

    // generate rows from prop
    var subrowsJSX = []
    if(props.rows){
        for(var i = 0; i < props.rows.length; i++){
            subrowsJSX.push(
                <p className='DataSubrow'>{props.rows[i]}</p>
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