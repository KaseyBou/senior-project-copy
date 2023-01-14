import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const useIncome = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const postIncome = async(account_id: number, gross_pay: number, pay_day: Date, pay_frequency: number, user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_id: `${account_id}`,
                gross_pay: `${gross_pay}`,
                pay_day: `${pay_day}`,
                pay_frequency: `${pay_frequency}`,
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

    const getIncomes = async(user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}/${user_id}`)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    };

    return {postIncome, getIncomes}
    
};

export default useIncome;