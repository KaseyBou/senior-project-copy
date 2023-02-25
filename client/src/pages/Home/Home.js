
//import Loading from '../Loading/Loading';
import './Home.css';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
//import Button from '../../components/Button/Button'
//import { useNavigate } from 'react-router-dom';
//import Modal from '../../components/Modal/Modal';

const Home = () => {

    //Initializing
    //const navigate = useNavigate();

    //returning JSX
    return (
        <>

            <div className="container overflow-hidden">
                <div className=''>
                    <div className="row">
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="About" text="Would you like to monitor your financial situation? from setting a budget, conserving money, and maintaining tabs on your earnings? You don't want to pay a fortune for financial planning services. Do you desire complete financial control? So, stop searching now. All of that is addressed right here on our financial planner website." 
                        />
                    </div>
                    <div className="row">
                        <ColumnBox pictureFilePath="/budget-transparent.png" altText="Filler" title="Budget" text="Allows for a seamless experience when setting up a budget. You’ll be able to add budget categories (ex. Car maintenance) and see your overall budget for that current month." 
                        />
                        <ColumnBox pictureFilePath="/expenditures-tranparent.png" altText="Filler" title="Expenditures" text="Observe your spending patterns. tools that help you better manage your expenditures, such as the ability to add expenses or bills." 
                        />
                        <ColumnBox pictureFilePath="/savings-transparent.png" altText="Filler" title="Savings" text="With the help of our financial planner web tool, keep track of your savings. Your accounts, deposits, and sources of income are all visible here. Your current total savings will be displayed for you." 
                        />
                        <ColumnBox pictureFilePath="/income-transparent.png" altText="Filler" title="Income" text="Keep track of all of your sources of income. Here, you can view all of your earnings broken down by date, company, and amount." 
                        />
                    </div>
                </div>
            </div>

        </>
        );
}

export default Home