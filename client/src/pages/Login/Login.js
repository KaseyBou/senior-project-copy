
import Loading from '../../components/Loading/Loading.tsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState, useEffect } from 'react';
import usePost from '../../hooks/useUserAccount.tsx';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = () => {

    //Initializing
    const navigate = useNavigate();
    //var emailValidator = require("email-validator");
    
    const dashboard = () => {
        navigate("/Dashboard");
    };

    //state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailWarning, setEmailWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    //calling postLogin function
    const { postLogin, data, error, loading } = usePost('Login');

    //handles updates to input's
    const inputHandler = () =>{
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);

    }

    //Login
    const Login = () => {

        postLogin(email, password);
        
    } 

    useEffect(() => {
        
        if(data.status === 200) {

            if(cookies.get("TOKEN") !== undefined) {
            
                dashboard();
    
            } 
            else {
                setEmailWarning("Incorrect Email or Password");
            }
        }

    }, [Login])

    //returning JSX
    return (
        <>
            <CustomForm
                title='Log In'
                fields={['Email', 'Password']}
                fieldIDs={['email', 'password']}
                warning={[`${emailWarning}`, `${passwordWarning}`]}
                warningIDs={['emailWarning', 'passwordWarning']}
                fieldTypes={['text', 'text']}
                onChange={inputHandler}
                submitAction={Login}
            ></CustomForm>
        </>
    );
    
}

export default Login