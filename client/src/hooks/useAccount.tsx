import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'https://financial-planner-app.herokuapp.com/';

const useAccount = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const tokenHeader =
        {
            headers: {
                authorization: `${cookies.get("TOKEN")}`
            }
        }

    //add/edit bank account
    const addAccount = async(bank: string, accountType: string, interestRate: number, accountFees: number, balance: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                account_name: `${bank}`,
                account_type: `${accountType}`,
                balance: `${balance}`,
                interest: `${interestRate}`,
                monthlyFees: `${accountFees}`,
                }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //add/edit bank account
    const editAccount = async(account_id: number, bank: string, accountType: string, interestRate: number, accountFees: number, balance: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${account_id}`, {
                account_name: `${bank}`,
                account_type: `${accountType}`,
                balance: `${balance}`,
                interest: `${interestRate}`,
                monthlyFees: `${accountFees}`
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
    const deleteAccount = async(account_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.delete(`${baseURL}${urlSegment}/${account_id}`, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // get list of bank accounts
    const getAccounts = async() => {
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

    return {addAccount, deleteAccount, getAccounts, editAccount}
    
};

export default useAccount;