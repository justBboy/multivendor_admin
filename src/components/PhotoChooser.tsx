import {Avatar, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoOutlined';
import clsx from "clsx";

interface PhotoChooserProps{
    default?: boolean; 
    defaultLogo?: string;
    alt?: string;
    handleSubmit?: (val: string | ArrayBuffer | null) => void;
}

const useStyle = makeStyles(theme => ({
    container: {

    },
    clickOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.25)",
        transition: theme.transitions.create(['background'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        }),
        borderRadius: 10,
        "&:hover": {
            cursor: "pointer",
            background: "rgba(0, 0, 0, 0.30)",
            "& $addPhotoIcon": {
                fontSize: 30
            }
        }
    },
    addPhotoIcon: {
        transition: theme.transitions.create(["fontSize"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        })
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        position: "relative",
        zIndex: 10
    },
}))

const PhotoChooser:React.FC<PhotoChooserProps> = (props) => {
    const classes = useStyle();
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>();
    let inputRef = useRef<HTMLInputElement | null>(null);
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        if (file) {
            previewFile(file[0]);
        }
    }
    const handleLogoRemove = () => {
        setPreviewSource(null);
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }
    const previewFile = (file: File) => {
        const reader = new FileReader();
        try {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSource(reader.result);
            }
        } catch (err) {
            console.log(err);
            handleLogoRemove();
        }
    }
    return (
        <div className={classes.container}>
            <input type="file" accept="image/*" onChange={handleFileInputChange} ref={inputRef} hidden />
            {
                props.default
                &&
                <div onClick={() => { inputRef.current?.click() }} className={classes.clickOverlay}>
                    <AddAPhotoIcon style={{ color: "#ddd" }} className={classes.addPhotoIcon} />
                </div>
            }
            {
                !props.defaultLogo
                ?
                <Avatar className={classes.avatar} alt={props.alt ? props.alt : ""} src={previewSource ? previewSource.toString() : undefined} />
                :
                <Avatar className={classes.avatar} alt={props.alt ? props.alt : ""} src={previewSource ? previewSource.toString() : props.defaultLogo} />
            }
                        
        </div>
    )
}

export default PhotoChooser;