//import { ResultType } from '@remix-run/router/dist/utils';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const useUserSecurity = (urlSegment : string) => {

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // get account details
    const getVerification = async (verificationString: string) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}/${verificationString}`)
            setData(response);
            //return response;
        }catch(error) {
            setError(true);
            setData(error.response)
            //console.log(error);

        } finally {

            setLoading(false);

        }
    }

    //hook to Recover
    const postRecover = async(email: string) => {

        try {
            //setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            email: `${email}`

            }).then((response) => {

                return response;
            })
            setData(response);
            console.log(response)
           // return true;
        }catch(error) {
            setError(true);
            setData(error.response)
            console.log(error);
            //return false;
        } finally {

            //setLoading(false);

        }

        return {data, loading, error}
        
    };

    //hook to Recover
    const resetPass = async(password: string, verificationString: string) => {

        try {
            //setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${verificationString}`, {
            password: `${password}`,

            }).then((response) => {

                return response;
            })
            setData(response);
            console.log(response)
            // return true;
        }catch(error) {
            setError(true);
            setData(error.response)
            console.log(error);
            //return false;
        } finally {

            //setLoading(false);

        }

        return {data, loading, error}
        
    };
    
    return {getVerification, postRecover, resetPass, data, loading, error, success}

}

export default useUserSecurity;