import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const baseURL = 'http://localhost:3001/';

const useBills = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const tokenHeader =
    {
        headers: {
            authorization: `${cookies.get("TOKEN")}`
        }
    }

    const postBill = async(bill_name: string, bill_source: string, pay_frequency: number, next_due: Date, amount: number, account_id: number, budget_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                bill_name: `${bill_name}`,
                bill_source: `${bill_source}`,
                pay_frequency: `${pay_frequency}`,
                next_due: `${next_due}`,
                amount: `${amount}`,
                account_id: `${account_id}`,
                budget_id: `${budget_id}`
                
                }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getBills = async () => {
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

    const editBill = async(bill_id: number, bill_name: string, bill_source: string, pay_frequency: number, next_due: Date, amount: number, account_id: number, budget_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${bill_id}`, {
                account_id: `${account_id}`,
                bill_name: `${bill_name}`,
                bill_source: `${bill_source}`,
                amount: `${amount}`,
                next_due: `${next_due}`,
                pay_frequency: `${pay_frequency}`,
                budget_id: `${budget_id}`
                }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBill = async(bill_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.delete(`${baseURL}${urlSegment}/${bill_id}`, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {postBill, getBills, editBill, deleteBill}
    
};

export default useBills;