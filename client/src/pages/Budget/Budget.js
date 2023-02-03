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

    const [nameEdit, setNameEdit] = useState('');
    const [isCalculatedEdit, setIsCalculatedEdit] = useState(false);
    const [monthlyBudgetEdit, setMonthlyBudgetEdit] = useState(0);

    // form warning states
    const [nameAddWarning, setNameAddWarning] = useState('');
    const [isCalculatedAddWarning, setIsCalculatedAddWarning] = useState('');
    const [monthlyBudgetAddWarning, setMonthlyBudgetAddWarning] = useState('');

    const [nameEditWarning, setNameEditWarning] = useState('');
    const [isCalculatedEditWarning, setIsCalculatedEditWarning] = useState('');
    const [monthlyBudgetEditWarning, setMonthlyBudgetEditWarning] = useState('');

    // input handlers
    const addInputHandler = () => {
        setNameAdd(document.getElementById("nameAdd").value);
        setIsCalculatedAdd(document.getElementById("calculatedAdd").checked);
        setMonthlyBudgetAdd(document.getElementById("monthlyBudgetAdd").value);

        // if calculated box is checked, grey out manual entry
        if(document.getElementById("calculatedAdd").checked){
            document.getElementById("monthlyBudgetAdd").disabled = true;

            // clear conflicting textbox
            document.getElementById("monthlyBudgetAdd").value = "";
        } else {
            document.getElementById("monthlyBudgetAdd").disabled = false;
        }
    }

    const editInputHandler = () => {
        setNameEdit(document.getElementById("nameEdit").value);
        setIsCalculatedEdit(document.getElementById("calculatedEdit").checked);
        setMonthlyBudgetEdit(document.getElementById("monthlyBudgetEdit").value);

        // if calculated box is checked, grey out manual entry
        if(document.getElementById("calculatedEdit").checked){
            document.getElementById("monthlyBudgetEdit").disabled = true;
            document.getElementById("percentageEdit").disabled = false;

            // clear conflicting textbox
            document.getElementById("monthlyBudgetEdit").value = "";
        } else {
            // otherwise, grey out percentage entry
            document.getElementById("monthlyBudgetEdit").disabled = false;
            document.getElementById("percentageEdit").disabled = true;

            // clear conflicting textbox
            document.getElementById("percentageEdit").value = "";
        }
    }

    // validation effect hooks
    // ADD VALIDATION
    useEffect(() => {
        if((!nameAdd || nameAdd.length > 45) && document.getElementById("nameAdd") && !document.getElementById("nameAdd").value){
            setNameAddWarning('Name must be between 1 and 45 characters long');
        } else {
            setNameAddWarning('');
        }

        if(monthlyBudgetAdd < 1 && document.getElementById("monthlyBudgetAdd") && document.getElementById("monthlyBudgetAdd").value && !isCalculatedAdd){
            setMonthlyBudgetAddWarning('Budget value cannot be less than 1');
        } else {
            setMonthlyBudgetAddWarning('');
        }
    
    }, [nameAdd, monthlyBudgetAdd, isCalculatedAdd])

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
        if(nameAdd && (isCalculatedAdd || monthlyBudgetAdd)
        && !nameAddWarning && !isCalculatedAddWarning && !monthlyBudgetAddWarning){
            postBudget(nameAdd, isCalculatedAdd, monthlyBudgetAdd, 0);
            handleCloseAdd();

            // clear state
            setNameAdd(null);
            setIsCalculatedAdd(false);
            setMonthlyBudgetAdd(null);
        }
    }

    const updateBudget = () => {
        if(nameEdit && (isCalculatedEdit || monthlyBudgetEdit)
        && !nameEditWarning && !isCalculatedEditWarning && !monthlyBudgetEditWarning){
            editCategory(localStorage.getItem('editing'), nameEdit, isCalculatedEdit, monthlyBudgetEdit, 0);
            handleCloseEdit();

            // clear state
            setNameEdit(null);
            setIsCalculatedEdit(false);
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
                    labels={["Calculated: ", "Monthly Budget: "]}
                    rows={[is_calculated, category.monthly_budget]}
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
                        fields={['Name', 'Calculated Budget', 'Monthly Budget']}
                        fieldIDs={['nameAdd', 'calculatedAdd', 'monthlyBudgetAdd']}
                        fieldTypes={['text', 'checkbox', 'number']}
                        warning={[nameAddWarning, isCalculatedAddWarning, monthlyBudgetAddWarning]}
                        warningIDs={['nameAddWarning', 'calculatedAddWarning','monthlyValueAddWarning']}
                        onChange={addInputHandler}
                        submitAction={addBudget}
                    />
                </Modal>

                <Modal buttonText="Confirm Changes" show={showEdit} handleShow={handleShowEdit} handleClose={handleCloseEdit}>
                    <CustomForm
                        title="Edit Budget Category"
                        fields={['Name', 'Calculated Budget', 'Monthly Budget']}
                        fieldIDs={['nameEdit', 'calculatedEdit', 'monthlyBudgetEdit']}
                        fieldTypes={['text', 'checkbox', 'number', 'number']}
                        warning={['', '', '', '']}
                        warningIDs={['nameEditWarning', 'calculatedEditWarning','monthlyValueEditWarning']}
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