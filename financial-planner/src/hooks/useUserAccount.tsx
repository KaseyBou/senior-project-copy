//import { ResultType } from '@remix-run/router/dist/utils';
import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const usePost = (urlSegment : string) => {

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);


    //hook to register user account
    const postRegister = async(first_Name: string, last_Name: string, email: string, password: string, phone: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            first_Name: `${first_Name}`,
            last_Name: `${last_Name}`,
            email: `${email}`,
            password: `${password}`,
            password_salt: ``,
            phone:`${phone}`,
            profile_image: null,
            is_admin: 0
            })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }

        return {data, loading, error}
        
    };

    //hook to edit user account
    const postEditUser = async(first_Name: string, last_Name: string, email: string, password: string, phone: string, user_id: number) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            first_Name: `${first_Name}`,
            last_Name: `${last_Name}`,
            email: `${email}`,
            password: `${password}`,
            phone:`${phone}`,
            profile_image: null,
            user_id: user_id

            })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
        
    };

    //hook to delete user account
    const postDeleteUser = async( user_id: number) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            user_id: user_id

            })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
        
    };

    //hook to login
    const postLogin = async(email: string, password: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            email: `${email}`,
            password: `${password}`

            })
            setData(response);
            return 
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
        
    };
    
    // get account details
    const getAccountDetails = async (user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}User/${user_id}`, {})
            setData(response);
            return response;
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
    }
    
    return {postRegister, postLogin, postEditUser, postDeleteUser, getAccountDetails, data, loading, error}

}

export default usePost;