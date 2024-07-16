import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const addBatchArr = [
    {
        'type': 'text',
        'id': 'batch_name',
        'name': 'batch_name',
        'required': true,
        'placeholder': 'Batch Name',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'time',
        'id': 'batch_start_timing',
        'name': 'batch_start_timing',
        'required': true,
        'placeholder': 'Batch Start Timing',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'time',
        'id': 'batch_end_timing',
        'name': 'batch_end_timing',
        'required': true,
        'placeholder': 'Batch End Timing',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'array',
        'id': 'batch_days',
        'name': 'batch_days',
        'required': true,
        'option' :[
            {'label': 'Sunday', 'value': 'Sunday'},
            {'label': 'Monday', 'value': 'Monday'},
            {'label': 'Tuesday', 'value': 'Tuesday'},
            {'label': 'Wednesday', 'value': 'Wednesday'},
            {'label': 'Thursday', 'value': 'Thursday'},
            {'label': 'Friday', 'value': 'Friday'},
            {'label': 'Saturday', 'value': 'Saturday'}
        ],
        'placeholder': 'Batch Days',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'dynamicoption',
        'id': 'assigned_to',
        'name': 'assigned_to',
        'required': true,
        'placeholder': 'Teacher',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'dynamicoption',
        'id': 'brand',
        'name': 'brand',
        'required': true,
        'placeholder': 'Select Brand',
        'icon': <PersonIcon className={iconCss} />
    },
]

export default addBatchArr;