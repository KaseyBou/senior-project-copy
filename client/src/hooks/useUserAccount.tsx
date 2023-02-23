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
    const [success, setSuccess] = useState<boolean>(false);

    
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
            is_admin: 0,
            is_verified: 0
            })
            console.log(response)
            setData(response);
            setSuccess(true);

        }catch(error) {
            //setError(true);
            setData(error.response)
            console.log(error.response);

        } finally {

            setLoading(false);

        }

        return {data, loading, error, success}
        
    };

    //hook to edit user account
    const editUser = async(user_id: number, first_Name: string, last_Name: string, phone: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${user_id}`, {
            first_Name: `${first_Name}`,
            last_Name: `${last_Name}`,
            phone:`${phone}`,
            profile_image: null,
            user_id: user_id

            },tokenHeader).then((response) => {
                console.log(response)
                //cookies.set("TOKEN", response.data, {path: "/",});
            });
            setData(response)
        }catch(error) {
            //setError(true);
            setData(error.response)
            console.log(error.response);

        } finally {

            setLoading(false);

        }

        return {data}
    };

    //hook to edit user account
    const updateEmail = async(user_id: number, email: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${user_id}`, {
            email: `${email}`,
            user_id: user_id

            },tokenHeader).then((response) => {
                console.log(response)
                cookies.set("TOKEN", response.data, {path: "/",});
            });
            setData(response)
        }catch(error) {
            //setError(true);
            setData(error.response)
            console.log(error.response);

        } finally {

            setLoading(false);

        }

        return {data}
    };

    //hook to edit user account
    const changePassword = async(user_id: number, password: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${user_id}`, {
            password: `${password}`,
            user_id: user_id

            },tokenHeader).then((response) => {
                console.log(response)
                //cookies.set("TOKEN", response.data, {path: "/",});
            });
            setData(response)
        }catch(error) {
            //setError(true);
            setData(error.response)
            console.log(error.response);

        } finally {

            setLoading(false);

        }

        return {data}
    };

    //hook to delete user account
    const deleteUser = async( user_id: number, pw_attempt: string) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}DeleteUser`, {
                user_id: user_id,
                pw_attempt: pw_attempt
            },tokenHeader)
            setData(response);
            
        }catch(error) {
            setError(true);
            //console.log(error);

        } finally {

            setLoading(false);

        }
        
    };

    //hook to login
    const postLogin = async(email: string, password: string) => {

        try {
            //setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            email: `${email}`,
            password: `${password}`

            }).then((response) => {
                cookies.set("TOKEN", response.data.token, {path: "/",});
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
            //console.log(error);

        } finally {

            setLoading(false);

        }
    }

    return {postRegister, postLogin, editUser, deleteUser, getAccountDetails, updateEmail, changePassword, data, loading, error, success}

}

export default usePost;