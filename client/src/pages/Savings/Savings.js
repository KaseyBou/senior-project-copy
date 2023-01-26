
//import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Savings.css';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
//import Modal from '../../components/Modal/Modal';
//import DataRow from '../../components/DataRow/DataRow';
//import CustomForm from '../../components/CustomForm/CustomForm';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import InformationDisplay from '../../components/InformationDisplay/InformationDisplay';

const Savings = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    const income = () => {
        navigate("/Income");
    };

    const bankAccounts = () => {
        navigate("/BankAccounts");
    };

    const deposits = () => {
        navigate("/Deposits");
      };

    
    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])
    //returning JSX
    return (
        <>
            <div className="container overflow-hidden">
                <div className='mt-5'>
                    <div className="row">
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" 
                        />
                        <InformationDisplay 
                            informationCategory1= "Current Total Savings:" 
                            information1= "test 1" 
                            informationCategory2= "Interest Earned:" 
                            information2= "test 2" 
                        />
                    </div>
                </div>
            </div>

            <div className='bottomTaskBar'>
                <Button onClick={bankAccounts}>View Accounts</Button>
                <Button onClick={deposits}>View Deposits</Button>
                <Button onClick={income}>View Income</Button>


            </div>
        </>
    );
}

export default Savings