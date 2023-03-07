import axios from 'axios';
import { useEffect, useState } from 'react';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'https://financial-planner-app.herokuapp.com/';

const useBudget = (urlSegment : string) => {

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const tokenHeader =
        {
            headers: {
                authorization: `${cookies.get("TOKEN")}`
            }
        }

    const postBudget = async(category_name: string, is_calculated: Boolean, monthly_budget: number, percentage: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${baseURL}${urlSegment}`, {
                category_name: `${category_name}`,
                is_calculated: `${is_calculated}`,
                monthly_budget: `${monthly_budget}`,
                percentage: `${percentage}`,
                },tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            //console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async() => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}`, tokenHeader)
            setData(response);
            return response;
        }catch(error) {
            setError(true);
            //console.log(error);
        } finally {
            setLoading(false);
            //return data;
        }
    };

    const editCategory = async(category_id: number, category_name: string, is_calculated: Boolean, monthly_budget: number, percentage: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.put(`${baseURL}${urlSegment}/${category_id}`, {
                budget_id: `${category_id}`,
                category_name: `${category_name}`,
                is_calculated: `${is_calculated}`,
                monthly_budget: `${monthly_budget}`,
                percentage: `${percentage}`,
            }, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            //console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    }

    const deleteCategory = async(category_id: number) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.delete(`${baseURL}${urlSegment}/${category_id}`, tokenHeader)
            setData(response);
        }catch(error) {
            setError(true);
            //console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    }

    const getCategoriesByIncome = async(income_id: number) => {
        try{
            setLoading(true);
            setError(false);
            const response = await axios.get(`${baseURL}${urlSegment}/${income_id}`, tokenHeader);
            setData(response);
        } catch(error) {
            setError(true);
            //console.log(error);
        } finally {
            setLoading(false);
            return data;
        }
    }

    return {postBudget, getCategories, editCategory, deleteCategory, getCategoriesByIncome}
    
};

export default useBudget;