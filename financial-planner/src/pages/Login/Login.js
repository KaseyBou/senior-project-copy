
import Loading from '../../components/Loading/Loading.tsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState } from 'react';
import usePost from '../../hooks/useUserAccount.tsx';


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
        
        const {data, loading, error} = postLogin(email, password)
        //dashboard();
        
        if (loading) {
            return <Loading/>;
        }

        let warning = document.querySelectorAll(".warning");
        if(error) {
            warning.style.display = "block"
    
        } else {
            warning.style.display = "none"
        }

    }


    //returning JSX
    return (
        <>
            <CustomForm
                title='Log In'
                fields={['Email', 'Password']}
                fieldIDs={['email', 'password']}
                warning={['Email/Password Do Not Match', 'Email/Password Do Not Match']}
                fieldTypes={['text', 'text']}
                onChange={inputHandler}
                submitAction={Login}
            ></CustomForm>
        </>
        );
}

export default Login