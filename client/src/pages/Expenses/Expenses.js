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
import useBudget from '../../hooks/useBudget';

const Expenses = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

     // bill hook instance
     const { postBill, getBills, editBill, deleteBill } = useBills("Bills");
     
     const { postExpenditure, getExpenditure, editExpenditure, deleteExpenditure} = useExpenditures("Expenditures")
    // account hook instance
    const {postAccount, postDeleteAccount, getAccounts} = useAccount("BankAccounts")
    const {getCategories} = useBudget("Budget");

    // list of accounts
    const [accountList, setAccountList] = useState(null);
     // income state
     const [bills, setBills] = useState(null);
     const [expenditures, setExpenditures] = useState(null);
 
     // on render, get list of bills
     // TODO: use user ID from session data
     useEffect(() => {
         getBills(7).then((data) => {
             setBills(data);
             console.log(data.data);
         });
     }, [])

     useEffect(() => {

        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

        getExpenditure().then((data) => {
            setExpenditures(data.data.map((expenditure) => {
                return(
                    <DataRow
                    title=""
                    labels={["Recepient:", "Account:", "Date:", "Amount:", "Category"]}
                    rows={[expenditure.recepient, expenditure.account_id, expenditure.date, expenditure.total_amount, expenditure.budget_id]}
                    HandleEdit={() => handleShowEdit(expenditure.expenditure_id)}
                    HandleDelete={() => handleShowDelete(expenditure.expenditure_id)}
                />
                )
            }
            ));
        })
    },[])

    //generate dropdown list of accounts, add it to add and edit forms
    useEffect(() => {
        getAccounts().then((accounts) => {
            setAccountList(accounts.data.map((account) => {
                console.log(account);
                return <option value={account.account_id}>{account.account_name}</option>
            }))
        })
    },[])

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [forEdit, setForEdit] = useState('');
    const [totalSpentEdit, setTotalSpentEdit] = useState('')
    const [categoryEdit, setCategoryEdit] = useState('');
    const [notesEdit, setNotesEdit] = useState('');

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
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
        setDateAdd(document.getElementById(""))
        setTotalSpentAdd(document.getElementById("totalSpentAdd").value);
        setCategoryAdd(document.getElementById("categoryAdd").value);
        setAccountAdd(document.getElementById("accountAdd").value);

    }
    
    //handles updates to input's
    const editExpenseInputHandler = () =>{
        setForEdit(document.getElementById("forEdit").value);
        setTotalSpentEdit(document.getElementById("totalSpentEdit").value);
        setCategoryEdit(document.getElementById("categoryEdit").value);
        setNotesEdit(document.getElementById("notesEdit").value);

    }

    const deleteInputHandler = () =>{
        setPasswordDelete(document.getElementById("passwordDelete").value);
    }

    //Post expense to server
    const addExpense = () => {
        // TODO: get user ID from session var
        postExpenditure(forAdd, dateAdd, totalSpentAdd, accountAdd, categoryAdd);
        handleCloseAdd();
    }

    const editExpense = () => {

    }

    //Add Bill Modal Information
    const [showBillAdd, setShowBillAdd] = useState(false);
    const handleCloseBillAdd = () => setShowBillAdd(false);
    const handleShowBillAdd = () => setShowBillAdd(true);
    const [billNameAdd, setBillNameAdd] = useState('')
    const [billCompanyAdd, setBillCompanyAdd] = useState('');
    const [billAmountAdd, setBillAmountAdd] = useState('');
    const [billFrequencyAdd, setBillFrequencyAdd] = useState('')
    const [billPaymentDateAdd, setBillPaymentDateAdd] = useState('');
    const [billAccountAdd, setBillAccountAdd] = useState('');
    const [billBudgetAdd, setBillBudgetAdd] = useState('');

    //handles updates to input's
    const addBillInputHandler = () =>{
        setBillNameAdd(document.getElementById("billNameAdd").value);
        setBillCompanyAdd(document.getElementById("billCompanyAdd").value);
        setBillAmountAdd(document.getElementById("billAmountAdd").value);
        setBillPaymentDateAdd(document.getElementById("billPaymentDateAdd").value);
        setBillFrequencyAdd(document.getElementById("billFrequencyAdd").value);
        setBillAccountAdd(document.getElementById("billAccountAdd").value);
        setBillBudgetAdd(document.getElementById("billBudgetAdd").value);
    }

    //Edit Bill Modal
    const [showBillEdit, setShowBillEdit] = useState(false);
    const handleCloseBillEdit = () => setShowBillEdit(false);
    const handleShowBillEdit = () => setShowBillEdit(true);
    const [billNameEdit, setBillNameEdit] = useState('')
    const [billCompanyEdit, setBillCompanyEdit] = useState('');
    const [billInterestEdit, setBillInterestEdit] = useState('');
    const [billAmountEdit, setBillAmountEdit] = useState('');
    const [billPaymentEdit, setBillPaymentEdit] = useState('')
    const [billPaymentDateEdit, setBillPaymentDateEdit] = useState('');

    //handles updates to input's
    const editBillInputHandler = () =>{
        // setBillNameEdit(document.getElementById("billNameEdit").value);
        // setBillCompanyEdit(document.getElementById("billCompanyEdit").value);
        // setBillInterestEdit(document.getElementById("billInterestEdit").value);
        // setBillAmountEdit(document.getElementById("billAmountEdit").value);
        // setBillPaymentEdit(document.getElementById("billPaymentEdit").value);
        // setBillPaymentDateEdit(document.getElementById("billPaymentDateEdit").value);        
    }
    //Initialization
    //const navigate = useNavigate();

    // Post bill to server
    const addBill = () => {
        // TODO: get user ID from session var
        postBill(7, billNameAdd, billCompanyAdd, billFrequencyAdd, billPaymentDateAdd, billAmountAdd, billAccountAdd, billBudgetAdd);
        handleCloseBillAdd();
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
                        selectFields={accountList}
                        warning={[forAddWarning, addDateWarning, totalSpentAddWarning, categoryAddWarning, accountAddWarning]}
                        warningIDs={['forAddWarning', 'addDateWarning', 'totalSpentAddWarning', 'categoryAddWarning', 'accountAddWarning']}
                        onChange={addExpenseInputHandler}
                        submitAction={addExpense}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Add Expense"
                        fields={['For', 'Date', 'Total Spent', 'Category', 'Account']}
                        fieldIDs={['forEdit', 'dateEdit', 'totalSpentEdit', 'categoryEdit', 'accountEdit']}
                        fieldTypes={['text', 'date', 'number', 'select', 'select']}
                        selectFields={accountList}
                        warning={[forAddWarning, addDateWarning, totalSpentAddWarning, categoryAddWarning, accountAddWarning]}
                        warningIDs={['forAddWarning', 'addDateWarning', 'totalSpentAddWarning', 'categoryAddWarning', 'accountAddWarning']}
                        onChange={editExpenseInputHandler}
                        submitAction={editExpense}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete Deposit"
                        fields={['User Password']}
                        fieldIDs={['passwordDelete']}
                        fieldTypes={['password']}
                        warning={['']}
                        warningIDs={['passwordWarning']}
                        onChange={deleteInputHandler}
                        submitAction={''}
                    />
                </Modal>

                <Button onClick={handleShowBillAdd}>Add Bill</Button>
                <Modal buttonText="Add Bill" show={showBillAdd} handleShow={handleShowBillAdd} handleClose={handleCloseBillAdd}>
                    <CustomForm
                        title="Add Bill"
                        fields={['Bill Title', 'Bill Source', 'Amount', 'Next Due Date', 'Pay Frequency', 'Account', 'Budget', ]}
                        fieldIDs={['billNameAdd', 'billCompanyAdd', 'billAmountAdd', 'billPaymentDateAdd', 'billFrequencyAdd', 'billAccountAdd', 'billBudgetAdd']}
                        fieldTypes={['text', 'text', 'number', 'date', 'number', 'text', 'text']}
                        warning={['','','','','','','']}
                        warningIDs={['', '','', '','','','']}
                        onChange={addBillInputHandler}
                        submitAction={addBill}
                    />
                </Modal>

                <Modal buttonText="Edit Bill" show={showBillEdit} handleShow={handleShowBillEdit} handleClose={handleCloseBillEdit}>
                    <CustomForm
                        title="Edit Bill"
                        fields={['Bill Name', 'Company', 'Bill Type', 'Due Date', 'Reoccuring Bill', 'Interest', 'Amount', 'Payment', 'Payment Date', 'Reocurring Payment']}
                        fieldIDs={['billNameEdit', 'billCompanyEdit', 'billTypeEdit', 'billReoccuringEdit', 'billInterestEdit', 'billAmountEdit', 'billPaymentEdit', 'billPaymentDateEdit', 'billReocurringPaymentEdit']}
                        fieldTypes={['text', 'text', 'text', 'date', 'checkbox', 'number', 'number', 'number', 'date', 'checkbox']}
                        onChange={editBillInputHandler}
                        submitAction={handleCloseBillEdit}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Expenses