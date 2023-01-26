import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

//import Loading from '../Loading/Loading';
import './Report.css';
//import { useNavigate } from 'react-router-dom';

const Report = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();



    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])
    //returning JSX
    return (
        <>
            <h1>Report</h1>

        </>
    );
}

export default Report