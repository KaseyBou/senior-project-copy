import axios from 'axios';
import { useEffect, useState } from 'react';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const useIncome = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const tokenHeader =
        {
            headers: {
                authorization: `${cookies.get("TOKEN")}`
            }
        }

    const postIncome = async(account_id: number, gross_pay: number, pay_day: Date, pay_frequency: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_id: `${account_id}`,
                gross_pay: `${gross_pay}`,
                pay_day: `${pay_day}`,
                pay_frequency: `${pay_frequency}`,
                },tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getIncomes = async() => {
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
            //return data;
        }
    };

    const editIncome = async(income_id: number, account_id: number, gross_pay: number, pay_day: Date, pay_frequency: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${income_id}`, {
                account_id: `${account_id}`,
                gross_pay: `${gross_pay}`,
                pay_day: `${pay_day}`,
                pay_frequency: `${pay_frequency}`
            }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    }

    const deleteIncome = async(income_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.delete(`${baseURL}${urlSegment}/${income_id}`, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    }

    return {postIncome, getIncomes, editIncome, deleteIncome}
    
};

export default useIncome;