
//import Loading from '../Loading/Loading';
import './Dashboard.css';
import { redirect, useNavigate } from 'react-router-dom';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import Button from '../../components/Button/Button'
import Cookies from "universal-cookie";
import {useEffect} from "react";

import functions from '../../utils/functions';

const cookies = new Cookies();

const Dashboard = () => {

    //Initializing
    const navigate = useNavigate();

    const budget = () => {
        navigate("/Budget");
      };
  
      const expenses = () => {
        navigate("/Expenses");
      };
  
      const savings = () => {
        navigate("/Savings");
      };
  
      const income = () => {
        navigate("/Income");
      };

    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
          navigate("/")
        }

        console.log(cookies.get("TOKEN"))
        

    },[])
 
    //returning JSX
    return (
        <>
            <h1>Dashboard</h1>

            <div class="container">
                <div class="row">
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Budget" text="Allows for a seamless experience when setting up a budget. You’ll be able to add budget categories (ex. Car maintenance) and see your overall budget for that current month." 
                    button={<Button text="Button" function={budget}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Expenditures" text="Observe your spending patterns. tools that help you better manage your expenditures, such as the ability to add expenses or bills." 
                    button={<Button text="Button" function={expenses}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Savings" text="With the help of our financial planner web tool, keep track of your savings. Your accounts, deposits, and sources of income are all visible here. Your current total savings will be displayed for you." 
                    button={<Button text="Button" function={savings}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Income" text="Keep track of all of your sources of income. Here, you can view all of your earnings broken down by date, company, and amount." 
                    button={<Button text="Button" function={income}/>}/>
                </div>
            </div>
        </>
    );
    
}

export default Dashboard