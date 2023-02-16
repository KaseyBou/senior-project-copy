
import Loading from '../../components/Loading/Loading.tsx';
import './Reset.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState, useEffect } from 'react';
import usePost from '../../hooks/useUserAccount.tsx';
import Cookies from 'universal-cookie';
import validations from '../../utils/validations';
import { useParams} from 'react-router-dom';


const Login = () => {

    //Initializing
    const navigate = useNavigate();
        //validation functions
        const {passwordValidation} = validations();
    
    const home = () => {
        navigate("/");
    };

    const { verificationString } = useParams();
    //state variables
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');

    const [passwordWarning, setPasswordWarning] = useState('');

    //calling postLogin function
    const { resetPass, data, error, loading } = usePost('Reset');

    //handles updates to input's
    const inputHandler = () =>{
        setConfirmPassword(document.getElementById("confirmPassword").value);
        setPassword(document.getElementById("password").value);

    }

    //Login
    const ResetPassword = () => {

        if(passwordValidation(password) && password === confirmPassword) {

            
        } else {

        }
        
    } 

    useEffect(() => {
        
        console.log(data.status)


    }, [data])

    //returning JSX
    return (
        <>
            <CustomForm
                title='Reset Password'
                fields={['Password', 'Confirm Password']}
                fieldIDs={['password', 'confirmPassword']}
                warning={[``, `${passwordWarning}`]}
                warningIDs={['', 'passwordWarning']}
                fieldTypes={['password', 'password']}
                onChange={inputHandler}
                submitAction={ResetPassword}
            ></CustomForm>
        </>
    );
    
}

export default Login