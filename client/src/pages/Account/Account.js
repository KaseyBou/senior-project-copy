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
    const {editUser, deleteUser, getAccountDetails, data, loading, error} = usePost('User')

    //state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

      
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
        // get user_ID from how it is stored
        if(password === confirmPassword) {
            //console.log(localStorage.getItem("editing"))
            editUser(localStorage.getItem("editing"), firstName, lastName, email, password, phone)
        } else {
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
                warning={['Please Enter First Name', 'Please Enter Last Name', 'Enter valid email', 'Enter Valid Phone #', 'Passwords Must Match']}
                warningIDs={['firstNameWarning', 'lastNameWarning', 'emailWarning', 'phoneWarning', 'passwordWarning', 'confirmPasswordWarning']}
            ></CustomForm>
            <Button text='Delete Account' function={handleShowDelete}/>
            <Modal show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                <CustomForm
                    title = "Delete your account? (this cannot be undone)"
                    fields = {['password']}
                    fieldIDs = {['passwordDelete']}
                    warning = {['']}
                    warningIDs = {['']}
                    fieldTypes = {['string']}
                    // onChange = {console.log("placeholder")}
                    submitAction = {delAccount}
                />
            </Modal>
        </>
        );
}

export default Account