import { Backdrop, ClickAwayListener, Fade, makeStyles, Modal, ModalProps } from '@material-ui/core';
import React from 'react';

interface CustomModalProps{
    open: boolean;
    setOpen: (val: boolean) => void; 
    width?: number;
    beforeClose?: () => void;
    modalProps?: ModalProps;
    disableClickAway?: boolean;
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
    const {disableClickAway} = props;
    return (
         <Modal 
            {...props.modalProps}
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
                    {
                        !disableClickAway
                        ?
                        <ClickAwayListener onClickAway={() => {
                            props.beforeClose && props.beforeClose()
                            props.setOpen(false)
                        }}>
                            {props.children}
                        </ClickAwayListener>
                        :
                        props.children
                    }

                </div>
             </Fade>

         </Modal>
    )
}

export default CustomModal;