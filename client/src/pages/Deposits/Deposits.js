import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
//import Loading from '../Loading/Loading';
import './Deposits.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';
import useDeposits from '../../hooks/useDeposits.tsx';
import useAccount from '../../hooks/useAccount.tsx';

const Deposit = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);
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

    //add deposit values & warnings
    //Values
    const [addSource, setAddSource] = useState('');
    const [addAccount, setAddAccount] = useState('');
    const [addDepositDate, setAddDepositDate] = useState('');
    const [addAmount, setAddAmount] = useState('');
    const [confirmAddAmount, setConfirmAddAmount] = useState('');
    //Warnings
    const [addSourceWarning, setAddSourceWarning] = useState('');
    const [addAccountWarning, setAddAccountWarning] = useState('');
    const [addDepositDateWarning, setAddDepositDateWarning] = useState('');
    const [addAmountWarning, setAddAmountWarning] = useState('');
    const [confirmAddAmountWarning, setConfirmAddAmountWarning] = useState('');

    //edit deposit values & warnings
    //Values
    const [editSource, setEditSource] = useState('');
    const [editAccount, setEditAccount] = useState('');
    const [editDepositDate, setEditDepositDate] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [confirmEditAmount, setConfirmEditAmount] = useState('');
    //Warnings
    const [editSourceWarning, setEditSourceWarning] = useState('');
    const [editAccountWarning, setEditAccountWarning] = useState('');
    const [editDepositDateWarning, setEditDepositDateWarning] = useState('');
    const [editAmountWarning, setEditAmountWarning] = useState('');
    const [confirmEditAmountWarning, setConfirmEditAmountWarning] = useState('');

    //password values warning
    const [userPassword, setUserPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');
    //Initialization
    //const navigate = useNavigate();

    const addInputHandler = () => {
        setAddSource(document.getElementById('addSource').value)
        setAddAccount(document.getElementById('addDepositAccount').value);
        setAddDepositDate(document.getElementById('addDepositDate').value);
        setAddAmount(document.getElementById('addDepositAmount').value);
        setConfirmAddAmount(document.getElementById('addConfirmAmount').value);

    }

    const editInputHandler = () => {
        setEditSource(document.getElementById('addSource').value)
        setEditAccount(document.getElementById('editDepositAccount').value);
        setEditDepositDate(document.getElementById('editDepositDate').value);
        setEditAmount(document.getElementById('editDepositAmount').value);
        setConfirmEditAmount(document.getElementById('editConfirmAmount').value);
    }

    const passwordInputHandler = () => {
        setUserPassword(document.getElementById('userPassword').value);
    }

     // income hook instance
     const { postDeposit, getDeposit, editDeposit, deleteDeposit } = useDeposits("Deposits");
    // income state
    const [deposits, setDeposits] = useState(null);

    // account hook instance
    const {postAccount, postDeleteAccount, getAccounts} = useAccount("BankAccounts")
    // list of accounts
    const [accountList, setAccountList] = useState(null);

    // post Income to server
    const addDeposit = () => {
        // TODO: get user ID from session variable
        //console.log(addSource, addDepositDate, addAmount, addAccount)
        postDeposit(addSource, addDepositDate, addAmount, addAccount);
        handleCloseAdd();
    }

    // post update
    const changeDeposit = () => {
        editDeposit(localStorage.getItem("editing"), editSource, editAccount, editDepositDate, editAmount)
        handleCloseEdit();
    }

    // post delete
    const removeDeposit = () => {
        deleteDeposit(localStorage.getItem("deleting"))
        handleCloseDelete();
    }

    // on render, get list of incomes
    // TODO: use user ID from session data
    useEffect(() => {

        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

        getDeposit().then((data) => {
            setDeposits(data.data.map((deposit) => {
                return(
                    <DataRow
                    title=""
                    labels={["Source:", "Account:", "Date:", "Amount:"]}
                    rows={[deposit.source, deposit.account_id, deposit.date, deposit.total_amount]}
                    HandleEdit={() => handleShowEdit(deposit.deposit_id)}
                    HandleDelete={() => handleShowDelete(deposit.deposit_id)}
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

    //returning JSX
    return (
        <>
            <SearchBar/>
            <div id="DepositList">
                {deposits}
            </div>
            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Deposit</Button>
                <Modal buttonText="Add Deposit" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Deposit"
                        fields={['Source', 'Account', 'Deposit Date', 'Amount', 'Confirm Amount']}
                        fieldIDs={['addSource','addDepositAccount', 'addDepositDate', 'addDepositAmount', 'addConfirmAmount']}
                        fieldTypes={['text', 'select', 'date', 'number', 'number']}
                        warning={[addSourceWarning, addAccountWarning, addDepositDateWarning, addAmountWarning, confirmAddAmountWarning]}
                        warningIDs={['addSourceWarning', 'addDepositAccountWarning', 'addDepositDateWarning', 'addAmountWarning', 'confirmAddAmountWarning']}
                        selectFields={accountList}
                        onChange={addInputHandler}
                        submitAction={addDeposit}
                    />

                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Deposit"
                        fields={['Source', 'Account', 'Deposit Date', 'Amount', 'Confirm Amount']}
                        fieldIDs={['editSource', 'editDepositAccount', 'editDepositDate', 'editDepositAmount', 'editConfirmAmount']}
                        fieldTypes={['text', 'select', 'date', 'number', 'number']}
                        warning={[editSource, editAccountWarning, editDepositDateWarning, editAmountWarning, confirmEditAmountWarning]}
                        warningIDs={['editSourceWarning', 'editDepositAccountWarning', 'editDepositDateWarning', 'editAmountWarning', 'confirmEditAmountWarning']}
                        selectFields={accountList}
                        onChange={editInputHandler}
                        submitAction={changeDeposit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete Deposit"
                        fields={['User Password']}
                        fieldIDs={['userPassword']}
                        fieldTypes={['password']}
                        warning={[passwordWarning]}
                        warningIDs={['passwordWarning']}
                        onChange={passwordInputHandler}
                        submitAction={removeDeposit}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Deposit