//import Loading from '../Loading/Loading';
import './Account.css';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';
import usePost from '../../hooks/useUserAccount.tsx';

const Account = () => {

    //intializing
    //const navigate = useNavigate();
    //handles updates to input's

      //calling postRegister function
      const { postEditUser } = usePost('EditUser')

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
          setUser_id('');
      }

      const editAccount = () => {

        //get user_ID from how it is stored
        //postEditUser()
        if(password === confirmPassword) {
            postEditUser(firstName, lastName, email, password, phone, user_id)
           // postEditUser("firstName", "lastName", "test@test.com", "", "000-000-0000", 7)
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