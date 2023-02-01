//import { ResultType } from '@remix-run/router/dist/utils';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const usePost = (urlSegment : string) => {

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    
    const tokenHeader =
    {
        headers: {
            authorization: `${cookies.get("TOKEN")}`
        }
    }

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
    const editUser = async(first_Name: string, last_Name: string, email: string, password: string, phone: string, user_id: number) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${user_id}`, {
            first_Name: `${first_Name}`,
            last_Name: `${last_Name}`,
            email: `${email}`,
            password: `${password}`,
            phone:`${phone}`,
            profile_image: null,
            user_id: user_id

            },tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
        
    };

    //hook to delete user account
    const deleteUser = async(user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.delete(`${baseURL}${urlSegment}/${user_id}`,tokenHeader)
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

            }).then((response) => {
                cookies.set("TOKEN", response.data.token, {path: "/",});
                return response;
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
    const getAccountDetails = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}`, tokenHeader)
            setData(response);
            return response;
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
    }
    
    return {postRegister, postLogin, editUser, deleteUser, getAccountDetails, data, loading, error}

}

export default usePost;