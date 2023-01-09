//import { ResultType } from '@remix-run/router/dist/utils';
import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const usePost = (urlSegment : string) => {

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const postRegister = async(firstName: string, lastName: string, email: string, password: string) => {

        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            email: `${email}`,
            password: `${password}`,
            salt: ``,
            creationDate:``,
            iterations:``

            })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);

        } finally {

            setLoading(false);

        }
        
    };

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

    
    return {postRegister, postLogin, data, loading, error}

}

export default usePost;