import React from 'react';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ForgotPasswordForm from './ForgotPassword';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

const ForgotPasswordModel = ({forgotPassword, setForgotPassword}) => {
    return (
        <BootstrapDialog
            onClose={() => {
                setForgotPassword(false);
            }}
            aria-labelledby="customized-dialog-title"
            open={forgotPassword}
            fullWidth
            // maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Reset Password
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => {
                    setForgotPassword(false);
                }}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <ForgotPasswordForm setForgotPassword={setForgotPassword}/>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default ForgotPasswordModel
