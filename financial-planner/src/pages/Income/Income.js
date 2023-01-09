import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Income.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import SearchBar from '../../components/SearchBar/SearchBar';

const Income = () => {
    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [grossPayEdit, setGrossPayEdit] = useState('');
    const [payFrequencyEdit, setPayFrequencyEdit] = useState('')
    const [payDateEdit, setPayDateEdit] = useState('');

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [password, setPassword] = useState('');

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const [grossPayAdd, setGrossPayAdd] = useState('');
    const [payFrequencyAdd, setPayFrequencyAdd] = useState('')
    const [payDateAdd, setPayDateAdd] = useState('');

    //Initialization
    //const navigate = useNavigate();

        //handles updates to input's
        const editInputHandler = () =>{
            setPayDateEdit(document.getElementById("payDateEdit").value);
            setPayFrequencyEdit(document.getElementById("payFrequencyEdit").value);
            setGrossPayEdit(document.getElementById("grossPayEdit").value);

        }

        //handles updates to input's
        const addInputHandler = () =>{
            setPayDateAdd(document.getElementById("payDateAdd").value);
            setPayFrequencyAdd(document.getElementById("payFrequencyAdd").value);
            setGrossPayAdd(document.getElementById("grossPayAdd").value);

        }

        //handles updates to input's
        const deleteInputHandler = () =>{
            setPassword(document.getElementById("password").value);

        }
    //returning JSX
    return (
        <>
            <SearchBar/>
            <div id="IncomeList">
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
                <Button onClick={handleShowAdd}>Add Income</Button>
                <Modal buttonText="Add Income" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date']}
                        fieldIDs={['grossPayAdd', 'payFrequencyAdd', 'payDateAdd']}
                        fieldTypes={['number', 'number', 'date']}
                        onChange={addInputHandler}
                        submitAction={handleCloseAdd}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date']}
                        fieldIDs={['grossPayEdit', 'payFrequencyEdit', 'payDateEdit']}
                        fieldTypes={['number', 'number', 'date']}
                        onChange={editInputHandler}
                        submitAction={handleCloseEdit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Delete Income"
                        fields={['User Password']}
                        fieldIDs={['password']}
                        fieldTypes={['password']}
                        onChange={deleteInputHandler}
                        submitAction={handleCloseDelete}
                    />
                </Modal>
            </div>
        </>
    );
}

export default Income