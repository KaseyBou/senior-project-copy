import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './BankAccounts.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';

const Income = () => {
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

    //Initialization
    //const navigate = useNavigate();

    //returning JSX
    return (
        <>
            <div id="BankAccountList">
                <DataRow
                    title="Row 1"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Row 2"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Row 3"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Row 4"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Row 5"
                    rows={["subrow 1", "subrow 2", "subrow 3"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
            </div>
            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Bank Account</Button>
                <Modal buttonText="Add Account" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Account"
                        fields={['Bank', 'Account Type', 'Interest Rate', 'Monthly Account Fees', 'Balance']}
                        fieldTypes={[ 'text', 'text', 'number', 'number', 'number']}
                        submitAction={handleCloseAdd}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Account"
                        fields={['Bank', 'Account Type', 'Interest Rate', 'Monthly Account Fees', 'Balance']}
                        fieldTypes={[ 'text', 'text', 'number', 'number', 'number']}
                        submitAction={handleCloseEdit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete Account"
                        fields={['Confirm Income Name', 'User Password']}
                        fieldTypes={['text', 'password']}
                        submitAction={handleCloseDelete}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Income