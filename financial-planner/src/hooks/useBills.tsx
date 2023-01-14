import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const useBills = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const postBill = async(user_id: number, bill_name: string, bill_source: string, pay_frequency: number, next_due: Date, amount: number, account_id: number, budget_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_id: `${account_id}`,
                bill_name: `${bill_name}`,
                bill_source: `${bill_source}`,
                amount: `${amount}`,
                next_due: `${next_due}`,
                pay_frequency: `${pay_frequency}`,
                user_id: `${user_id}`,
                budget_id: `${budget_id}`
                })
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getBills = async(user_id: number) => {
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

    return {postBill, getBills}
    
};

export default useBills;