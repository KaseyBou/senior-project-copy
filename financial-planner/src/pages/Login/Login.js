
//import Loading from '../Loading/Loading';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState } from 'react';
import usePost from '../../hooks/usePostUserAccount.tsx';


const Login = () => {

    //Initializing
    const navigate = useNavigate();

    const dashboard = () => {
        navigate("/Dashboard");
    };

    //state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //calling postLogin function
    const { postLogin } = usePost('Login')

    //handles updates to input's
    const inputHandler = (e) =>{
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
    }

         //Login
         const Login = () =>{
            
            postLogin(email, password)
            //dashboard();
            
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