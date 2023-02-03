import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
//import Loading from '../Loading/Loading';
import './Bills.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';

import useBills from '../../hooks/useBills.tsx';
import useAccount from '../../hooks/useAccount.tsx';
import useBudget from '../../hooks/useBudget.tsx';

const Expenses = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

     // bill hook instance
     const { postBill, getBills, editBill, deleteBill } = useBills("Bills");
    
    // account hook instance
    const {getAccounts} = useAccount("BankAccount")
    const { getCategories } = useBudget("Budget");

    // list of accounts
    const [accountList, setAccountList] = useState([]);
    const [selectAccountList, setSelectAccountList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [categorySelectList, setCategorySelectList] = useState([]);
     // income state
     const [bills, setBills] = useState(null);

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
        }).then(fetchBills()))

    },[])

    const fetchBills = () => {

        getBills().then((data) => {
            
            setBills(data.data.map((bill) => {
                let theDate = new Date(bill.next_due);
                let dateString = theDate.getMonth()+1 + " / " + theDate.getDate() + " / " + (theDate.getYear()+1900);
                let accountName;
                let categoryName;

                //grabbing bank account name for display
                for(let i = 0; i < accountList.length; i++) {
                    if(accountList[i][0] === bill.account_id) {
                        accountName = accountList[i][1];
                    }
                }
                for(let i = 0; i < categoryList.length; i++) {
                    if(categoryList[i][0] === bill.budget_id) {
                        categoryName = categoryList[i][1];
                    }
                }

                return(
                    <DataRow
                    title=""
                    labels={["Bill Name: ", "Company: ", "Amount: ", "Frequency: ", "Next Due: ", "Category: ", "Bank Account: "]}
                    rows={[bill.bill_name, bill.bill_source, '$' + bill.amount, bill.pay_frequency + ' Month', dateString, categoryName, accountName]}
                    HandleEdit={() => handleShowEdit(bill.bill_id)}
                    HandleDelete={() => handleShowDelete(bill.bill_id)}
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
        getBills().then((data) => {

            for(let bill of data.data){
                if(bill.bill_id === id){
    
                    document.getElementById("billNameEdit").value = bill.bill_name;
                    document.getElementById("billCompanyEdit").value = bill.bill_source;
                    document.getElementById("billFrequencyEdit").value = bill.pay_frequency;
                    document.getElementById("billAmountEdit").value = bill.amount;
                    document.getElementById("billPaymentDateEdit").value = bill.next_due.toString().substring(0, 10);
                    document.getElementById("billBudgetEdit").value = bill.budget_id;
                    document.getElementById("billAccountEdit").value = bill.account_id;

                }
            }
            // run validation to clear error messages
            editBillInputHandler();
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

    //Post expense to server
    const addBill = () => {
        console.log(billNameAdd, billCompanyAdd, billAmountAdd, billFrequencyAdd, billPaymentDateAdd, billAccountAdd, billBudgetAdd)
        if(billNameAdd && billCompanyAdd && billAmountAdd && billFrequencyAdd && billPaymentDateAdd && billAccountAdd && billBudgetAdd) {
            postBill(billNameAdd, billCompanyAdd, billFrequencyAdd, billPaymentDateAdd, billAmountAdd, billAccountAdd, billBudgetAdd);
            handleCloseAdd();
            fetchBills();

        }
    }

    const updateBill = () => {
        //if(forEdit.length !== null && dateEdit !== null && totalSpentEdit !== null && accountEdit !== null && categoryEdit !== null) {
        editBill(localStorage.getItem("editing"), billNameEdit, billCompanyEdit,  billFrequencyEdit, billPaymentDateEdit, billAmountEdit, billAccountEdit, billBudgetEdit);
        handleCloseEdit();
        fetchBills();
        //}
    }

    // post delete
    const removeBill = () => {
        deleteBill(localStorage.getItem("deleting"))
        handleCloseDelete();
        fetchBills();
    }

    //Add Bill Modal Information
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
    const [billNameEdit, setBillNameEdit] = useState('')
    const [billCompanyEdit, setBillCompanyEdit] = useState('');
    const [billAmountEdit, setBillAmountEdit] = useState('');
    const [billFrequencyEdit, setBillFrequencyEdit] = useState('')
    const [billPaymentDateEdit, setBillPaymentDateEdit] = useState('');
    const [billAccountEdit, setBillAccountEdit] = useState('');
    const [billBudgetEdit, setBillBudgetEdit] = useState('');

    //handles updates to input's
    const editBillInputHandler = () =>{
        setBillNameEdit(document.getElementById("billNameEdit").value);
        setBillCompanyEdit(document.getElementById("billCompanyEdit").value);
        setBillFrequencyEdit(document.getElementById("billFrequencyEdit").value);
        setBillAmountEdit(document.getElementById("billAmountEdit").value);
        setBillAccountEdit(document.getElementById("billAccountEdit").value);
        setBillBudgetEdit(document.getElementById("billBudgetEdit").value)
        setBillPaymentDateEdit(document.getElementById("billPaymentDateEdit").value);        
    }
    
    //returning JSX
    return (
        <>
            <SearchBar/>
            <div id="BillsList">
                {bills}
            </div>

            <div className='bottomTaskBar'>
                
            <Button onClick={handleShowAdd}>Add Bill</Button>
                <Modal buttonText="Add Bill" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Bill"
                        fields={['Bill Title', 'Bill Source', 'Amount', 'Next Due Date', 'Pay Frequency', 'Account', 'Budget', ]}
                        fieldIDs={['billNameAdd', 'billCompanyAdd', 'billAmountAdd', 'billPaymentDateAdd', 'billFrequencyAdd', 'billAccountAdd', 'billBudgetAdd']}
                        fieldTypes={['text', 'text', 'number', 'date', 'number', 'select', 'select']}
                        warning={['','','','','','','']}
                        warningIDs={['', '','', '','','','']}
                        selectFields={[selectAccountList, categorySelectList]}
                        onChange={addBillInputHandler}
                        submitAction={addBill}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Bill"
                        fields={['Bill Title', 'Bill Source', 'Amount', 'Next Due Date', 'Pay Frequency', 'Account', 'Budget', ]}
                        fieldIDs={['billNameEdit', 'billCompanyEdit', 'billAmountEdit', 'billPaymentDateEdit', 'billFrequencyEdit', 'billAccountEdit', 'billBudgetEdit']}
                        fieldTypes={['text', 'text', 'number', 'date', 'number', 'select', 'select']}
                        warning={['','','','','','','']}
                        warningIDs={['', '','', '','','','']}
                        selectFields={[ selectAccountList, categorySelectList]}
                        onChange={editBillInputHandler}
                        submitAction={updateBill}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <h2 className='text-center'>Confirm Deletion</h2>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={removeBill}>Confirm</Button>
                    </div>

                </Modal>
            </div>
        </>
    );
}

export default Expenses