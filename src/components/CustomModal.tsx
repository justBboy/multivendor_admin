import { Backdrop, ClickAwayListener, Fade, makeStyles, Modal, ModalProps } from '@material-ui/core';
import React from 'react';

interface CustomModalProps extends ModalProps{
    open: boolean;
    setOpen: (val: boolean) => void; 
    width?: number;
    beforeClose?: () => void;
}

const useStyle = makeStyles((theme) => ({
    paper: {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))


const CustomModal:React.FC<CustomModalProps> = (props) => {
    const classes = useStyle();
    return (
         <Modal 
            {...props}
            open={props.open} 
            onClose={() => {
                props.beforeClose && props.beforeClose()
                props.setOpen(false)
            }}
            BackdropComponent={Backdrop}
            closeAfterTransition
            BackdropProps={{
                timeout: 500
            }}
         >
             <Fade in={props.open}>
                <div className={classes.paper}>
                    <ClickAwayListener onClickAway={() => {
                        props.beforeClose && props.beforeClose()
                        props.setOpen(false)
                    }}>
                        {props.children}
                    </ClickAwayListener>
                </div>
             </Fade>

         </Modal>
    )
}

export default CustomModal;