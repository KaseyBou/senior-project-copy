import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const useDeposits = (urlSegment: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  //add a deposit
  const postDeposit = async (
    user_id: number,
    deposit_source: string,
    date: Date,
    total_amount: number,
    account_id: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(`${baseURL}${urlSegment}`, {
        user_id: `${user_id}`,
        deposit_source: `${deposit_source}`,
        date: `${date}`,
        total_amount: `${total_amount}`,
        account_id: `${account_id}`,
      });
      setData(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve Deposit
  const getDeposit = async (user_id: number) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`${baseURL}${urlSegment}/${user_id}`);
      setData(response);
      return response;
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
      //return data;
    }
  };

  //edit deposit

  const editDeposit = async (
    deposit_id: number,
    account_id: number,
    deposit_source: number,
    date: Date,
    total_amount: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.put(
        `${baseURL}${urlSegment}/${deposit_id}`,
        {
          account_id: `${account_id}`,
          deposit_source: `${deposit_source}`,
          date: `${date}`,
          total_amount: `${total_amount}`,
        }
      );
      setData(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
      return data;
    }
  };

  //delete deposit
  const deleteDeposit = async (deposit_id: number) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.delete(
        `${baseURL}${urlSegment}/${deposit_id}`,
        {}
      );
      setData(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
      return data;
    }
  };

  return { postDeposit, getDeposit, editDeposit, deleteDeposit };
};

export default useDeposits;
