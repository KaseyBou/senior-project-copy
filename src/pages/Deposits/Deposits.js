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
import useBudget from '../../hooks/useBudget.tsx';
import setRowColor from '../../utils/setRowColor';

const Deposit = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    // income hook instance
    const { postDeposit, getDeposit, editDeposit, deleteDeposit } = useDeposits("Deposits");

    // income state
    const [deposits, setDeposits] = useState(null);
    const [fullDeposits, setFullDeposits] = useState(null);

    // account hook instance
    const {getAccounts} = useAccount("BankAccount")

    const { getCategories } = useBudget("Budget");

    // list of accounts for form
    const [accountSelectList, setSelectAccountList] = useState(null);

    //list of accounts
    const [accountList, setAccountList] = useState([]);

    // list of budgets
    const [categoryList, setCategorySelectList] = useState(null);

    //add deposit values & warnings
    //Values
    const [addSource, setAddSource] = useState('');
    const [addAccount, setAddAccount] = useState('');
    const [addDepositDate, setAddDepositDate] = useState('');
    const [addAmount, setAddAmount] = useState('');
    const [addBudget, setAddBudget] = useState('');
    //Warnings
    const [addSourceWarning, setAddSourceWarning] = useState('');
    const [addAccountWarning, setAddAccountWarning] = useState('');
    const [addDepositDateWarning, setAddDepositDateWarning] = useState('');
    const [addAmountWarning, setAddAmountWarning] = useState('');
    const [addBudgetWarning, setAddBudgetWarning] = useState('');

    //edit deposit values & warnings
    //Values
    const [editSource, setEditSource] = useState('');
    const [editAccount, setEditAccount] = useState('');
    const [editDepositDate, setEditDepositDate] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editBudget, setEditBudget] = useState('');
    //Warnings
    const [editSourceWarning, setEditSourceWarning] = useState('');
    const [editAccountWarning, setEditAccountWarning] = useState('');
    const [editDepositDateWarning, setEditDepositDateWarning] = useState('');
    const [editAmountWarning, setEditAmountWarning] = useState('');
    const [editBudgetWarning, setEditBudgetWarning] = useState('');

    //password values warning
    const [userPassword, setUserPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    const renderRows = (data) => {
        setDeposits(data.map((deposit) => {
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
    }

    //Initialization
    const fetchDeposits = () => {
        //Data Row Column Color
        setRowColor({color: "#A0C697"})

        //getting and setting deposits for deposit list
        getDeposit().then((data) => {
            setFullDeposits(data.data);
            renderRows(data.data);
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
        });
        
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
                    document.getElementById("editBudget").value = deposit.budget_id;
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
        setAddBudget(document.getElementById('addBudget').value);
        if(addAmount < 1 && !addAmount) {
            setAddAmountWarning("Amount must be greater than 0")
        } else {
            setAddAmountWarning("")
        }

    }

    const editInputHandler = () => {
        setEditSource(document.getElementById('editSource').value)
        setEditAccount(document.getElementById('editDepositAccount').value);
        setEditDepositDate(document.getElementById('editDepositDate').value);
        setEditAmount(document.getElementById('editDepositAmount').value);
        setEditBudget(document.getElementById('editBudget').value);
        if(editAmount < 1) {
            setEditAmountWarning("Amount must be greater than 0")
        } else {
            setEditAmountWarning("")
        }
    }

    const passwordInputHandler = () => {
        setUserPassword(document.getElementById('userPassword').value);
    }

    //  add deposit
    const addDeposit = () => {
        
        if(addSource && addAccount && addDepositDate && addAmount && !addSourceWarning && !addAccountWarning && !addDepositDateWarning && !addAmountWarning) {
            postDeposit(addSource, addDepositDate, addAmount, addAccount, addBudget);
            handleCloseAdd();
            setAddSource(null)
            setAddAccount(null);
            setAddDepositDate(null);
            setAddAmount(null);
            fetchDeposits();
        }
    }

    // post update
    const changeDeposit = () => {

        if(editSource && editAccount && editDepositDate && editAmount && !editSourceWarning && !editAccountWarning && !editDepositDateWarning && !editAmountWarning) {
            editDeposit(localStorage.getItem("editing"),  editAccount, editSource, editDepositDate, editAmount, editBudget);
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
            <SearchBar
                placeholder='Deposit Source'
                fieldID="search"
                onChange={() => {
                    // copy full list into local var
                    var copy = fullDeposits.slice();

                    // drop all entries that don't contain search query
                    for(var i = 0; i < copy.length; i++){
                        if(!copy[i].source.toLowerCase().includes(document.getElementById('search').value.toLowerCase())){
                            copy.splice(i, 1);
                            i--; // need to move back one to avoid skipping after deletion
                        }
                    }

                    // rerender
                    renderRows(copy);
                }}
            />
            <div id="DepositList">
                {deposits}
            </div>
            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Deposit</Button>
                <Modal buttonText="Add Deposit" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Deposit"
                        fields={['Source', 'Account', 'Deposit Date', 'Amount', 'Budget Category']}
                        fieldIDs={['addSource','addDepositAccount', 'addDepositDate', 'addDepositAmount', 'addBudget']}
                        fieldTypes={['text', 'select', 'date', 'number', 'select']}
                        warning={[addSourceWarning, addAccountWarning, addDepositDateWarning, addAmountWarning, addBudgetWarning]}
                        warningIDs={['addSourceWarning', 'addDepositAccountWarning', 'addDepositDateWarning', 'addAmountWarning', 'addBudgetWarning']}
                        selectFields={[accountSelectList, categoryList]}
                        onChange={addInputHandler}
                        submitAction={addDeposit}
                    />

                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Deposit"
                        fields={['Source', 'Account', 'Deposit Date', 'Amount', 'Budget Category']}
                        fieldIDs={['editSource', 'editDepositAccount', 'editDepositDate', 'editDepositAmount', 'editBudget']}
                        fieldTypes={['text', 'select', 'date', 'number', 'select']}
                        warning={[editSourceWarning, editAccountWarning, editDepositDateWarning, editAmountWarning, editBudgetWarning]}
                        warningIDs={['editSourceWarning', 'editDepositAccountWarning', 'editDepositDateWarning', 'editAmountWarning', 'editBudgetWarning']}
                        selectFields={[accountSelectList, categoryList]}
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