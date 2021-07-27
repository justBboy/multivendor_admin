import { Button, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react'

import CustomModal from './CustomModal';

interface ConfirmModalProps {
    open: boolean;
    setOpen: (val: boolean) => void;
    confirmText?: string;
    buttonCancelLabel?: string;
    buttonOkLabel?: string;
    onOk: () => void;
    onCancel: () => void;
}

const useStyle = makeStyles(theme => ({
    container:{
        backgroundColor: "#fff",
        minWidth: "50%",
        maxWidth: "220px",
        height: "140px",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    confirmText: {},
    buttons: {
        marginTop: 16,
        display: "flex"
    },
}))

export const ConfirmModal: React.FC<ConfirmModalProps> = ({onCancel, onOk, open, setOpen, confirmText="Are You Sure?", buttonCancelLabel= "Cancel", buttonOkLabel="ok"}) => {
    const theme = useTheme();
    const classes = useStyle();
     return (
         <CustomModal open={open} setOpen={setOpen}>
             <div className={`${classes.container}`}>
                 <Typography variant="h6">{confirmText}</Typography>
                 <div className={`${classes.buttons}`}>
                     <Button onClick={onCancel} style={{backgroundColor: theme.palette.error.main, color: "#fff", marginRight: theme.spacing(1)}} variant="contained">{buttonCancelLabel}</Button>
                     <Button onClick={onOk} style={{marginLeft: theme.spacing(1), backgroundColor: "coral", color: "#eee"}} variant="contained">{buttonOkLabel}</Button>
                 </div>
             </div>
         </CustomModal>
     )
}

export default ConfirmModal