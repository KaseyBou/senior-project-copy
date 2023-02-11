import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import CustomForm from '../../components/CustomForm/CustomForm';

//import Loading from '../Loading/Loading';
import './Report.css';

const Report = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();



    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])

    const inputHandler = () => {

    }

    const getReport = () => {

    }


    //returning JSX
    return (
        <>
            <CustomForm
                title='Register'
                fields={["Report Format", "Report Type", "Budget Categories", "Start Date", "End Date"]}
                fieldIDs={['reportFormat', 'reportType', 'reportCategories', 'startDate', 'endDate']}
                warning={['', '', '']}
                warningIDs={['', '', '']}
                fieldTypes={['select', 'select', 'select', 'date', 'date']}
                selectFields={[]}
                onChange={inputHandler}
                submitAction={getReport}
            ></CustomForm>
        </>
    );
}

export default Report