
//import Loading from '../Loading/Loading';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm/CustomForm';

const Account = () => {

    //intializing
    const navigate = useNavigate();

    //returning JSX
    return (
        <>

            <CustomForm
                title='Edit Account'
                fields={["First Name", "Last Name", "E-Mail Address", "Phone Number", "New Password", "Confirm Password"]}
                fieldTypes={['text', 'text', 'email', 'tel', 'password', 'password']}
            ></CustomForm>
        </>
        );
}

export default Account