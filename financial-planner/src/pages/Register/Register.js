
//import Loading from '../Loading/Loading';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import ColumnBox from '../../components/ColumnBox/ColumnBox';

const Register = () => {

    //Initializing
    const navigate = useNavigate();

    //returning JSX
    return (
        <>
            <CustomForm
                title='Register'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "Password", "Confirm Password"]}
            ></CustomForm>
        </>
        );
}

export default Register