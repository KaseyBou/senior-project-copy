
//import Loading from '../Loading/Loading';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
import Button from '../../components/Button/Button'

const Dashboard = () => {

    //Initializing
    const navigate = useNavigate();

    const budget = () => {
        navigate("/Budget");
      };
  
      const expenses = () => {
        navigate("/Expenses");
      };
  
      const savings = () => {
        navigate("/Savings");
      };
  
      const income = () => {
        navigate("/Income");
      };

    //returning JSX
    return (
        <>
            <h1>Dashboard</h1>

            <div class="container">
                <div class="row">
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Budget" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                    button={<Button text="Button" function={budget}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Expenditures" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                    button={<Button text="Button" function={expenses}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Savings" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                    button={<Button text="Button" function={savings}/>}/>
                    <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Income" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                    button={<Button text="Button" function={income}/>}/>
                </div>
            </div>
        </>
        );
}

export default Dashboard