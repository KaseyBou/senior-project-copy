
//import Loading from '../Loading/Loading';
import './Register.css';
//import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePost from '../../hooks/useUserAccount.tsx';

import functions from './functions'
const Register = () => {

    //Initializing
    const navigate = useNavigate();
    //var emailValidator = require("email-validator");

    const home = () => {
        navigate("/");
    };

      //calling postRegister function
    const { postRegister } = usePost('Register')

    //validation functions
    const {passwordValidation, validateEmail, validatePhone} = functions();

    //state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //input warnings
    const [firstNameWarning, setFirstNameWarning] = useState('');
    const [lastNameWarning, setLastNameWarning] = useState('');
    const [phoneWarning, setPhoneWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('')
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');

    //handles updates to input's
    const inputHandler = () =>{

        setFirstName(document.getElementById("firstName").value);
        setLastName(document.getElementById("lastName").value);
        setPhone(document.getElementById("phone").value);
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
        setConfirmPassword(document.getElementById("confirmPassword").value);

        if(firstName.length < 2 ) {
            setFirstNameWarning('Please Enter First Name')
        } else {
            setFirstNameWarning('')
        }

        if(lastName.length < 2 ) {
            setLastNameWarning('Please Enter Last Name')
        } else {
            setLastNameWarning('')
        }

        if(!validateEmail(email)) { //emailValidator.validate(email)
            setEmailWarning('Please Enter Valid Email')
        } else {
            setEmailWarning('')
        }

        if(!validatePhone(phone)) {
            setPhoneWarning('Please Enter Valid Phone')
        } else {
            setPhoneWarning('')
        }

        if(!passwordValidation(password)) {
            setPasswordWarning('Password must be 8 characters long & uppercase/lowercase letters and numbers')
        } else {
            setPasswordWarning('')
        }

        if(password !== confirmPassword) {
            setConfirmPasswordWarning('Passwords do not match')
        }
    }

    useEffect(() => {     
        inputHandler()
    })
    //Register
    const Register = () =>{
        

        if(passwordValidation(password) && validateEmail(email) && validatePhone(phone) && lastName.length > 2 && firstName.length > 2) {

            if(password === confirmPassword) {

                postRegister(firstName, lastName, email, password, phone)
                home();
            } else {
                
            }
        }
    }


    //returning JSX
    return (
        <>
            <CustomForm
                title='Register'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "Password", "Confirm Password"]}
                fieldIDs={['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']}
                warning={[firstNameWarning, lastNameWarning, emailWarning, phoneWarning, passwordWarning, confirmPasswordWarning]}
                warningIDs={['firstNameWarning', 'lastNameWarning', 'emailWarning', 'phoneWarning', 'passwordWarning', 'confirmPasswordWarning']}
                fieldTypes={['text', 'text', 'text', 'text', 'password','password']}
                onChange={inputHandler}
                submitAction={Register}
            ></CustomForm>
        </>
        );
}

export default Register