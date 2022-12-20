
//import Loading from '../Loading/Loading';
import './Income.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.js'
import DataRow from '../../components/DataRow/DataRow';

const Income = () => {

    //Initializing
    const navigate = useNavigate();

    //returning JSX
    return (
        <>
            <div id="IncomeList">
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
                <DataRow title="Row 1" rows={["subrow 1", "subrow 2", "subrow 3"]}/>
            </div>
            <div className='bottomTaskBar'>
                <Button text="Add Income"/>
            </div>
        </>
        );
}

export default Income