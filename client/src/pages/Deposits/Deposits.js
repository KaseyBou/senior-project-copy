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

    // income hook instance
    const { postDeposit, getDeposit, editDeposit, deleteDeposit } = useDeposits("Deposits");
    // income state
    const [deposits, setDeposits] = useState(null);

    // account hook instance
    const {getAccounts} = useAccount("BankAccount")
    // list of accounts for form
    const [accountSelectList, setSelectAccountList] = useState(null);

    //list of accounts
    const [accountList, setAccountList] = useState([]);

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
    const fetchDeposits = () => {
        //getting and setting deposits for deposit list
        getDeposit().then((data) => {
            setDeposits(data.data.map((deposit) => {
                let theDate = new Date(deposit.date);
                let dateString = theDate.getMonth()+1 + " / " + theDate.getDate() + " / " + (theDate.getYear()+1900);
                let accountName;

                //grabbing bank account name for display
                for(let i = 0; i < accountList.length; i++) {
                    if(accountList[i][0] === deposit.account_id) {
                        accountName = accountList[i][1];
                    }
                }
                    return(
                    <DataRow
                    title=""
                    labels={["Source: ", "Account: ", "Date: ", "Amount: "]}
                    rows={[deposit.source, accountName, dateString, '$' + deposit.total_amount]}
                    HandleEdit={() => handleShowEdit(deposit.deposit_id)}
                    HandleDelete={() => handleShowDelete(deposit.deposit_id)}
                />
                )
            }));
        })
    }

    // on render, get list of Deposits
    useEffect(() => {

        //verifying user is logged in
        if(cookies.get("TOKEN") === undefined) {
            navigate("/");
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

        }).then(fetchDeposits())

        
    },[])

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);

        // load existing data into form
        getDeposit().then((data) => {
            for(let deposit of data.data){
                if(deposit.deposit_id === id){
                    document.getElementById("editSource").value = deposit.source;
                    document.getElementById("editDepositAccount").value = deposit.account_id;
                    document.getElementById("editDepositDate").value = deposit.date.toString().substring(0, 10);
                    document.getElementById("editDepositAmount").value = deposit.total_amount;
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

    const addInputHandler = () => {
        setAddSource(document.getElementById('addSource').value)
        setAddAccount(document.getElementById('addDepositAccount').value);
        setAddDepositDate(document.getElementById('addDepositDate').value);
        setAddAmount(document.getElementById('addDepositAmount').value);

        if(addAmount < 1 && !addAmount) {
            setAddAmountWarning("Amount must be greater than 0")
        } else {
            setAddAmountWarning("")
        }
        setConfirmAddAmount(document.getElementById('addConfirmAmount').value);

    }

    const editInputHandler = () => {
        setEditSource(document.getElementById('editSource').value)
        setEditAccount(document.getElementById('editDepositAccount').value);
        setEditDepositDate(document.getElementById('editDepositDate').value);
        setEditAmount(document.getElementById('editDepositAmount').value);
        if(editAmount < 1) {
            setEditAmountWarning("Amount must be greater than 0")
        } else {
            setEditAmountWarning("")
        }
        setConfirmEditAmount(document.getElementById('editConfirmAmount').value);
    }

    const passwordInputHandler = () => {
        setUserPassword(document.getElementById('userPassword').value);
    }

    //  add deposit
    const addDeposit = () => {
        
        if(addSource && addAccount && addDepositDate && addAmount && !addSourceWarning && !addAccountWarning && !addDepositDateWarning && !addAmountWarning && addAmount === confirmAddAmount) {
            postDeposit(addSource, addDepositDate, addAmount, addAccount);
            handleCloseAdd();
            setAddSource(null)
            setAddAccount(null);
            setAddDepositDate(null);
            setAddAmount(null);
            setConfirmAddAmount(null);
            fetchDeposits();
        }
    }

    // post update
    const changeDeposit = () => {

        if(editSource && editAccount && editDepositDate && editAmount && !editSourceWarning && !editAccountWarning && !editDepositDateWarning && !editAmountWarning && editAmount === confirmEditAmount) {
            editDeposit(localStorage.getItem("editing"),  editAccount, editSource, editDepositDate, editAmount);
            handleCloseEdit();
            fetchDeposits();
        }
    }

    // post delete
    const removeDeposit = () => {
        deleteDeposit(localStorage.getItem("deleting"))
        handleCloseDelete();
        fetchDeposits();
    }

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
                        selectFields={[accountSelectList]}
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
                        warning={[editSourceWarning, editAccountWarning, editDepositDateWarning, editAmountWarning, confirmEditAmountWarning]}
                        warningIDs={['editSourceWarning', 'editDepositAccountWarning', 'editDepositDateWarning', 'editAmountWarning', 'confirmEditAmountWarning']}
                        selectFields={[accountSelectList]}
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