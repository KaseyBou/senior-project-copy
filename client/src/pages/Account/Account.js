//import Loading from '../Loading/Loading';
import './Account.css';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import usePost from '../../hooks/useUserAccount.tsx';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import validations from '../../utils/validations';

const Account = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();
    const home = () => {
        navigate('/');
    }
    // on render, get list of Deposits
    useEffect(() => {

        //verifying user is logged in
        if(cookies.get("TOKEN") === undefined) {
            navigate("/");
        }
        
    },[])

    //calling postRegister function
    const {editUser, deleteUser, getAccountDetails, data, loading, error, success} = usePost('User');
    //validation functions
    const {passwordValidation, validateEmail, validatePhone} = validations();
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
        const [passwordDeleteWarning, setPasswordDeleteWarning] = useState('');

      
    useEffect(() => {
        // load existing data into form
        getAccountDetails().then((data) => {
            let account = data.data[0];
            localStorage.setItem("editing", account.user_id)
            document.getElementById("firstName").value = account.first_name;
            document.getElementById("lastName").value = account.last_name;
            document.getElementById("email").value = account.email;
            document.getElementById("phone").value = account.phone;

            inputHandler();
        })
    },[])

      // state variable for visibility of delete confirmation
      const [showDelete, setShowDelete] = useState(false);
      const handleShowDelete = (id) => {
        setShowDelete(true);
        localStorage.setItem("deleting", id);
    }
      const handleCloseDelete = () => setShowDelete(false);
  
      //handles updates to input's
      const inputHandler = () =>{
        
          setFirstName(document.getElementById("firstName").value);
          setLastName(document.getElementById("lastName").value);
          setPhone(document.getElementById("phone").value);
          setEmail(document.getElementById("email").value);
          setPassword(document.getElementById("password").value);
          setConfirmPassword(document.getElementById("confirmPassword").value);

      }

      const editAccount = () => {

        if(firstName.length < 2 ) {
            setFirstNameWarning('Please Enter First Name')
        } else {
            setFirstNameWarning('')
        }

        if(lastName.length < 2 ) {
            setLastNameWarning('First Name Required')
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

        if(password !== confirmPassword) {
            setConfirmPasswordWarning('Passwords do not match')
        }

        if(validateEmail(email) && validatePhone(phone) && lastName.length > 2 && firstName.length > 2 && password === confirmPassword) {

            //console.log(localStorage.getItem("editing"))
            editUser(localStorage.getItem("editing"), firstName, lastName, email, password, phone);

            if(success) {
                home();
            } 
            if(data.response.status === 460){
                setEmailWarning("Email already in use");
            }  else {
                setEmailWarning("");
            }

            if (data.response.status === 461) {
                setPhoneWarning("Phone # already in use")
            } else {
                setPhoneWarning("")
            }
        }

      }

      const delAccount = () => {
        // TODO: you know the drill by this point
        let passwordDelete = document.getElementById("passwordDelete").value;
        deleteUser(localStorage.getItem("editing"), passwordDelete);
        
        cookies.remove("TOKEN");
        home();
          

      }

    //returning JSX
    return (
        <>

            <CustomForm
                title='Edit Account'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "New Password", "Confirm Password"]}
                fieldIDs={['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']}
                onChange={inputHandler}
                submitAction={editAccount}
                fieldTypes={['text', 'text', 'email', 'tel', 'password', 'password', 'number']}
                warning={[firstNameWarning, lastNameWarning, emailWarning, phoneWarning, passwordWarning, confirmPasswordWarning]}
                warningIDs={['firstNameWarning', 'lastNameWarning', 'emailWarning', 'phoneWarning', 'passwordWarning', 'confirmPasswordWarning']}
            ></CustomForm>
            <Button text='Delete Account' function={handleShowDelete}/>
            <Modal show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                <CustomForm
                    title = "Delete your account? (this cannot be undone)"
                    fields = {['password']}
                    fieldIDs = {['passwordDelete']}
                    warning = {[passwordDeleteWarning]}
                    warningIDs = {['passwordDeleteWarning']}
                    fieldTypes = {['string']}
                    // onChange = {console.log("placeholder")}
                    submitAction = {delAccount}
                />
            </Modal>
        </>
        );
}

export default Account