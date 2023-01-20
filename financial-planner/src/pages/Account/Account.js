//import Loading from '../Loading/Loading';
import './Account.css';
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import usePost from '../../hooks/useUserAccount.tsx';

const Account = () => {

    //intializing
    //const navigate = useNavigate();
    //handles updates to input's

      //calling postRegister function
      const {postRegister, postLogin, postEditUser, postDeleteUser, getAccountDetails, data, loading, error} = usePost('EditUser')

      //state variables
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('')
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [user_id, setUser_id] = useState('');
  
      //handles updates to input's
      const inputHandler = () =>{
        
          setFirstName(document.getElementById("firstName").value);
          setLastName(document.getElementById("lastName").value);
          setPhone(document.getElementById("phone").value);
          setEmail(document.getElementById("email").value);
          setPassword(document.getElementById("password").value);
          setConfirmPassword(document.getElementById("confirmPassword").value);
          // TODO
          setUser_id(document.getElementById("userID").value);
      }
      
      // on page load, get user info and prefill form
      // TODO: get user ID from session var
      useEffect(() => {
        getAccountDetails(8).then((data) => {
            data = data.data[0];
            document.getElementById("firstName").value = data.first_name;
            document.getElementById("lastName").value = data.last_name;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;
            inputHandler();
        })
      }, [])

      const editAccount = () => {
        // get user_ID from how it is stored
        if(password === confirmPassword) {
            postEditUser(firstName, lastName, email, password, phone, user_id)
            console.log('hello')
        } else {
            console.log('not good')
        }
      }

    //returning JSX
    return (
        <>

            <CustomForm
                title='Edit Account'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "New Password", "Confirm Password", "user_ID"]}
                fieldIDs={['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'userID']}
                onChange={inputHandler}
                submitAction={editAccount}
                fieldTypes={['text', 'text', 'email', 'tel', 'password', 'password', 'number']}
                warning={['Please Enter First Name', 'Please Enter Last Name', 'Enter valid email', 'Enter Valid Phone #', 'Passwords Must Match']}
                warningIDs={['firstNameWarning', 'lastNameWarning', 'emailWarning', 'phoneWarning', 'passwordWarning', 'confirmPasswordWarning']}
            ></CustomForm>
        </>
        );
}

export default Account