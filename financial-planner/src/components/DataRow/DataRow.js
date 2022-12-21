import './DataRow.css'
import Button from "../Button/Button"
import PropTypes from 'prop-types';

const DataRow = (props) => {
    //defining proptypes
    DataRow.propTypes = {
        title:PropTypes.string,
        rows:PropTypes.string, // list of subrows in row
    }

    //default props
    DataRow.defaultProp = {
        title: "",
        rows: []
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
                <Button text="Edit" />
                <Button text="Delete" />
            </div>
        </div>
    )
}

export default DataRow