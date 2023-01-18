import axios from 'axios';
import { useState } from 'react';

const baseURL = 'http://localhost:3001/';

const useExpenditures = (urlSegment: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  //add expenditure
  const postExpenditure = async (
    user_id: number,
    recipient: string,
    date: Date,
    total_amount: number,
    account_id: number,
    budget_id: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(`${baseURL}${urlSegment}`, {
        user_id: `${user_id}`,
        recipient: `${recipient}`,
        date: `${date}`,
        total_amount: `${total_amount}`,
        account_id: `${account_id}`,
        budget_id: `${budget_id}`,
      });
      setData(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve Expenditure
  const getExpenditure = async (user_id: number) => {
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

  //edit Expenditure

  const editExpenditure = async (
    expenditure_id: number,
    account_id: number,
    recipient: string,
    date: Date,
    total_amount: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.put(
        `${baseURL}${urlSegment}/${expenditure_id}`,
        {
          account_id: `${account_id}`,
          recipient: `${recipient}`,
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
  const deleteExpenditure = async (expenditure_id: number) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.delete(
        `${baseURL}${urlSegment}/${expenditure_id}`,
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

  return {
    postExpenditure,
    getExpenditure,
    editExpenditure,
    deleteExpenditure,
  };
};

export default useExpenditures;
