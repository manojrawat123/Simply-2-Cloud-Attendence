import { Description, FileCopy, PersonPinCircleOutlined, Subject } from "@mui/icons-material";


const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const sendMailArr = [
    {
        type: "dynamicoption", 
        name: "batch_id",
        label: "Batch",
        required : true,
        placeholder: "Select Batch",
        icon : <PersonPinCircleOutlined className={iconCss}/>
    },
    {
        type: "dynamicoption", 
        name: "template_id",
        label: "Template",
        required : true,
        placeholder: "Select Template",
        icon : <PersonPinCircleOutlined className={iconCss}/>
    },
    {
        type: "text",
        name: "subject",
        required : true,
        label: "Subject",
        placeholder: "Enter subject here",
        icon : <Subject className={iconCss}/>
    },
    {
        type: "textarea",
        name: "body",
        required : true,
        label: "Body",
        placeholder: "Enter the body of the email here",
        icon : <Description className={iconCss}/>
    },
    {
        type: "textarea",
        name: "signature",
        required : true,
        label: "Signature",
        placeholder: "Enter your signature here",
        icon : <Description className={iconCss}/>
    }
];

export default sendMailArr;
