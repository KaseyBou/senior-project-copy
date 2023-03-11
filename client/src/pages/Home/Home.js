
//css
import './Home.css';

//components
import ColumnBox from '../../components/ColumnBox/ColumnBox'

//imports
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import Cookies from "universal-cookie";
import { isExpired} from "react-jwt";
const cookies = new Cookies();

const Home = () => {

    //Initializing
    const navigate = useNavigate();

    useEffect(() => {
          if(isExpired(cookies.get("TOKEN"))) {
  
            cookies.remove("TOKEN");
            navigate("/")
          } else {
            navigate("/Dashboard")
          }
  
      },[])

    //returning JSX
    return (
        <>

            <div className="container overflow-hidden">
                <div className=''>
                    <div className="row">
                        <ColumnBox pictureFilePath="/grey.png" altText="Filler" title="About" text="Financial Planner is a powerful web application that allows you to monitor your finances on the fly. We created a financial planner because of the huge inconvenience of having to spend a lot of money on financial planning services. You will also gain full control over your finance and no longer have to rely on other services to be able to manage your budget, expenditures, savings, and income. We also made financial planner cost free so anybody can get started and use our websites tools. What sets our application apart from the other tools available out there is the ability to create your own custom specialized account according to the information you give it. We also have graphs to show a graphical representation of the data; for example a graph to represent your budget or savings. Furthermore, we added tools to handle your expenditures and income so you no longer have to use difficult Excel sheets to calculate all of your spending. Once you create an account, you will gain access to all of our tools with just a few clicks away and manage your finances in an organized and simple user interface. Once you’ve created an account, you will be able to use our tools with a simple navigation system that’s built in the application. Additionally, we also have an account recovery option just in case you have lost your password. Now that you know what we are all about, go create an account right now to get started and enjoy our financial planner web application!" 
                        />
                    </div>
                    <div className="row">
                        <ColumnBox title="Budget" text="Allows for a seamless experience when setting up a budget. You’ll be able to add budget categories (ex. Car maintenance) and see your overall budget for that current month." >
                            <img src="/budget-transparent.png" alt="Filler"/>
                        </ColumnBox>

                        <ColumnBox title="Expenditures" text="Observe your spending patterns. tools that help you better manage your expenditures, such as the ability to add expenses or bills.">
                            <img src="/expenditures-tranparent.png" alt="Filler"/>
                        </ColumnBox>

                        <ColumnBox title="Savings" text="With the help of our financial planner web tool, keep track of your savings. Your accounts, deposits, and sources of income are all visible here. Your current total savings will be displayed for you.">
                            <img src="/savings-transparent.png" alt="Filler"/>
                        </ColumnBox>

                        <ColumnBox title="Income" text="Keep track of all of your sources of income. Here, you can view all of your earnings broken down by date, company, and amount.">
                            <img src="/income-transparent.png" alt="Filler"/>
                        </ColumnBox>
                    </div>
                </div>
            </div>

        </>
        );
}

export default Home