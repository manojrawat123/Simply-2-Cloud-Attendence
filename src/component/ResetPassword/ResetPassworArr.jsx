
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700`;
const resetPasswordArr = [{
    type: "password",
    id: "password",
    name: "password",
    required: true,
    placeholder: "Enter New Password",
    icon: <LockIcon className={iconCss} />
  },
  {
    type: "password",
    id: "password2",
    name: "password2",
    required: true,
    placeholder: "Confirm Password",
    icon: <LockIcon className={iconCss} />
  },]

  export default resetPasswordArr;