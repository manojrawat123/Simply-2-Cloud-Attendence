import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const displayEmployeeArr = [
    {
        'type': 'text',
        'id': 'name',
        'name': 'name',
        'required': true,
        'display': true,
        'label': 'Name',
        'placeholder': 'Enter Name',
        'link':
        {
            'link': '/attendencedetail',
            'dynamic': true
        },
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'email',
        'id': 'email',
        'name': 'email',
        'required': true,
        'display': true,
        'label': 'Email',
        'placeholder': 'Enter Email',
        'icon': <EmailIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'address',
        'name': 'address',
        'required': true,
        'display': true,
        'label': 'Address',
        'placeholder': 'Enter Address',
        'icon': <HomeIcon className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'date_of_joining',
        'name': 'date_of_joining',
        'required': true,
        'display': true,
        'label': 'Date of Joining',
        'placeholder': 'Select Date of Joining',
        'icon': <CalendarTodayIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'phone',
        'name': 'phone',
        'required': true,
        'display': true,
        'label': 'Phone',
        'placeholder': 'Enter Phone Number',
        'icon': <PhoneIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'role',
        'name': 'role',
        'required': true,
        'display': true,
        'label': 'Role',
        'placeholder': 'Enter Your Role',
        'icon': <SupervisorAccountIcon className={iconCss} />
    },
    {
        label: "Action",
        placeholder: "Action",
        required: false,
        display: true,
    }
];

export default displayEmployeeArr;
