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
            title: 'Attendence Detail',
            link: '/search-batch?query=select-batch-get',
            color: 'bg-black'
        },
        {
            title: 'Send Email',
            link: '/send-mail-to-student',
            color: 'bg-black'
        },
    ]
    return (
        <div>
            <MenuButton buttonArr={buttonArr} />
        </div>
    )
}

export default Student;