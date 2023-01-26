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

const Income = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    // income hook instance
    const { postIncome, getIncomes, editIncome, deleteIncome } = useIncome("Income");

    // income state
    const [incomes, setIncomes] = useState(null);

    // on render, get list of incomes
    // TODO: use user ID from session data
    useEffect(() => {
        getIncomes().then((data) => {
            setIncomes(data.data.map((income) => {
                return(
                    <DataRow
                    title={income.title}
                    labels={["Gross Pay: ", "Next Pay Date: ", "Pay Frequency: "]}
                    rows={[income.gross_pay, income.pay_day, income.pay_frequency]}
                    HandleEdit={() => handleShowEdit(income.income_id)}
                    HandleDelete={() => handleShowDelete(income.income_id)}
                />
                )
            }));
        })
    }, [])

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
    const handleCloseAdd = () => {
        setShowAdd(false);
        
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

    //Initialization
    //const navigate = useNavigate();

        //handles updates to input's
        const editInputHandler = () =>{
            setPayDateEdit(document.getElementById("payDateEdit").value);
            setPayFrequencyEdit(document.getElementById("payFrequencyEdit").value);
            setGrossPayEdit(document.getElementById("grossPayEdit").value);
            setAccountEdit(document.getElementById("accountEdit").value);
        }

        //handles updates to input's
        const addInputHandler = () =>{
            setPayDateAdd(document.getElementById("payDateAdd").value);
            let now = new Date(Date.now());
            let nowString = now.getMonth()+1 + "/" + now.getDate() + "/" + (now.getYear()+1900);
            if(payDateAdd < now){
                setPayDateAddWarning(`Next pay date cannot be before ${nowString}`);
            }

            setPayFrequencyAdd(document.getElementById("payFrequencyAdd").value);
            setGrossPayAdd(document.getElementById("grossPayAdd").value);
            setAccountAdd(document.getElementById("accountAdd").value);

        }

        //handles updates to input's
        const deleteInputHandler = () =>{
            setPassword(document.getElementById("password").value);
        }

        // post Income to server
        const addIncome = () => {
            // TODO: get user ID from session variable
            postIncome(accountAdd, grossPayAdd, payDateAdd, payFrequencyAdd);
            handleCloseAdd();
        }

        // post update
        const changeIncome = () => {
            editIncome(localStorage.getItem("editing"), accountEdit, grossPayEdit, payDateEdit, payFrequencyEdit)
            handleCloseEdit();
        }

        // post delete
        const removeIncome = () => {
            deleteIncome(localStorage.getItem("deleting"))
            handleCloseDelete();
        }

        useEffect(() => {
            if(cookies.get("TOKEN") === undefined) {
                navigate("/")
            }
    
        },[])

    //returning JSX
    return (
        <>
            <SearchBar/>
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
                        warning={[grossPayAdd, payFrequencyAddWarning, payDateAddWarning, accountAddWarning]}
                        warningIDs={['grossPayAddWarning', 'payFrequencyAddWarning','payDateAddWarning', 'accountAddWarning']}
                        fieldTypes={['number', 'number', 'date', 'number']}
                        onChange={addInputHandler}
                        submitAction={addIncome}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date', 'Account']}
                        fieldIDs={['grossPayEdit', 'payFrequencyEdit', 'payDateEdit', 'accountEdit']}
                        warning={['','','','']}
                        warningIDs={['', '','', '']}
                        fieldTypes={['number', 'number', 'date']}
                        onChange={editInputHandler}
                        submitAction={changeIncome}
                    />
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