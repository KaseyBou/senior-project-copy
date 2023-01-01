
//import Loading from '../Loading/Loading';
import './Home.css';
import ColumnBox from '../../components/ColumnBox/ColumnBox'
//import Button from '../../components/Button/Button'
//import { useNavigate } from 'react-router-dom';
//import Modal from '../../components/Modal/Modal';

const Home = () => {

    //Initializing
    //const navigate = useNavigate();

    //returning JSX
    return (
        <>

            <div className="container overflow-hidden">
                <div className=''>
                    <div className="row">
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="About" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                        />
                    </div>
                    <div className="row">
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Budget" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                        />
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Expenditures" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                        />
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Savings" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                        />
                        <ColumnBox pictureFilePath="/logo192.png" altText="Filler" title="Income" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus odio justo, non ullamcorper justo congue ac. Phasellus egestas purus eget ligula ullamcorper feugiat. Etiam leo nisi, sagittis sed egestas at, mollis eget augue. Cras venenatis tortor nunc, nec condimentum nibh viverra mattis. Nam in mi mollis, dapibus eros nec, pretium augue. Ut a laoreet tellus. In quis tellus dignissim, luctus erat eget, dictum ipsum. Curabitur fringilla, ex at vehicula ornare, nulla lacus gravida massa, lobortis consectetur diam tellus eget odio." 
                        />
                    </div>
                </div>
            </div>

        </>
        );
}

export default Home