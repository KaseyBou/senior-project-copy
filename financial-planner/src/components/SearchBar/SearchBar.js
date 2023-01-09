import {useContext} from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const SearchBar = (props) => {
    //defining proptypes
    SearchBar.propTypes = {
        fieldName:PropTypes.string, 
        fieldType:PropTypes.string, 
        fieldID:PropTypes.string,
        placeholder:PropTypes.string,
        submitAction:PropTypes.func,
        onChange:PropTypes.func,
        isCancellable:PropTypes.bool
    }

    //default props
    SearchBar.defaultProp = {
        fieldName: "searchBar",
        fieldType: "search",
        placeholder:"Search"
    }

    //returning jsx
    return (

        
        <div className=" mt-4">
            
            <input className="searchForm" name={props.fieldID} id={props.fieldID} type={props.fieldType} placeholder={props.placeholder} onChange={props.onChange}></input>
        
        </div>
       

    );
}

export default SearchBar