import { useState, useEffect } from 'react';

//import Loading from '../Loading/Loading';
import './Expenses.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';

import useBills from '../../hooks/useBills.tsx';

const Expenses = () => {

     // bill hook instance
     const { postBill, getBills } = useBills("Bills");

     // income state
     const [bills, setBills] = useState(null);
 
     // on render, get list of bills
     // TODO: use user ID from session data
     useEffect(() => {
         getBills(7).then((data) => {
             setBills(data);
             console.log(data);
         });
     }, [])

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [forEdit, setForEdit] = useState('');
    const [totalSpentEdit, setTotalSpentEdit] = useState('')
    const [categoryEdit, setCategoryEdit] = useState('');
    const [notesEdit, setNotesEdit] = useState('');
    //handles updates to input's
    const editExpenseInputHandler = () =>{
        setForEdit(document.getElementById("forEdit").value);
        setTotalSpentEdit(document.getElementById("totalSpentEdit").value);
        setCategoryEdit(document.getElementById("categoryEdit").value);
        setNotesEdit(document.getElementById("notesEdit").value);

    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [passwordDelete, setPasswordDelete] = useState('');
    const deleteInputHandler = () =>{
        setPasswordDelete(document.getElementById("passwordDelete").value);
    }

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const [forAdd, setForAdd] = useState('');
    const [totalSpentAdd, setTotalSpentAdd] = useState('')
    const [categoryAdd, setCategoryAdd] = useState('');
    const [notesAdd, setNotesAdd] = useState('');
    //handles updates to input's
    // const addExpenseInputHandler = () =>{
    //     setForAdd(document.getElementById("forAdd").value);
    //     setTotalSpentAdd(document.getElementById("totalSpentAdd").value);
    //     setCategoryAdd(document.getElementById("categoryAdd").value);
    //     setNotesAdd(document.getElementById("notesAdd").value);

    // }

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
                <DataRow
                    title="Expense 1"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Bill 2"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowBillEdit}
                    HandleDelete={handleShowDelete}
                />
            </div>

            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Expense</Button>
                <Modal buttonText="Add Expense" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Expense"
                        fields={['For', 'Total Spent', 'Category', 'Details/Notes']}
                        fieldIDs={['forAdd', 'totalSpentAdd', 'categoryAdd', 'notesAdd']}
                        fieldTypes={['text', 'number', 'text', 'textbox']}
                        onChange={addBill}
                        submitAction={addBill}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Expense"
                        fields={['For', 'Total Spent', 'Category', 'Details/Notes']}
                        fieldIDs={['forEdit', 'totalSpentEdit', 'categoryEdit', 'notesEdit']}
                        fieldTypes={['text', 'number', 'text', 'textbox']}
                        onChange={editExpenseInputHandler}
                        submitAction={handleCloseEdit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete"
                        fields={['Password']}
                        fieldIDs={['passwordDelete']}
                        fieldTypes={['password']}
                        onChange={deleteInputHandler}
                        submitAction={handleCloseDelete}
                    />
                </Modal>

                <Button onClick={handleShowBillAdd}>Add Bill</Button>
                <Modal buttonText="Add Bill" show={showBillAdd} handleShow={handleShowBillAdd} handleClose={handleCloseBillAdd}>
                    <CustomForm
                        title="Add Bill"
                        fields={['Bill Title', 'Bill Source', 'Amount', 'Next Due Date', 'Pay Frequency', 'Account', 'Budget', ]}
                        fieldIDs={['billNameAdd', 'billCompanyAdd', 'billAmountAdd', 'billPaymentDateAdd', 'billFrequencyAdd', 'billAccountAdd', 'billBudgetAdd']}
                        fieldTypes={['text', 'text', 'number', 'date', 'number', 'text', 'text']}
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