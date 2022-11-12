import { useContext} from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {

    Button.propTypes = {
        
        text:PropTypes.node.isRequired,
        function: PropTypes.any
        
    };
      
    Button.defaultProps = {
        color: "#50BF47"
    };

    return (
        <div className='container'>
            <button style={({backgroundColor: props.color, color: '#fff'})} onClick={props.function}>{props.text}</button>
        </div>
    );

}



export default Button