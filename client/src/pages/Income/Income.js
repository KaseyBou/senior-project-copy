import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

//import Loading from '../Loading/Loading';
import './Income.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';
import useIncome from '../../hooks/useIncome.tsx';
import useAccount from '../../hooks/useAccount.tsx';
import useBudget from '../../hooks/useBudget.tsx';

import setRowColor from '../../utils/setRowColor';

const Income = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    // income hook instance
    const { postIncome, getIncomes, editIncome, deleteIncome } = useIncome("Income");

    // account hook instance
    const {postAccount, postDeleteAccount, getAccounts} = useAccount("BankAccount")

    // budget hook instance
    const {postBudget, getCategories, editCategory, deleteCategory, getCategoriesByIncome} = useBudget("Budget");

    // income state
    const [incomes, setIncomes] = useState(null);
    // list of accounts
    const [accountList, setAccountList] = useState(null);

    // list of budget categories
    const [budgetList, setBudgetList] = useState(null);

    // redirect if not logged in
    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])

    // on render, get list of incomes
    const fetchIncomeList = () => {
        
        //Data Row Column Color
        setRowColor({color: "#668F6D"})

        getIncomes().then((data) => {
            setIncomes(data.data.map((income) => {
                let date = new Date(income.pay_day);
                let dateString = date.getMonth()+1 + " / " + date.getDate() + " / " + (date.getYear()+1900);
                return(
                    <DataRow
                    title={income.title}
                    labels={["Gross Pay: ", "Next Pay Date: ", "Pay Frequency: "]}
                    rows={[income.gross_pay, dateString, income.pay_frequency]}
                    HandleEdit={() => handleShowEdit(income.income_id)}
                    HandleDelete={() => handleShowDelete(income.income_id)}
                />
                )
            }));
        })
    }
    useEffect(fetchIncomeList, [])

    //generate dropdown list of accounts and checkboxes for budgets, add it to add and edit forms
    useEffect(() => {
        getAccounts().then((accounts) => {
            setAccountList(accounts.data.map((account) => {
                return <option value={account.account_id}>{account.account_name}</option>
            }))
        })

        getCategories().then((budgets) => {
            setBudgetList(budgets.data.map((budget) => {
                if(budget.is_calculated){
                    return <tr>
                        <td>
                            <label htmlFor={"budget_" + budget.budget_ID}>{budget.category_name}</label>
                        </td>
                        <td>
                            <input type="checkbox" text={budget.category_name} value={budget.budget_ID} id={"budget_" + budget.budget_ID} name={"budget_" + budget.budget_ID} className="budgetCheckbox"/>
                        </td>
                        <td>
                            <input type="text" id={"percentage_" + budget.budget_ID} className="budgetPercentage"/>%
                        </td>
                    </tr>
                } else {
                    return null;
                }
            }))
        })
    }, [])

    //generate dropdown list of accounts, add it to add and edit forms
    useEffect(() => {
        getAccounts().then((accounts) => {
            setAccountList(accounts.data.map((account) => {
                return <option value={account.account_id}>{account.account_name}</option>
            }))
        })
    }, [])

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => {
        setShowEdit(false);
        fetchIncomeList();
    }
    const handleShowEdit = async(id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);

        // load list of currently connected budgets
        getCategoriesByIncome(id).then((data) => {
            // get array of checkboxes and percentage inputs
            // let budgetCheckboxes = document.getElementsByClassName("budgetCheckbox");
            // let budgetPercentages = document.getElementsByClassName("budgetPercentage");
            console.log(data.data);
            for(let category of data.data){
                console.log(category.budget_ID);
                console.log(category.conn_percentage);
                document.getElementById('budget_' + category.budget_ID).checked = true;
                document.getElementById('percentage_' + category.budget_ID).value = category.conn_percentage;
            }
        })

        // load existing data into form
        getIncomes().then((data) => {
            for(let entry of data.data){
                if(entry.income_id === id){
                    document.getElementById("grossPayEdit").value = entry.gross_pay;
                    document.getElementById("payFrequencyEdit").value = entry.pay_frequency;
                    document.getElementById("payDateEdit").value = entry.pay_day.toString().substring(0, 10);
                    document.getElementById("accountEdit").value = entry.account_id;
                    console.log(entry);
                }
            }
            // run validation to clear error messages
            editInputHandler();
        })
    }
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => {
        setShowDelete(false);
        fetchIncomeList();
    }
    const handleShowDelete = (id) => {
        setShowDelete(true);
        localStorage.setItem("deleting", id);
    }
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => {
        setShowAdd(false);
        setGrossPayAddWarning('');
        setAccountAddWarning('');
        setPayDateAddWarning('');
        setPayFrequencyAddWarning('');
        fetchIncomeList();
    }
    const handleShowAdd = () => setShowAdd(true);

    // form value states
    const [grossPayAdd, setGrossPayAdd] = useState('');
    const [payFrequencyAdd, setPayFrequencyAdd] = useState('')
    const [payDateAdd, setPayDateAdd] = useState(new Date());
    const [accountAdd, setAccountAdd] = useState('');

    const [grossPayEdit, setGrossPayEdit] = useState('');
    const [payFrequencyEdit, setPayFrequencyEdit] = useState('')
    const [payDateEdit, setPayDateEdit] = useState('');
    const [accountEdit, setAccountEdit] = useState('');

    const [password, setPassword] = useState('');

    // form warning states
    const [grossPayAddWarning, setGrossPayAddWarning] = useState('');
    const [payFrequencyAddWarning, setPayFrequencyAddWarning] = useState('');
    const [payDateAddWarning, setPayDateAddWarning] = useState('');
    const [accountAddWarning, setAccountAddWarning] = useState('');
    const [grossPayEditWarning, setGrossPayEditWarning] = useState('');
    const [payFrequencyEditWarning, setPayFrequencyEditWarning] = useState('');
    const [payDateEditWarning, setPayDateEditWarning] = useState('');
    const [accountEditWarning, setAccountEditWarning] = useState('');

    //Initialization
    //const navigate = useNavigate();

    //handles updates to input's
    const editInputHandler = () =>{
        setPayDateEdit(document.getElementById("payDateEdit").value);
        setPayFrequencyEdit(document.getElementById("payFrequencyEdit").value);
        setGrossPayEdit(document.getElementById("grossPayEdit").value);
        setAccountEdit(document.getElementById("accountEdit").value);
    }

    //handles updates to inputs
    const addInputHandler = () =>{
        setPayDateAdd(document.getElementById("payDateAdd").value);
        setPayFrequencyAdd(document.getElementById("payFrequencyAdd").value);
        setGrossPayAdd(document.getElementById("grossPayAdd").value);
        setAccountAdd(document.getElementById("accountAdd").value);
    }

    // validation effect hooks
    // ADD VALIDATION
    useEffect(() => {
        let now = new Date(Date.now());
        let nowString = now.getMonth()+1 + "/" + now.getDate() + "/" + (now.getYear()+1900);
        if(new Date(payDateAdd).getTime() < new Date(nowString).getTime() && document.getElementById("payDateAdd") && document.getElementById("payDateAdd").value){
            setPayDateAddWarning(`Next pay date cannot be on or before ${nowString}`);
        } else {
            setPayDateAddWarning('');
        }

        if(payFrequencyAdd < 1 && document.getElementById("payFrequencyAdd") && document.getElementById("payFrequencyAdd").value){
            setPayFrequencyAddWarning('Pay frequency cannot be less than 1');
        } else {
            setPayFrequencyAddWarning('');
        }

        if(grossPayAdd < 1 && document.getElementById("grossPayAdd") && document.getElementById("grossPayAdd").value){
            setGrossPayAddWarning('Gross pay cannot be less than 1');
        } else {
            setGrossPayAddWarning('');
        }
    
    }, [payDateAdd, payFrequencyAdd, grossPayAdd])

    // EDIT VALIDATION
    useEffect(() => {
        let now = new Date(Date.now());
        let nowString = now.getMonth()+1 + "/" + now.getDate() + "/" + (now.getYear()+1900);
        if(new Date(payDateEdit).getTime() < new Date(nowString).getTime() && document.getElementById("payDateEdit") && document.getElementById("payDateEdit").value){
            setPayDateEditWarning(`Next pay date cannot be on or before ${nowString}`);
        } else {
            setPayDateEditWarning('');
        }

        if(payFrequencyEdit < 1 && document.getElementById("payFrequencyEdit") && document.getElementById("payFrequencyEdit").value){
            setPayFrequencyEditWarning('Pay frequency cannot be less than 1');
        } else {
            setPayFrequencyEditWarning('');
        }

        if(grossPayEdit < 1 && document.getElementById("grossPayEdit") && document.getElementById("grossPayEdit").value){
            setGrossPayEditWarning('Gross pay cannot be less than 1');
        } else {
            setGrossPayEditWarning('');
        }
    
    }, [payDateEdit, payFrequencyEdit, grossPayEdit])

    //handles updates to input's
    const deleteInputHandler = () =>{
        setPassword(document.getElementById("password").value);
    }

    // post Income to server
    const addIncome = () => {
        // make sure no syntax errors are present and nothing is blank
        if(accountAdd && grossPayAdd && payDateAdd && payFrequencyAdd
        && !accountAddWarning && !grossPayAddWarning && !payFrequencyAddWarning && !payDateAddWarning){
            // get list of checked budgets
            let budgetDict = {};
            let budgetCheckboxes = document.getElementsByClassName("budgetCheckbox");
            let budgetPercentages = document.getElementsByClassName("budgetPercentage");
            for(var i = 0; i < budgetCheckboxes.length; i++){
                if(budgetCheckboxes[i].checked){
                    budgetDict[budgetCheckboxes[i].id] = budgetPercentages[i].value;
                }
            }

            postIncome(accountAdd, grossPayAdd, payDateAdd, payFrequencyAdd, budgetDict);
            handleCloseAdd();

            // clear form data from state
            setAccountAdd(null);
            setGrossPayAdd(null);
            setPayDateAdd(null);
            setPayFrequencyAdd(null);
        }
    }

    // post update
    const changeIncome = () => {
        // make sure no syntax errors are present and nothing is blank
        if(accountEdit && grossPayEdit && payDateEdit && payFrequencyEdit
        && !accountEditWarning && !grossPayEditWarning && !payFrequencyEditWarning && !payDateEditWarning){
            let budgetDict = {};
            let budgetCheckboxes = document.getElementsByClassName("budgetCheckbox");
            let budgetPercentages = document.getElementsByClassName("budgetPercentage");
            for(var i = 0; i < budgetCheckboxes.length; i++){
                if(budgetCheckboxes[i].checked){
                    budgetDict[budgetCheckboxes[i].id] = budgetPercentages[i].value;
                }
            }

            editIncome(localStorage.getItem("editing"), accountEdit, grossPayEdit, payDateEdit, payFrequencyEdit, budgetDict);
            handleCloseEdit();

            // clear form data from state
            setAccountEdit(null);
            setGrossPayEdit(null);
            setPayDateEdit(null);
            setPayFrequencyEdit(null);
        }
    }

    // post delete
    const removeIncome = () => {
        deleteIncome(localStorage.getItem("deleting"));
        handleCloseDelete();
    }

    //returning JSX
    return (
        <>
            <h1>Income</h1>
            <div id="IncomeList">
                {incomes}
            </div>
            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Income</Button>
                <Modal buttonText="Add Income" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    {/* TODO: convert account to string, create validation */}
                    <CustomForm
                        title="Add Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date', 'Account']}
                        fieldIDs={['grossPayAdd', 'payFrequencyAdd', 'payDateAdd', 'accountAdd']}
                        warning={[grossPayAddWarning, payFrequencyAddWarning, payDateAddWarning, accountAddWarning]}
                        warningIDs={['grossPayAddWarning', 'payFrequencyAddWarning','payDateAddWarning', 'accountAddWarning']}
                        fieldTypes={['number', 'number', 'date', 'select']}
                        selectFields={[accountList]}
                        onChange={addInputHandler}
                        submitAction={addIncome}
                    >
                        <table>
                            {budgetList}
                        </table>
                    </CustomForm>
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date', 'Account']}
                        fieldIDs={['grossPayEdit', 'payFrequencyEdit', 'payDateEdit', 'accountEdit']}
                        warning={[grossPayEditWarning, payFrequencyEditWarning, payDateEditWarning, accountEditWarning]}
                        warningIDs={['grossPayEditWarning', 'payFrequencyEditWarning','payDateEditWarning', 'accountEditWarning']}
                        fieldTypes={['number', 'number', 'date', 'select']}
                        selectFields={[accountList]}
                        onChange={editInputHandler}
                        submitAction={changeIncome}
                    >
                        <table>
                            {budgetList}
                        </table>
                    </CustomForm>
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete Income"
                        fields={['User Password']}
                        fieldIDs={['password']}
                        fieldTypes={['password']}
                        warning={['']}
                        warningIDs={['']}
                        onChange={deleteInputHandler}
                        submitAction={removeIncome}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Income