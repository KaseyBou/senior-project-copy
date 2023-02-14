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

    return {getInfo}
    
};

export default useReport;