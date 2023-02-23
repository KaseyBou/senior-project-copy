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
    const {editUser, deleteUser, getAccountDetails, updateEmail, changePassword, data, loading, error, success} = usePost('User');
    //validation functions
    const {passwordValidation, validateEmail, validatePhone} = validations();
    //state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formMessage, setFormMessage] = useState('');
    //input warnings
    const [firstNameWarning, setFirstNameWarning] = useState('');
    const [lastNameWarning, setLastNameWarning] = useState('');
    const [phoneWarning, setPhoneWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('')
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');
    const [passwordDeleteWarning, setPasswordDeleteWarning] = useState('');

    // state variable for visibility of delete confirmation
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
    setShowDelete(true);
    localStorage.setItem("deleting", id);
    }
    const handleCloseDelete = () => setShowDelete(false);

    //email modal controls
    const [showEmail, setShowEmail] = useState(false);
    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => {
    setShowEmail(true);
    //localStorage.setItem("editing", id)
    }
    //password modal controls
    const [showPassword, setShowPassword] = useState(false);
    const handleClosePassword = () => setShowPassword(false);
    const handleShowPassword = () => {
    setShowPassword(true);
    //localStorage.setItem("editing", id)
    }

    //info modal controls
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = (id) => {
    setShowInfo(true);
    //localStorage.setItem("editing", id)
    }
      
    const [accountInfo, setAccountInfo] = useState([])
    useEffect(() => {
        // load existing data into form
        getAccountDetails().then((accountData) => {
            let account = accountData.data[0];
            setAccountInfo(account)
            
            localStorage.setItem("editing", account.user_id)

        })
    },[])

    useEffect(() => {
     
        console.log(accountInfo)
        document.getElementById("firstName").value = accountInfo.first_name;
        document.getElementById("lastName").value = accountInfo.last_name;
        document.getElementById("phone").value = accountInfo.phone;

                // load existing data into form
                /*setAccountInfo(getAccountDetails().then((accountData) => {
                    let account = accountData.data[0];
                    console.log(account)
                    localStorage.setItem("editing", account.user_id)
                    document.getElementById("firstName").value = account.first_name;
                    document.getElementById("lastName").value = account.last_name;
                    document.getElementById("email").value = account.email;
                    document.getElementById("phone").value = account.phone;
        
                    inputHandler();
                }))*/
    },[accountInfo])

      //handles updates to input's
      const inputHandler = () =>{
        
          setFirstName(document.getElementById("firstName").value);
          setLastName(document.getElementById("lastName").value);
          setPhone(document.getElementById("phone").value);
          setEmail(document.getElementById("email").value);
          setPassword(document.getElementById("password").value);
          setConfirmPassword(document.getElementById("confirmPassword").value);

      }

      const editInfo = async() => {

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

        if(!validatePhone(phone)) {
            setPhoneWarning('Please Enter Valid Phone')
        } else {
            setPhoneWarning('')
        }

        if(validatePhone(phone) && lastName.length > 2 && firstName.length > 2) {

            //console.log(localStorage.getItem("editing"))
            editUser(localStorage.getItem("editing"), firstName, lastName, phone);

            console.log(data)
            
            if(data.status === 200) {
                setFormMessage("Successfully Edited Account")
                
            } else if(data.status !== 200) {
                setFormMessage("Error")
            }

            if (data.status === 461) {
                setPhoneWarning("Phone # already in use")
            } else {
                setPhoneWarning("")
            }
        }

      }

      const updatePassword = async() => {

        if(password !== confirmPassword) {
            setConfirmPasswordWarning('Passwords do not match')
        }

        if(passwordValidation(password) && password === confirmPassword) {

            //console.log(localStorage.getItem("editing"))
            changePassword(localStorage.getItem("editing"), password);

            console.log(data)
            
            if(data.status === 200) {
                setFormMessage("Successfully Edited Account")
                
            } else if(data.status !== 200) {
                setFormMessage("Error")
            }

            if(data.status === 460){
                setEmailWarning("Email already in use");
            }  else {
                setEmailWarning("");
            }

            if (data.status === 461) {
                setPhoneWarning("Phone # already in use")
            } else {
                setPhoneWarning("")
            }
        }

      }

      const changeEmail = async() => {

        if(!validateEmail(email)) { //emailValidator.validate(email)
            setEmailWarning('Please Enter Valid Email')
        } else {
            setEmailWarning('')
        }

       
        if(validateEmail(email)) {

            //console.log(localStorage.getItem("editing"))
            updateEmail(localStorage.getItem("editing"), email, password);

            console.log(data)
            
            if(data.status === 200) {
                setFormMessage("Successfully Edited Account")
                
            } else if(data.status !== 200) {
                setFormMessage("Error")
            }

            if(data.status === 460){
                setEmailWarning("Email already in use");
            }  else {
                setEmailWarning("");
            }

            if (data.status === 461) {
                setPhoneWarning("Phone # already in use")
            } else {
                setPhoneWarning("")
            }
        }

      }

      const delAccount = () => {
              
        let passwordDelete = document.getElementById("passwordDelete").value;
        deleteUser(localStorage.getItem("editing"), passwordDelete);
        
        cookies.remove("TOKEN");
        home();
          

      }

    //returning JSX
    return (
        <>
            <Modal show={showEmail} handleShow={handleShowEmail} handleClose={handleCloseEmail}>
                <CustomForm
                    title='Change Email (Must Verify E-mail Address)'
                    fields={["E-Mail Address"]}
                    fieldIDs={['email']}
                    onChange={inputHandler}
                    submitAction={changeEmail}
                    fieldTypes={[ 'email']}
                    warning={[ emailWarning]}
                    warningIDs={['emailWarning']}
                    formMessage={formMessage}
                ></CustomForm>
            </Modal>
            <Button text='Update Email' function={handleShowEmail}/>

            <Modal show={showPassword} handleShow={handleShowPassword} handleClose={handleClosePassword}>
                <CustomForm
                    title='Change Password'
                    fields={["New Password", "Confirm Password"]}
                    fieldIDs={['password', 'confirmPassword']}
                    onChange={inputHandler}
                    submitAction={updatePassword}
                    fieldTypes={['password', 'password',]}
                    warning={[passwordWarning, confirmPasswordWarning]}
                    warningIDs={['passwordWarning', 'confirmPasswordWarning']}
                    formMessage={formMessage}
                ></CustomForm>
            </Modal>
            <Button text='Update Password' function={handleShowPassword}/>

            <Modal show={showInfo} handleShow={handleShowInfo} handleClose={handleCloseInfo}>
                <CustomForm
                    title='Edit Information'
                    fields={["First Name", "Last Name", "Phone Number"]}
                    fieldIDs={['firstName', 'lastName', 'phone']}
                    onChange={inputHandler}
                    submitAction={editInfo}
                    fieldTypes={['text', 'text', 'tel']}
                    warning={[firstNameWarning, lastNameWarning, phoneWarning]}
                    warningIDs={['firstNameWarning', 'lastNameWarning', 'phoneWarning']}
                    formMessage={formMessage}
                ></CustomForm>
            </Modal>
            <Button text='Update Information' function={handleShowInfo}/>

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
                    formMessage={formMessage}
                />
            </Modal>
        </>
        );
}

export default Account