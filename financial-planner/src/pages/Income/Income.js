import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Income.css';
import { useNavigate } from 'react-router-dom';
import IncomeRow from '../../components/IncomeRow/IncomeRow';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const Income = () => {

    //Initializing
    const navigate = useNavigate();

    // modal visibility states
    const [editModalVisible, setEditModalVisibility] = useState(false);
    const [deleteModalVisible, setDeleteModalVisibility] = useState(false);
    const [addModalVisible, setAddModalVisibility] = useState(false);

    // show modal to edit income
    const onEditClick = () => {
        setEditModalVisibility(true);
    }
    const onDismissEditModal = () => {
        setEditModalVisibility(false);
    }

    //returning JSX
    return (
        <>
            <div className='Incomes'>
                {/* TODO: make these autogenerate from database */}
                <IncomeRow name="income 1" source="Company 1" date="1/1/2022" amount={123.45} id="1" editFunction={onEditClick}/>
                <IncomeRow name="income 2" source="Company 2" date="7/31/2022" amount={420.69} id="2"editFunction={onEditClick}/>
            </div>
            <Button text="Add Income" function={onEditClick}/>
            <Modal dismissModal={onDismissEditModal}/>

        </>
        );
}

export default Income