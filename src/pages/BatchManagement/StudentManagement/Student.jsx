import React from 'react'
import MenuButton from '../../../ComonComponent/Menus/MenusButton'

const Student = () => {

    const buttonArr = [
        {
            title: 'Add Student',
            link: '/add-student',
            color: 'bg-green-700'
        },
        {
            title: 'Student Details',
            link: '/display-student',
            color: 'bg-blue-700'
        },
        {
            title: 'Mark Attendence',
            link: '/select-batch',
            color: 'bg-black'
        },
        {
            title: 'Attendence Detail',
            link: '/select-batch-get',
            color: 'bg-black'
        },
    ]
    return (
        <div>
            <MenuButton buttonArr={buttonArr}/>
        </div>
    )
}

export default Student;