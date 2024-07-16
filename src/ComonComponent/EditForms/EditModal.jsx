import React from 'react'
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';
import EditForms from './EditForm';

const CustomEditModal = (props) => {

    const filterTabelHeading = props?.topTableHeading?.filter(element => element.required == true);

  return (
    <Modal
        isOpen={
        props?.isModalOpen
    }
    onRequestClose={() =>
        props.setIsModalOpen(false)
    }
    style={{ border: "2px solid blue", borderRadius: "1rem" 
    }}
>

    <div style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        cursor: 'pointer',
        
    }} onClick={()=>{
        props.setIsModalOpen(false);
    }}
    className="hover:bg-red-500 hover:text-white text-red p-4">
        <Close />
    </div>
    <EditForms
        setIsModalOpen={props.setIsModalOpen} 
        row_data={props.row_data}
        topTableHeading={filterTabelHeading}
        getFunc={props.getFunc}
        url_route={props.url_route}
        query={props.query}
    />
</Modal>
  )
}

export default CustomEditModal;