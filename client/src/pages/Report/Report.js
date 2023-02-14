import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import CustomForm from '../../components/CustomForm/CustomForm';
import TableRow from '../../components/TableRow/TableRow';
//import Loading from '../Loading/Loading';
import './Report.css';

import useBills from '../../hooks/useBills.tsx';
import useExpenditures from '../../hooks/useExpenditures.tsx';
import useAccount from '../../hooks/useAccount.tsx';
import useBudget from '../../hooks/useBudget.tsx';

const Report = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    const { postExpenditure, getExpenditure, editExpenditure, deleteExpenditure} = useExpenditures("Expenditures")
    // account hook instance
    const {getAccounts} = useAccount("BankAccount")
    const { getCategories } = useBudget("Budget");


    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])

    const inputHandler = () => {

    }

    const getReport = () => {

    }

    // list of accounts
    const [accountList, setAccountList] = useState([]);
    const [selectAccountList, setSelectAccountList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [categorySelectList, setCategorySelectList] = useState([]);
     // income state

     const [expenditures, setExpenditures] = useState(null);

    //support functionality
    useEffect(() => {

        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

        //getting accounts for display and form
        getAccounts().then((accounts) => {

            //setting account select options
            setSelectAccountList(accounts.data.map((account) => {
                return <option value={account.account_id}>{account.account_name}</option>
            }))

            //setting account list **Push is not the correct method for adding to useState array
            accounts.data.map((account) => {
                //return setAccountList(accountList => [...accountList, {id: account.account_id, name: account.account_name}]);
                return accountList.push([account.account_id, account.account_name])
            })

        }).then(

        //get budget categories
        getCategories().then((categories) => {
            setCategorySelectList(categories.data.map((category) => {
                return <option value={category.budget_ID}>{category.category_name}</option>
            }))

            //setting category list **Push is not the correct method for adding to useState array
            categories.data.map((category) => {
                //return setAccountList(accountList => [...accountList, {id: account.account_id, name: account.account_name}]);
                return categoryList.push([category.budget_ID, category.category_name])
            })
        }).then(fetchExpenses()))

    },[])


    const fetchExpenses = async() => {

        getExpenditure().then((data) => {
            
            setExpenditures(data.data.map((expenditure) => {
                let theDate = new Date(expenditure.date);
                let dateString = theDate.getMonth()+1 + " / " + theDate.getDate() + " / " + (theDate.getYear()+1900);
                let accountName;
                let categoryName;

                //grabbing bank account name for display
                for(let i = 0; i < accountList.length; i++) {
                    if(accountList[i][0] === expenditure.account_id) {
                        accountName = accountList[i][1];
                    }
                }
                for(let i = 0; i < categoryList.length; i++) {
                    if(categoryList[i][0] === expenditure.budget_id) {
                        categoryName = categoryList[i][1];
                    }
                }

                return(
                    
                    <TableRow account={accountName} date={dateString} amount={expenditure.total_amount}/>
                 
                )
            }
            ));
        })
        
    }

    //returning JSX
    return (
        <>
            <CustomForm
                title='Register'
                fields={["Report Format", "Report Type", "Budget Categories", "Start Date", "End Date"]}
                fieldIDs={['reportFormat', 'reportType', 'reportCategories', 'startDate', 'endDate']}
                warning={['', '', '']}
                warningIDs={['', '', '']}
                fieldTypes={['select', 'select', 'select', 'date', 'date']}
                selectFields={[]}
                onChange={inputHandler}
                submitAction={getReport}
            ></CustomForm>

        </>
    );
}

export default Report