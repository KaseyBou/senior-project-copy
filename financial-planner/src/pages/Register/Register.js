
//import Loading from '../Loading/Loading';
import './Register.css';
//import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePost from '../../hooks/useUserAccount.tsx';

const Register = () => {

    //Initializing
    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    };

      //calling postRegister function
    const { postRegister } = usePost('Register')

    //state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //handles updates to input's
    const inputHandler = () =>{
        setFirstName(document.getElementById("firstName").value);
        setLastName(document.getElementById("lastName").value);
        setPhone(document.getElementById("phone").value);
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
        setConfirmPassword(document.getElementById("confirmPassword").value);
    }

    //Register
    const Register = () =>{
        

        if(password === confirmPassword) {

            postRegister(firstName, lastName, email, password, phone)
            home();
        } else {
            
        }
    }


    //returning JSX
    return (
        <>
            <CustomForm
                title='Register'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "Password", "Confirm Password"]}
                fieldIDs={['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']}
                warning={['Please Enter First Name', 'Please Enter Last Name', 'Enter valid email', 'Enter Valid Phone #', 'Passwords Must Match']}
                warningIDs={['firstNameWarning', 'lastNameWarning', 'emailWarning', 'phoneWarning', 'passwordWarning', 'confirmPasswordWarning']}
                fieldTypes={['text', 'text', 'text', 'text', 'password','password']}
                onChange={inputHandler}
                submitAction={Register}
            ></CustomForm>
        </>
        );
}

export default Register