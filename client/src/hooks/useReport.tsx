import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const useReport = (urlSegment : string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const tokenHeader =
        {
            headers: {
                authorization: `${cookies.get("TOKEN")}`
            }
        }

    // get list of bank accounts
    const getInfo = async() => {
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

    const getSnapshotValues = async(type: string, idList: number[]) => {
        try {
            setLoading(true);
            setError(false);

            // need to use post to have request body
            const response = await axios.post(`${baseURL}ReportData`,{type: type, idList: idList}, tokenHeader)
            setData(response);
            return response;
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            //return data;
        }
    }

    const getDashboardData = async() => {
        try {
            setLoading(true);
            setError(false);

            // need to use post to have request body
            const response = await axios.get(`${baseURL}DashboardData`, tokenHeader);
            setData(response);
            return response;
        }catch(error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
            //return data;
        }
    }


    return {getInfo, getSnapshotValues, getDashboardData}
    
};

export default useReport;