
import Loading from '../../components/Loading/Loading.tsx';
import './Recovery.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState, useEffect } from 'react';
import useSecurity from '../../hooks/useUserSecurity.tsx';
import validations from '../../utils/validations';

const Recovery = () => {

    //Initializing
    const navigate = useNavigate();
    const { validateEmail } = validations();

    const home = () => {
        navigate("/");
    };

    //state variables
    const [email, setEmail] = useState('');
    const [emailWarning, setEmailWarning] = useState('');

    //calling postLogin function
    const { postRecover, data, error, loading } = useSecurity('Recover');

    //handles updates to input's
    const inputHandler = () =>{
        setEmail(document.getElementById("email").value);

    }

    //initiate account recovery
    const RecoverAccount = () => {

        if(validateEmail(email)) {

            postRecover(email);

        } else {
            setEmailWarning("Email Not Valid")
        }
        
    } 
 
    useEffect(() => {
        
        if(data.status === 200) {
            setEmailWarning("Recovery Email Sent")
        } else if (data.status === 468) {
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