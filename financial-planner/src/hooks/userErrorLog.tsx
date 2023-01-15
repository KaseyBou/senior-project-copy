import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const useErrorLog = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    //post error
    const postError = async(errorMsg: string, user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                error_message: `${errorMsg}`,
                user_id: `${user_id}`
                })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {postError}
    
};

export default useErrorLog;