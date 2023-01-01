import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Expenses.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';

const Expenses = () => {
    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showBillAdd, setShowBillAdd] = useState(false);
    const handleCloseBillAdd = () => setShowBillAdd(false);
    const handleShowBillAdd = () => setShowBillAdd(true);

    const [showBillEdit, setShowBillEdit] = useState(false);
    const handleCloseBillEdit = () => setShowBillEdit(false);
    const handleShowBillEdit = () => setShowBillEdit(true);

    //Initialization
    const navigate = useNavigate();

    //returning JSX
    return (
        <>
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
                        fieldTypes={['text', 'number', 'text', 'textbox']}
                        submitAction={handleCloseAdd}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Expense"
                        fields={['For', 'Total Spent', 'Category', 'Details/Notes']}
                        fieldTypes={['text', 'number', 'text', 'textbox']}
                        submitAction={handleCloseEdit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete"
                        fields={['Password']}
                        fieldTypes={['password']}
                        submitAction={handleCloseDelete}
                    />
                </Modal>

                <Button onClick={handleShowBillAdd}>Add Bill</Button>
                <Modal buttonText="Add Bill" show={showBillAdd} handleShow={handleShowBillAdd} handleClose={handleCloseBillAdd}>
                    <CustomForm
                        title="Add Bill"
                        fields={['Bill Name', 'Company', 'Bill Type', 'Due Date', 'Reoccuring Bill', 'Interest', 'Amount', 'Payment', 'Payment Date', 'Reocurring Payment']}
                        fieldTypes={['text', 'text', 'text', 'date', 'checkbox', 'number', 'number', 'number', 'date', 'checkbox']}
                        submitAction={handleCloseBillAdd}
                    />
                </Modal>

                <Modal buttonText="Edit Bill" show={showBillEdit} handleShow={handleShowBillEdit} handleClose={handleCloseBillEdit}>
                    <CustomForm
                        title="Edit Bill"
                        fields={['Bill Name', 'Company', 'Bill Type', 'Due Date', 'Reoccuring Bill', 'Interest', 'Amount', 'Payment', 'Payment Date', 'Reocurring Payment']}
                        fieldTypes={['text', 'text', 'text', 'date', 'checkbox', 'number', 'number', 'number', 'date', 'checkbox']}
                        submitAction={handleCloseBillEdit}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Expenses