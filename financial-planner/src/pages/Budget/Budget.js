import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Budget.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import InformationDisplay from '../../components/InformationDisplay/InformationDisplay';

const Budget = () => {
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
            <div className="container overflow-hidden">
                <div className='mt-5'>
                    <div className="row">
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" 
                        />
                        <InformationDisplay 
                            informationCategory1= "Overall Budget for this Month:" 
                            information1= "test 1" 
                            informationCategory2= "Overall Spending This Month:" 
                            information2= "test 2" 
                            informationCategory3= "Overall Budget Remaining" 
                            information3= "test 3" 
                        />
                    </div>
                </div>
            </div>

            <div id="CategoryList">
                <DataRow
                    title="Category 1"
                    rows={["subrow 1"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
                <DataRow
                    title="Category 2"
                    rows={["subrow 1"]}
                    HandleEdit={handleShowEdit}
                    HandleDelete={handleShowDelete}
                />
            </div>

            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Budget Category</Button>
                <Modal buttonText="Add Category" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Budget Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget', '% Of Net Income']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        submitAction={handleCloseAdd}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget', '% Of Net Income']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
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

            </div>
        </>
    );
}

export default Budget