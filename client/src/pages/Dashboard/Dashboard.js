
//import Loading from '../Loading/Loading';
import './Dashboard.css';
import { redirect, useNavigate } from 'react-router-dom';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import Button from '../../components/Button/Button'
import Cookies from "universal-cookie";
import {useState, useEffect} from "react";

import useReport from '../../hooks/useReport.tsx';

import functions from '../../utils/functions';

import BarPlot from '../../graphing/BarPlot';
import ScatterPlot from '../../graphing/ScatterPlot';

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
        

    },[])

    // instantiate report hook
    const {getReportData, getDashboardData} = useReport('report');

    // states for dashboard report data
    const [budgetData, setBudgetData] = useState(null);
    const [savingsData, setSavingsData] = useState(null);
    const [billsData, setBillsData] = useState(null);

    // get dashboard report data
    useEffect(() => {
      getDashboardData().then(async (data) => {
        // convert budget into lists of x and y
        var budgetX = [];
        var budgetY = [];

        data.data.budgets.forEach(budget => {
          budgetX.push(budget.category_name);
          budgetY.push(budget.monthly_budget);
        });

        // get list of account IDs from balance
        var accountList = []
        data.data.balances.forEach(balance => {
          if(!accountList.includes(balance.account_id)){
            accountList.push(balance.account_id);
          }
        })

        // for each unique account ID, create a graph
        var savingsDataList = [];
        accountList.forEach((id) => {
          var xData = [];
          var yData = [];
          var label = '';

          data.data.balances.forEach((dataPoint) => {
              if(dataPoint.account_id === id){
                  xData.push(dataPoint.date);
                  yData.push(dataPoint.balance);
              }
          });

          savingsDataList.push({
              x: xData,
              y: yData,
              name: label,
              type: 'scatter'
          });
        })

        // convert list of upcoming bills into display elements
        
        setBudgetData({budgetX,budgetY})
        console.log(savingsDataList);
        setSavingsData(savingsDataList)
      });
    }, [])
 
    //returning JSX
    return (
        <>
            <h1>Dashboard</h1>

            <div class="container">
                <div class="row">
                    <ColumnBox title="Budget" text="Allows for a seamless experience when setting up a budget. You’ll be able to add budget categories (ex. Car maintenance) and see your overall budget for that current month." 
                    button={<Button text="Button" function={budget}/>}>
                      <BarPlot
                        width='300' height='200' margin='25'
                        xData={budgetData?budgetData.budgetX:null}
                        yData={budgetData?budgetData.budgetY:null}
                      />
                    </ColumnBox>

                    <ColumnBox title="Savings" text="With the help of our financial planner web tool, keep track of your savings. Your accounts, deposits, and sources of income are all visible here. Your current total savings will be displayed for you." 
                    button={<Button text="Button" function={savings}/>}>
                      <ScatterPlot
                        width='300' height='200' margin='25'
                        data={savingsData}
                        hideLegend
                      />
                    </ColumnBox>

                    <ColumnBox title="Bills" text="Keep track of all of your bills. Here, you can view all of your regular payments broken down by date, company, and amount." 
                    button={<Button text="Button" function={income}/>}>
                      <div id='upcomingBills'>
                        <h5>Upcoming Bills</h5>
                      </div>
                    </ColumnBox>
                </div>
            </div>
        </>
    );
    
}

export default Dashboard