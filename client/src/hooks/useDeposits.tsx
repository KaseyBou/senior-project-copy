import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'https://financial-planner-app.herokuapp.com/';

const useDeposits = (urlSegment: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const tokenHeader =
  {
      headers: {
          authorization: `${cookies.get("TOKEN")}`
      }
  }

  //add a deposit
  const postDeposit = async (source: string, date: Date, total_amount: number, account_id: number, budget_id: number
  ) => {
    try {
      //console.log(source, date, total_amount, account_id)
      setLoading(true);
      setError(false);
      const response = await axios.post(`${baseURL}${urlSegment}`, {
        source: `${source}`,
        date: `${date}`,
        total_amount: `${total_amount}`,
        account_id: `${account_id}`,
        budget_id: `${budget_id}`
      }, tokenHeader);
      setData(response);
    } catch (error) {
      setError(true);
      //console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve Deposit
  const getDeposit = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`${baseURL}${urlSegment}`, tokenHeader);
      setData(response);
      return response;
    } catch (error) {
      setError(true);
      //console.log(error);
    } finally {
      setLoading(false);
      //return data;
    }
  };

  //edit deposit

  const editDeposit = async (deposit_id: number, account_id: number, deposit_source: string, date: Date, total_amount: number, budget_id: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.put(
        `${baseURL}${urlSegment}/${deposit_id}`,
        {
          account_id: `${account_id}`,
          source: `${deposit_source}`,
          date: `${date}`,
          total_amount: `${total_amount}`,
          budget_id: `${budget_id}`
        }, tokenHeader
      );
      setData(response);
    } catch (error) {
      setError(true);
      //console.log(error);
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
         tokenHeader
      );
      setData(response);
    } catch (error) {
      setError(true);
      //console.log(error);
    } finally {
      setLoading(false);
      return data;
    }
  };

  return { postDeposit, getDeposit, editDeposit, deleteDeposit };
};

export default useDeposits;