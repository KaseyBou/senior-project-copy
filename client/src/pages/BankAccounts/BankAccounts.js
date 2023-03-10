import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { isExpired} from "react-jwt";

//import Loading from '../Loading/Loading';
import './BankAccounts.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';

import useAccount from '../../hooks/useAccount.tsx';

import setRowColor from '../../utils/setRowColor';

const BankAccounts = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    // account hook instance
    const {addAccount, getAccounts, editAccount, deleteAccount} = useAccount("BankAccount")
    const [accountTypes, setAccountTypes] = useState([
        <option value='Savings'>Savings</option>, 
        <option value='Checking'>Checking</option>, 
        <option value='Other'>Other</option>]);
    const [accounts, setAccounts] = useState('');

        //add Account values & warnings
    //Values
    const [addBalance, setAddBalance] = useState('');
    const [addAccountName, setAddAccountName] = useState('');
    const [addAccountType, setAddAccountType] = useState('');
    const [addInterest, setAddInterest] = useState('');
    const [addMonthlyFees, setAddMonthlyFees] = useState('');
    //Warnings
    const [addBalanceWarning, setAddBalanceWarning] = useState('');
    const [addAccountNameWarning, setAddAccountNameWarning] = useState('');
    const [addAccountTypeWarning, setAddAccountTypeWarning] = useState('');
    const [addInterestWarning, setAddInterestWarning] = useState('');
    const [addMonthlyFeesWarning, setAddMonthlyFeesWarning] = useState('');

    //edit deposit values & warnings
    //Values
    const [editBalance, setEditBalance] = useState('');
    const [editAccountName, setEditAccountName] = useState('');
    const [editAccountType, setEditAccountType] = useState('');
    const [editInterest, setEditInterest] = useState('');
    const [editMonthlyFees, setEditMonthlyFees] = useState('');
    //Warnings
    const [editBalanceWarning, setEditBalanceWarning] = useState('');
    const [editAccountNameWarning, setEditAccountNameWarning] = useState('');
    const [editAccountTypeWarning, setEditAccountTypeWarning] = useState('');
    const [editInterestWarning, setEditInterestWarning] = useState('');
    const [editMonthlyFeesWarning, setEditMonthlyFeesWarning] = useState('');

    //password values warning
    const [userPassword, setUserPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

        // on render, get list of Deposits
        useEffect(() => {

            //verifying user is logged in
            if(cookies.get("TOKEN") === undefined || isExpired(cookies.get("TOKEN"))) {
                cookies.remove("TOKEN");
                navigate("/")
            }    
    
            fetchAccounts();
    
        },[])

    const fetchAccounts = () => {
        
        //Data Row Column Color
        setRowColor({color: "#498A67"})

        //getting and setting deposits for deposit list
        getAccounts().then((data) => {
            setAccounts(data.data.map((account) => {
                    return(
                    <DataRow
                    title=""
                    labels={["Name: ", "Account Type: ", "Balance: ", "Interest: ", "Monthly Fees:"]}
                    rows={[account.account_name, account.account_type, '$' + account.balance, account.interest + '%', '$' +account.monthlyFees]}
                    HandleEdit={() => handleShowEdit(account.account_id)}
                    HandleDelete={() => handleShowDelete(account.account_id)}
                />
                )
            }));
        })
    }
    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);

        // load existing data into form
        getAccounts().then((data) => {
            for(let account of data.data){
                if(account.account_id === id){
                    document.getElementById("bankNameEdit").value = account.account_name;
                    document.getElementById("accountTypeEdit").value = account.account_type;
                    document.getElementById("interestRateEdit").value = account.interest;
                    document.getElementById("monthlyFeesEdit").value = account.monthlyFees;
                    document.getElementById("balanceEdit").value = account.balance;
                }
            }
            // run validation to clear error messages
            editInputHandler();
        })
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setShowDelete(true);
        localStorage.setItem("deleting", id);
    }
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //handles updates to add functionality input's
    const addInputHandler = () =>{

        setAddAccountName(document.getElementById('bankName').value)
        setAddBalance(document.getElementById('balance').value);
        setAddAccountType(document.getElementById('accountType').value);
        setAddInterest(document.getElementById('interestRate').value);
        setAddMonthlyFees(document.getElementById('monthlyFees').value);

    }

    //handles updates to add functionality input's
    const editInputHandler = () =>{

        setEditAccountName(document.getElementById('bankNameEdit').value)
        setEditBalance(document.getElementById('balanceEdit').value);
        setEditAccountType(document.getElementById('accountTypeEdit').value);
        setEditInterest(document.getElementById('interestRateEdit').value);
        setEditMonthlyFees(document.getElementById('monthlyFeesEdit').value);

    }

            //handles updates to add functionality input's
    const deleteInputHandler = () =>{

        setUserPassword(document.getElementById('userPassword').value)

    }

    const postAccount = () => {

        if(addAccountName === '') {
            setAddAccountNameWarning("Must Enter Account Name")
        } else {
            setAddAccountNameWarning("")
        }

        if(addInterest === '') {
            setAddInterestWarning("Must Enter Interest Rate")
        } else {
            setAddInterestWarning("")
        }

        if(addMonthlyFees === '') {
            setAddMonthlyFeesWarning("Must Enter Monthly Account Fees")
        } else {
            setAddMonthlyFeesWarning("")
        }

        if(addBalance === '') {
            setAddBalanceWarning("Must Enter Account Balance")
        } else {
            setAddBalanceWarning("")
        }

        if(addAccountName && addAccountType && addInterest && addMonthlyFees && addBalance && !addAccountNameWarning && !addAccountTypeWarning && !addInterestWarning && !addMonthlyFeesWarning && !addBalanceWarning) {

            addAccount(addAccountName, addAccountType, addInterest, addMonthlyFees, addBalance );
            handleCloseAdd();
            setAddAccountName(null)
            setAddBalance(null);
            setAddAccountType(null);
            setAddInterest(null);
            setAddMonthlyFees(null);

            fetchAccounts();
        }

    }

    // edit account
    const updateAccount = () => {

        if(editAccountName === '') {
            setEditAccountNameWarning("Must Enter Account Name")
        } else {
            setEditAccountNameWarning("")
        }

        if(editInterest === '') {
            setEditInterestWarning("Must Enter Interest Rate")
        } else {
            setEditInterestWarning("")
        }

        if(editMonthlyFees === '') {
            setEditMonthlyFeesWarning("Must Enter Monthly Account Fees")
        } else {
            setEditMonthlyFeesWarning("")
        }

        if(editBalance === '') {
            setEditBalanceWarning("Must Enter Account Balance")
        } else {
            setEditBalanceWarning("")
        }

        if(editAccountName && editAccountType && editInterest && editMonthlyFees && editBalance && !editAccountNameWarning && !editAccountTypeWarning && !editInterestWarning && !editMonthlyFeesWarning && !editBalanceWarning) {
            editAccount(localStorage.getItem("editing"),  editAccountName, editAccountType, editInterest, editMonthlyFees, editBalance );
            handleCloseEdit();
            fetchAccounts();
        }
        
    }

    // account delete
    const removeAccount = () => {
        deleteAccount(localStorage.getItem("deleting"))
        handleCloseDelete();
        fetchAccounts();
    }

    //returning JSX
    return (
        <>
            <h1>Accounts</h1>
            <div id="BankAccountList">
                {accounts}
            </div>
            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Bank Account</Button>
                <Modal buttonText="Add Account" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Account"
                        fields={['Bank', 'Account Type', 'Interest Rate %', 'Monthly Account Fees ', 'Balance']}
                        fieldIDs={['bankName', 'accountType', 'interestRate', 'monthlyFees', 'balance']}
                        warning={[addAccountNameWarning, addAccountTypeWarning, addInterestWarning, addMonthlyFeesWarning, addBalanceWarning]}
                        warningIDs={['bankNameWarning', 'accountTypeWarning', 'interestRateWarning', 'monthlyFeeWarning', 'balanceWarning']}
                        fieldTypes={[ 'text', 'select', 'number', 'number', 'number']}
                        selectFields={[accountTypes]}
                        onChange={addInputHandler}
                        submitAction={postAccount}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Account"
                        fields={['Bank', 'Account Type', 'Interest Rate', 'Monthly Account Fees', 'Balance']}
                        fieldIDs={['bankNameEdit', 'accountTypeEdit', 'interestRateEdit', 'monthlyFeesEdit', 'balanceEdit']}
                        warning={[editAccountNameWarning, editAccountTypeWarning, editInterestWarning, editMonthlyFeesWarning, editBalanceWarning]}
                        warningIDs={['bankNameWarningEdit', 'accountTypeWarningEdit', 'monthlyFeeWarningEdit', 'balanceWarningEdit']}
                        fieldTypes={[ 'text', 'select', 'number', 'number', 'number']}
                        selectFields={[accountTypes]}
                        onChange={editInputHandler}
                        submitAction={updateAccount}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                <h2 className='text-center'>Confirm Deletion</h2>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={removeAccount}>Confirm</Button>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default BankAccounts