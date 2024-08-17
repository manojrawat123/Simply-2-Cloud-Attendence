import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WorkIcon from '@mui/icons-material/Work';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const profileUpdateArr = [
    {
        'type': 'text',
        'id': 'name',
        'name': 'name',
        'label': 'Name',
        required: true,
        'placeholder': 'Enter your name',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'email',
        'id': 'email',
        'name': 'email',
        'label': 'Email',
        'placeholder': 'Enter your email',
        required: true,
        'icon': <EmailIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'address',
        'name': 'address',
        'label': 'Address',
        'placeholder': 'Enter your address',
        required: true,
        'icon': <HomeIcon className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'date_of_joining',
        'name': 'date_of_joining',
        'label': 'Date of Joining',
        'placeholder': 'Select date of joining',
        required: true,
        'icon': <DateRangeIcon className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'date_of_birth',
        'name': 'date_of_birth',
        'label': 'Date of Birth',
        'placeholder': 'Date of Birth',
        required: true,
        'icon': <DateRangeIcon
            className={iconCss}
        />
    },
    {
        'type': 'tel',
        'id': 'phone',
        'name': 'phone',
        'label': 'Phone',
        'placeholder': 'Enter your phone number',
        required: true,
        'icon': <PhoneIcon className={iconCss} />
    },
    {
        'type': 'text',
        'id': 'role',
        'name': 'role',
        'label': 'Role',
        'placeholder': 'Enter your role',
        required: true,
        'icon': <WorkIcon className={iconCss} />
    }
];

export default profileUpdateArr;
