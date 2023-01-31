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
    // instance of budget hook
    const {postBudget, getCategories, editCategory, deleteCategory} = useBudget("Budget");

    const cookies = new Cookies();
    const navigate = useNavigate();

    // state for list of budget categories
    const [categories, setCategories] = useState(null);

    // form states
    const [nameAdd, setNameAdd] = useState('');
    const [isCalculatedAdd, setIsCalculatedAdd] = useState(false);
    const [monthlyBudgetAdd, setMonthlyBudgetAdd] = useState(0);
    const [percentageAdd, setPercentageAdd] = useState(0);

    const [nameEdit, setNameEdit] = useState('');
    const [isCalculatedEdit, setIsCalculatedEdit] = useState('');
    const [monthlyBudgetEdit, setMonthlyBudgetEdit] = useState(0);
    const [percentageEdit, setPercentageEdit] = useState(0);

    // form warning states
    const [nameAddWarning, setNameAddWarning] = useState('');
    const [isCalculatedAddWarning, setIsCalculatedAddWarning] = useState('');
    const [monthlyBudgetAddWarning, setMonthlyBudgetAddWarning] = useState('');
    const [percentageAddWarning, setPercentageAddWarning] = useState('');

    const [nameEditWarning, setNameEditWarning] = useState('');
    const [isCalculatedEditWarning, setIsCalculatedEditWarning] = useState('');
    const [monthlyBudgetEditWarning, setMonthlyBudgetEditWarning] = useState('');
    const [percentageEditWarning, setPercentageEditWarning] = useState(''); 

    // input handlers
    const addInputHandler = () => {
        setNameAdd(document.getElementById("nameAdd").value);
        setIsCalculatedAdd(document.getElementById("calculatedAdd").value);
        setMonthlyBudgetAdd(document.getElementById("monthlyBudgetAdd").value);
        setPercentageAdd(document.getElementById("percentageAdd").value);
    }

    const editInputHandler = () => {
        setNameEdit(document.getElementById("nameEdit").value);
        setIsCalculatedEdit(document.getElementById("calculatedEdit").value);
        setMonthlyBudgetEdit(document.getElementById("monthlyBudgetEdit").value);
        setPercentageEdit(document.getElementById("percentageEdit").value);
    }

    // modal visibility states and functions
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => {
        setShowEdit(false);
        fetchIncomeList();
    }
    const handleShowEdit = (id) => {
        setShowEdit(true);
        localStorage.setItem("editing", id);
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
        fetchIncomeList();
    }
    const handleShowAdd = () => {
        setShowAdd(true);
    }

    // submission functions
    const addBudget = () => {
        // if everything is filled and no error messages are present
        if(nameAdd && ((isCalculatedAdd && percentageAdd) || monthlyBudgetAdd)
        && !nameAddWarning && !isCalculatedAddWarning && !percentageAddWarning && !monthlyBudgetAddWarning){
            postBudget(nameAdd, isCalculatedAdd, monthlyBudgetAdd, percentageAdd);
            handleCloseAdd();

            // clear state
            setNameAdd(null);
            setIsCalculatedAdd(false);
            setPercentageAdd(null);
            setMonthlyBudgetAdd(null);
        }
    }

    const updateBudget = () => {
        console.log(nameEdit);
        console.log(isCalculatedEdit);
        console.log(percentageEdit);
        console.log(monthlyBudgetEdit);

        if(nameEdit && ((isCalculatedEdit && percentageEdit) || monthlyBudgetEdit)
        && !nameEditWarning && !isCalculatedEditWarning && !percentageEditWarning && !monthlyBudgetEditWarning){
            editCategory(localStorage.getItem('editing'), nameEdit, isCalculatedEdit, monthlyBudgetEdit, percentageEdit);
            handleCloseEdit();

            // clear state
            setNameEdit(null);
            setIsCalculatedEdit(false);
            setPercentageEdit(null);
            setMonthlyBudgetEdit(null);
        }
    }

    const removeBudget = (id) => {
        deleteCategory(id);
        handleCloseDelete();
    }

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
                        fieldIDs={['nameAdd', 'calculatedAdd', 'monthlyBudgetAdd', 'percentageAdd']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        warning={['', '', '', '']}
                        warningIDs={['nameAddWarning', 'calculatedAddWarning','monthlyValueAddWarning', 'percentageAddWarning']}
                        onChange={addInputHandler}
                        submitAction={addBudget}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Budget Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget', '% Of Net Income']}
                        fieldIDs={['nameEdit', 'calculatedEdit', 'monthlyBudgetEdit', 'percentageEdit']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        warning={['', '', '', '']}
                        warningIDs={['nameEditWarning', 'calculatedEditWarning','monthlyValueEditWarning', 'percentageEditWarning']}
                        onChange={editInputHandler}
                        submitAction={updateBudget}
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
                        submitAction={() => {removeBudget(localStorage.getItem("deleting"))}}
                    />
                </Modal>

            </div>
        </>
    );
}

export default Budget