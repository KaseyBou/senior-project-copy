
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

    const accountRecovery = () => {
        navigate("/Recovery");
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

        if(email.length !== 0 && password.length !== 0) {

            postLogin(email, password);
        } else {

        }
        
    } 

    useEffect(() => {
        
        console.log(data.status)
        if(data.status === 200) {

            if(cookies.get("TOKEN") !== undefined) {
            
                dashboard();
    
            } 
            else {
                setPasswordWarning("Incorrect Email or Password");
            }
        } else if(data.status === 467) {

            setPasswordWarning("Email Not Verified");

        }else if(data.status === 400)  {
            setPasswordWarning("Incorrect Email or Password");
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
                fieldTypes={['text', 'password']}
                onChange={inputHandler}
                submitAction={Login}
                linkAddr='/Recovery'
                linkMessage='Forgot Password'
            ></CustomForm>
        </>
    );
    
}

export default Login