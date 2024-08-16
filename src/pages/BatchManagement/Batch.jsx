import React from 'react';
import MenuButton from '../../ComonComponent/Menus/MenusButton';

const Batch = () => {

    const buttonArr = [
        {
            title: 'Add Batch',
            link: '/add-batch',
            color: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500'
        },
        {
            title: 'Batch Details',
            link: '/search-batch?query=display-batch',
            color: 'bg-black'
        },
        {
            title: 'Manage Student',
            link: '/manage-student',
            color: 'bg-green-700'
        }
    ]
    return (
        <>
           <MenuButton buttonArr={buttonArr}/>
        </>);
};

export default Batch;
