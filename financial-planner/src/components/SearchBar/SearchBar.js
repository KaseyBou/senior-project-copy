//import {useContext} from 'react';
import './SearchBar.css';
//import { useNavigate } from 'react-router-dom';
//import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
//import Button from '../Button/Button';

const SearchBar = (props) => {
    //defining proptypes
    SearchBar.propTypes = {
        fieldName:PropTypes.string, 
        fieldType:PropTypes.string, 
        placeholder:PropTypes.string,
        submitAction:PropTypes.func,
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
            
            <input class="searchForm" name={props.fieldName} type={props.fieldType} placeholder={props.placeholder}></input>
        
        </div>
       

    );
}

export default SearchBar