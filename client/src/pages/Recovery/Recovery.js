
import Loading from '../../components/Loading/Loading.tsx';
import './Recovery.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState, useEffect } from 'react';
import usePost from '../../hooks/useUserAccount.tsx';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Recovery = () => {

    //Initializing
    const navigate = useNavigate();
    //var emailValidator = require("email-validator");

    const home = () => {
        navigate("/");
    };

    //state variables
    const [email, setEmail] = useState('');
    const [emailWarning, setEmailWarning] = useState('');

    //calling postLogin function
    const { postRecover, data, error, loading } = usePost('Recover');

    //handles updates to input's
    const inputHandler = () =>{
        setEmail(document.getElementById("email").value);

    }

    //initiate account recovery
    const RecoverAccount = () => {

        if(email.length !== 0) {

            postRecover(email);
        } 
        
    } 

    useEffect(() => {
        
        if(data.status === 200) {
            setEmailWarning("Recovery Email Sent")
        } else if (data.status === 400) {
            setEmailWarning("Email Not Found")
        }

    }, [data])

    //returning JSX
    return (
        <>
            <CustomForm
                title='Recover Account'
                fields={['Email']}
                fieldIDs={['email']}
                warning={[`${emailWarning}`]}
                warningIDs={['emailWarning']}
                fieldTypes={['text']}
                onChange={inputHandler}
                submitAction={RecoverAccount}
            ></CustomForm>
        </>
    );
    
}

export default Recovery