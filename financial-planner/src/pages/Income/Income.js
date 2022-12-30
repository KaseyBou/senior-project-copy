import { useState } from 'react';

//import Loading from '../Loading/Loading';
import './Income.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import DataRow from '../../components/DataRow/DataRow';
import CustomForm from '../../components/CustomForm/CustomForm';

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
                <Modal buttonText="Add Income">
                    <CustomForm
                        title="Add Income"
                        fields={['Gross Pay', 'Pay Frequency', 'Pay Date']}
                    />
                </Modal>
            </div>
        </>
        );
}

export default Income