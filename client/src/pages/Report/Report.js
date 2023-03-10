import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import CustomForm from '../../components/CustomForm/CustomForm';
import TableRow from '../../components/TableRow/TableRow';
//import Loading from '../Loading/Loading';
import './Report.css';

import useBills from '../../hooks/useBills.tsx';
import useExpenditures from '../../hooks/useExpenditures.tsx';
import useAccount from '../../hooks/useAccount.tsx';
import useBudget from '../../hooks/useBudget.tsx';
import useReport from '../../hooks/useReport.tsx';
import ScatterPlot from '../../graphing/ScatterPlot';

import Button from '../../components/Button/Button';
import Plot from 'react-plotly.js';

const Report = () => {

    //intializing
    const cookies = new Cookies();
    const navigate = useNavigate();

    const { postExpenditure, getExpenditure, editExpenditure, deleteExpenditure} = useExpenditures("Expenditures")
    // account hook instance
    const {getAccounts} = useAccount("BankAccount")
    const { getCategories } = useBudget("Budget");
    const { getInfo, getSnapshotValues } = useReport("");


    useEffect(() => {
        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

    },[])

    // holds if form or report is shown (false = form, true = report)
    const [displayReport, setDisplayReport] = useState('');

    // holds report data when relevant
    const [reportData, setReportData] = useState(null);

    // form field states
    const [reportFormat, setReportFormat] = useState('');
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // states to handle current list of fields available
    const [fieldList, setFieldList] = useState([]);
    const [fieldIds, setFieldIds] = useState([]);
    const [fieldTypes, setFieldTypes] = useState([]);

    // list of selected IDs
    const [selectedIds, setSelectedIds] = useState([]);
    
    // list of accounts
    const [accountNameList, setAccountNameList] = useState([]);
    const [accountIdList, setAccountIdList] = useState([]);
    const [accountSelectList, setAccountSelectList] = useState([]);

    const [categoryNameList, setCategoryNameList] = useState([]);
    const [categoryIdList, setCategoryIdList] = useState([]);
    const [categorySelectList, setCategorySelectList] = useState([]);

    // initialize field list
    useEffect(() => {
        setFieldList(["Report Format", "Report Type", "Start Date", "End Date"]);
        setFieldIds(['reportFormat', 'reportType', 'startDate', 'endDate']);
        setFieldTypes(['select', 'select', 'date', 'date']);
    },[])

    const inputHandler = () => {
        setReportFormat(document.getElementById('reportFormat').value);
        setReportType(document.getElementById('reportType').value);
        setStartDate(document.getElementById('startDate').value);
        setEndDate(document.getElementById('endDate').value);

        // get list of selected accounts or budgets, save to state
        var CheckedIds = [];
        let checkboxes = document.getElementsByClassName('form_checkbox')
        for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                let idNum = parseInt(checkboxes[i].id.substring(7))
                CheckedIds.push(idNum);
            }
        }
        console.log(CheckedIds)
        setSelectedIds(CheckedIds);
    }

    // handle change of report type
    useEffect(() => {
        // update field list and id list
        let tempFieldList = ["Report Format", "Report Type", "Start Date", "End Date"];
        let tempIdList = ['reportFormat', 'reportType', 'startDate', 'endDate'];
        let tempTypeList = ['select', 'select', 'date', 'date']
        if(reportType === 'accounts'){
            accountNameList.forEach((account) => {
                tempFieldList.push(account);
                tempTypeList.push('checkbox')
            })
            accountIdList.forEach((account) => {
                tempIdList.push("account" + account);
            })
        } else if(reportType === 'budgets'){
            categoryNameList.forEach((budget) => {
                tempFieldList.push(budget);
                tempTypeList.push('checkbox');
            })
            categoryIdList.forEach((budget) => {
                tempIdList.push("budget_" + budget);
            })
        }
                
        setFieldList(tempFieldList);
        setFieldIds(tempIdList);
        setFieldTypes(tempTypeList);

        // clear checkboxes
        let checkboxes = document.getElementsByClassName('form_checkbox')
        for(let i = 0; i < checkboxes.length; i++){
            checkboxes.item(i).checked = false;
        }
    }, [reportType])

    const getReport = async(type, idList) => {
        let reportData = await getSnapshotValues(type, idList);

        var dataSet = [];

        idList.forEach((id) => {
            var xData = [];
            var yData = [];
            var label = '';

            reportData.data.forEach((dataPoint) => {
                if(dataPoint.id === id && dataPoint.date >= startDate && dataPoint.date <= endDate){
                    // set date to be at midnight
                    var newDate = new Date(dataPoint.date);
                    newDate.setHours(0);
                    newDate.setMinutes(0);
                    newDate.setSeconds(0);

                    xData.push(newDate);
                    yData.push(dataPoint.balance);
                    label = dataPoint.name;
                }
            });

            dataSet.push({
                x: xData,
                y: yData,
                name: label,
                type: 'scatter'
            });
        })

        console.log(dataSet);
        setReportData(dataSet);
        
        setDisplayReport(true);  
    }

     // income state

     const [expenditures, setExpenditures] = useState(null);

    //support functionality
    useEffect(() => {

        if(cookies.get("TOKEN") === undefined) {
            navigate("/")
        }

        //getting accounts for display and form
        getAccounts().then((accounts) => {

            //setting account select options
            setAccountSelectList(accounts.data.map((account) => {
                return <option value={account.account_id}>{account.account_name}</option>
            }))

            // setting account name list
            setAccountNameList(accounts.data.map((account) => {
                return account.account_name;
            }));

            // setting account id list
            setAccountIdList(accounts.data.map((account) => {
                return account.account_id;
            }))

        }).then(

        //get budget categories
        getCategories().then((categories) => {
            setCategorySelectList(categories.data.map((category) => {
                return <option value={category.budget_ID}>{category.category_name}</option>
            }))

            //setting category name list
            setCategoryNameList(categories.data.map((category) => {
                return category.category_name
            }))

            //setting category ID list
            setCategoryIdList(categories.data.map((category) => {
                return category.budget_ID;
            }))
        }).then(fetchExpenses()))

    },[])


    const fetchExpenses = async() => {

        getExpenditure().then((data) => {
            
            setExpenditures(data.data.map((expenditure) => {
                let theDate = new Date(expenditure.date);
                let dateString = theDate.getMonth()+1 + " / " + theDate.getDate() + " / " + (theDate.getYear()+1900);
                let accountName;
                let categoryName;

                //grabbing bank account name for display
                for(let i = 0; i < accountNameList.length; i++) {
                    if(accountNameList[i] === expenditure.account_id) {
                        accountName = accountNameList[i];
                    }
                }
                for(let i = 0; i < categoryNameList.length; i++) {
                    if(categoryNameList[i] === expenditure.budget_id) {
                        categoryName = categoryNameList[i];
                    }
                }

                return(
                    
                    <TableRow account={accountName} date={dateString} amount={expenditure.total_amount}/>
                 
                )
            }
            ));
        })
        
    }

    // get list of dates between start and end, used in tabular report
    const getDateList = (startDate, endDate) => {
        var dateList = [];
        for(var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)){
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            dateList.push(new Date(d.getTime()));
        }
        return dateList;
    }

    //returning JSX
    return (
        <>
            {!displayReport && <CustomForm
                title='Generate Report'
                fields={fieldList}
                fieldIDs={fieldIds}
                warning={['', '', '']}
                warningIDs={['', '', '']}
                fieldTypes={fieldTypes}
                selectFields={[
                    [<option value='table'>Tabular</option>,
                        <option value='graph'>Graphical</option>,
                        <option value='both'>Both</option>],

                    [<option value='null'>-- SELECT ONE --</option>,
                        <option value='accounts'>Accounts</option>,
                        <option value='budgets'>Budgets</option>],

                    reportType==='accounts'?accountSelectList:categorySelectList
                ]}
                onChange={inputHandler}
                submitAction={() => {
                    getReport(reportType, selectedIds);
                }}
            ></CustomForm>}

            {displayReport && <>
                {(reportFormat === 'table' || reportFormat === 'both') && <>
                    <Button text="New Report" function={() => setDisplayReport(false)} />
                    <table className='reportTable'>
                        <thead><tr>
                            <th id="spacer" />
                            {reportData.map((column) => {
                                return <td>{column.name}</td>
                            })}
                        </tr></thead>
                        <tbody>
                            {
                                getDateList(startDate, endDate).map((date) => {
                                    return(<tr>
                                        <td>{date.toDateString()}</td>
                                        {reportData.map((column) => {
                                            for(var i = 0; i < column.x.length; i++){
                                                if(column.x[i].getTime() == date.getTime()){
                                                    return <td>{column.y[i]}</td>
                                                }
                                            }
                                            return <td>N/A</td>
                                        })}
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </>}
                {(reportFormat === 'graph' || reportFormat === 'both') && <>
                    <Button text="New Report" function={() => setDisplayReport(false)} />
                    <Plot
                        data={reportData}
                        layout={{ width: 800, height: 400, title: 'Report ' + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + "/" + (new Date(Date.now()).getYear()+1900)}}
                    />
                </>}
            </>}

            <table>
                
            </table>
        </>
    );
}

export default Report