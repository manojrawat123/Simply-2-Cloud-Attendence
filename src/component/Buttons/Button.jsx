import { CircularProgress } from '@mui/material';
import React from 'react';

const NormalButton = ({ func, title, color, button }) => {
    return (
        <button
            onClick={func}
            className={"text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full my-2 " + color}
        >
            {button ? <CircularProgress size={19} color='inherit' /> : title}
        </button>
    )
}

export default NormalButton;
