import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const useAccount = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [tokenHeader, setTokenHeader] = useState<any>('');
    useEffect(() => {
        console.log(cookies.get("TOKEN"));
        setTokenHeader({
            headers: {
                Authorization: `${cookies.get("TOKEN")}`
            }
        }
    )},[])

    //add/edit bank account
    const postAccount = async(user_id: number, bank: string, accountType: string, interestRate: number, accountFees: number, balance: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_name: `${bank}`,
                account_type: `${accountType}`,
                balance: `${balance}`,
                interest: `${interestRate}`,
                monthlyFees: `${accountFees}`,
                user_id: `${user_id}`
                }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //delete bank account
    const postDeleteAccount = async(account_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_id: `${account_id}`
                }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAccount = async(user_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}/${user_id}`, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    };

    return {postAccount, getAccount, postDeleteAccount}
    
};

export default useAccount;