
//import Loading from '../Loading/Loading';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState } from 'react';

const Login = () => {

    //Initializing
    const navigate = useNavigate();

    //state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //handles updates to input's
    const inputHandler = (e) =>{
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
    }

    //Login
    const Login = () =>{
        
        //TODO - Login functionality
        console.log("Not Done")
    }

    //returning JSX
    return (
        <>
            <CustomForm
                title='Log In'
                fields={['email', 'password']}
                fieldIDs={['email', 'password']}
                fieldTypes={['text', 'text']}
                onChange={inputHandler}
                submitAction={Login}
            ></CustomForm>
        </>
        );
}

export default Login