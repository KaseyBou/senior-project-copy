import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

//import Loading from '../Loading/Loading';
import './Budget.css';
//import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import InformationDisplay from '../../components/InformationDisplay/InformationDisplay';
import useBudget from '../../hooks/useBudget.tsx';

const Budget = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    // state for list of budget categories
    const [categories, setCategories] = useState(null);

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

    // instance of budget hook
    const {postBudget, getCategories, editCategory, deleteCategory} = useBudget("Budget");

    // redirect if not logged in
    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])

    // on render, get list of incomes
    const fetchIncomeList = () => {
        getCategories().then((data) => {
            setCategories(data.data.map((category) => {
                // convert binary value into string
                let is_calculated = category.is_calculated ? "True" : "False";
                return(
                    <DataRow
                    title={"Name: " + category.category_name}
                    labels={["Calculated: ", "Monthly Budget: ", "Percentage: "]}
                    rows={[is_calculated, category.monthly_budget, category.percentage]}
                    HandleEdit={() => handleShowEdit(category.budget_ID)}
                    HandleDelete={() => handleShowDelete(category.budget_ID)}
                />
                )
            }));
        })
    }
    useEffect(fetchIncomeList, [])

    //returning JSX
    return (
        <>
            <div id="CategoryList">
                {categories}
            </div>

            <div className='bottomTaskBar'>
                <Button onClick={handleShowAdd}>Add Budget Category</Button>
                <Modal buttonText="Add Category" show={showAdd} handleShow={handleShowAdd} handleClose={handleCloseAdd}>
                    <CustomForm
                        title="Add Budget Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget', '% Of Net Income']}
                        fieldIDs={['nameAdd', 'calculatedAdd', 'monthlyValueAdd', 'percentageAdd']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        warning={['', '', '', '']}
                        warningIDs={['nameAddWarning', 'calculatedAddWarning','monthlyValueAddWarning', 'percentageAddWarning']}
                        onChange={() => {}}
                        submitAction={handleCloseAdd}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Budget Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget', '% Of Net Income']}
                        fieldIDs={['nameEdit', 'calculatedEdit', 'monthlyValueEdit', 'percentageEdit']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        warning={['', '', '', '']}
                        warningIDs={['nameEditWarning', 'calculatedEditWarning','monthlyValueEditWarning', 'percentageEditWarning']}
                        onChange={() => {}}
                        submitAction={handleCloseEdit}
                    />
                </Modal>

                <Modal buttonText="Confirm Deletion" show={showDelete} handleShow={handleShowDelete} handleClose={handleCloseDelete}>
                    <CustomForm
                        title="Really Delete? This cannot be undone."
                        fields={['Password']}
                        fieldIDs={['pwDelete']}
                        fieldTypes={['password']}
                        warning={['']}
                        warningIDs={['']}
                        onChange={() => {}}
                        submitAction={handleCloseDelete}
                    />
                </Modal>

            </div>
        </>
    );
}

export default Budget