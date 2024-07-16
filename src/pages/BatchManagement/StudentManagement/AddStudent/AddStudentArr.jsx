import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const addStudentArr = [
    {
        'type': 'text',
        'id': 'student_name',
        'name': 'student_name',
        'required': true,
        'display': true,
        'label': 'Student Name',
        'placeholder': 'Student Name',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'email',
        'id': 'student_email',
        'name': 'student_email',
        'required': true,
        'display': true,
        'label': 'Student Email',
        'placeholder': 'Student Email',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'dynamicoption',
        'id': 'batch_id',
        'name': 'batch_id',
        'required': true,
        'display': true,
        'label': 'Student Batch',
        'placeholder': 'Student Batch',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'student_phone',
        'name': 'student_phone',
        'required': true,
        'display': true,
        'label': 'Student Phone',
        'placeholder': 'Student Phone',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'option',
        'id': 'gender',
        'name': 'gender',
        'required': true,
        'display': true,
        'label': 'Gender',
        'option': [
            {
                value: 'Male',
                label: 'Male'
            },
            {
                value: 'Female',
                label: 'Female'
            },
            {
                value: 'Other',
                label: 'Other'
            },
        ],
        'placeholder': 'Gender',
        'icon': <PersonIcon className={iconCss} />
    },
]

export default addStudentArr;