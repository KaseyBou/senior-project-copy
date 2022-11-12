
//import Loading from '../Loading/Loading';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';

const Login = () => {

    //Initializing
    const navigate = useNavigate();

    //returning JSX
    return (
        <>
            <CustomForm
                title='Log In'
                fields={['email', 'password']}
                fieldTypes={['text', 'text']}
            ></CustomForm>
        </>
        );
}

export default Login