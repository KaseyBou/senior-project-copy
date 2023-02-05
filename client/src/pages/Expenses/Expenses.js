import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
//import Loading from '../Loading/Loading';
import './Expenses.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';

import useBills from '../../hooks/useBills.tsx';
import useExpenditures from '../../hooks/useExpenditures.tsx';
import useAccount from '../../hooks/useAccount.tsx';
import useBudget from '../../hooks/useBudget.tsx';

const Expenses = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

     // bill hook instance
     const { postBill, getBills, editBill, deleteBill } = useBills("Bills");
     
     const { postExpenditure, getExpenditure, editExpenditure, deleteExpenditure} = useExpenditures("Expenditures")
    // account hook instance
    const {getAccounts} = useAccount("BankAccount")
    const { getCategories } = useBudget("Budget");

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
                    <DataRow
                    title=""
                    labels={["For: ", "Account: ", "Date: ", "Amount: ", "Category: "]}
                    rows={[expenditure.recipient, accountName, dateString, '$' + expenditure.total_amount, categoryName]}
                    HandleEdit={() => handleShowEdit(expenditure.expenditure_id)}
                    HandleDelete={() => handleShowDelete(expenditure.expenditure_id)}
                />
                )
            }
            ));
        })
        
    }

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);

        // load existing data into form
        getExpenditure().then((data) => {
            for(let expenditure of data.data){
                if(expenditure.expenditure_id === id){
                    document.getElementById("forEdit").value = expenditure.recipient;
                    document.getElementById("totalSpentEdit").value = expenditure.total_amount;
                    document.getElementById("dateEdit").value = expenditure.date.toString().substring(0, 10);
                    document.getElementById("categoryEdit").value = expenditure.budget_id;
                    document.getElementById("accountEdit").value = expenditure.account_id;
                }
            }
            // run validation to clear error messages
            editExpenseInputHandler();
        })
    }
    const [forEdit, setForEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [totalSpentEdit, setTotalSpentEdit] = useState('')
    const [categoryEdit, setCategoryEdit] = useState('');
    const [accountEdit, setAccountEdit] = useState('');

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setShowDelete(true);
        localStorage.setItem("deleting", id);
    }
    const [passwordDelete, setPasswordDelete] = useState('');

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //Values
    const [forAdd, setForAdd] = useState('');
    const [dateAdd, setDateAdd] = useState('');
    const [totalSpentAdd, setTotalSpentAdd] = useState('')
    const [categoryAdd, setCategoryAdd] = useState('');
    const [accountAdd, setAccountAdd] = useState('');
    //Warnings
    const [forAddWarning, setForAddWarning] = useState('');
    const [addDateWarning, setAddDateWarning] = useState('');
    const [totalSpentAddWarning, setTotalSpentAddWarning] = useState('')
    const [categoryAddWarning, setCategoryAddWarning] = useState('');
    const [accountAddWarning, setAccountAddWarning] = useState('');

    //handles updates to input's
    const addExpenseInputHandler = () =>{
        setForAdd(document.getElementById("forAdd").value);
        setDateAdd(document.getElementById("dateAdd").value)
        setTotalSpentAdd(document.getElementById("totalSpentAdd").value);
        setCategoryAdd(document.getElementById("categoryAdd").value);
        setAccountAdd(document.getElementById("accountAdd").value);

    }
    
    //handles updates to input's
    const editExpenseInputHandler = () =>{
        setForEdit(document.getElementById("forEdit").value);
        setDateEdit(document.getElementById("dateEdit").value)
        setTotalSpentEdit(document.getElementById("totalSpentEdit").value);
        setCategoryEdit(document.getElementById("categoryEdit").value);
        setAccountEdit(document.getElementById("accountEdit").value);

    }

    const deleteInputHandler = () =>{
        setPasswordDelete(document.getElementById("passwordDelete").value);
    }

    //Post expense to server
    const addExpense = () => {

        if(forAdd && dateAdd && totalSpentAdd && accountAdd && categoryAdd) {
            postExpenditure(forAdd, dateAdd, totalSpentAdd, accountAdd, categoryAdd);
            handleCloseAdd();
            fetchExpenses();
            setForAdd(null);
            setDateAdd(null)
            setTotalSpentAdd(null);
            setCategoryAdd(null);
            setAccountAdd(null);
        }
    }

    const editExpense = () => {
        console.log(forEdit, dateEdit, totalSpentEdit, accountEdit, categoryEdit)
        //if(forEdit.length !== null && dateEdit !== null && totalSpentEdit !== null && accountEdit !== null && categoryEdit !== null) {
        editExpenditure(localStorage.getItem("editing"), accountEdit, forEdit, dateEdit, totalSpentEdit, categoryEdit);
        handleCloseEdit();
        fetchExpenses();
        //}
    }

    // post delete
    const removeExpenses = () => {
        deleteExpenditure(localStorage.getItem("deleting"));
        handleCloseDelete();
        fetchExpenses();
    }
    
    //returning JSX
    return (
        <>
            <SearchBar/>
            <div id="ExpenseList">
                {expenditures}
            </div>

            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Expense</Button>
                <Modal buttonText="Add Expense" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Expense"
                        fields={['For', 'Date', 'Total Spent', 'Category', 'Account']}
                        fieldIDs={['forAdd', 'dateAdd', 'totalSpentAdd', 'categoryAdd', 'accountAdd']}
                        fieldTypes={['text', 'date', 'number', 'select', 'select']}
                        selectFields={[categorySelectList, selectAccountList]}
                        warning={[forAddWarning, addDateWarning, totalSpentAddWarning, categoryAddWarning, accountAddWarning]}
                        warningIDs={['forAddWarning', 'addDateWarning', 'totalSpentAddWarning', 'categoryAddWarning', 'accountAddWarning']}
                        onChange={addExpenseInputHandler}
                        submitAction={addExpense}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Expense"
                        fields={['For', 'Date', 'Total Spent', 'Category', 'Account']}
                        fieldIDs={['forEdit', 'dateEdit', 'totalSpentEdit', 'categoryEdit', 'accountEdit']}
                        fieldTypes={['text', 'date', 'number', 'select', 'select']}
                        selectFields={[categorySelectList, selectAccountList]}
                        warning={[forAddWarning, addDateWarning, totalSpentAddWarning, categoryAddWarning, accountAddWarning]}
                        warningIDs={['forAddWarning', 'addDateWarning', 'totalSpentAddWarning', 'categoryAddWarning', 'accountAddWarning']}
                        onChange={editExpenseInputHandler}
                        submitAction={editExpense}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <h2 className='text-center'>Confirm Deletion</h2>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={removeExpenses}>Confirm</Button>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Expenses