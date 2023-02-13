//import Loading from '../Loading/Loading';
import './Verification.css';
import {useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import usePost from '../../hooks/useUserAccount.tsx';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading.tsx'

import { useParams} from 'react-router-dom';

const Account = () => {

    const navigate = useNavigate();
    //calling postRegister function
    const {getEmailVerification, error, loading} = usePost('Verify');
    const { verificationString } = useParams();
    console.log(verificationString)

    console.log(verificationString)

    const home = () => {
        navigate('/');
    }


    useEffect(() => {

        getEmailVerification('GAACAAEA')
        
    },[])

    if (loading) {
        return <Loading/>;
    }

    if(error) {
        return <p>There was an error</p>

    }

    //returning JSX
    return (
        <>

            <h1>Thank you for verifying your email</h1>
            <Button onClick={home}>Home</Button>
        </>
        );
}

export default Account