import { Avatar, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import clsx from "clsx";
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import * as ROUTES from "../constants/routes";
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoOutlined';
import { selectSelectedVendor } from '../features/vendors/VendorSlice';

interface VendorCreateUpdateProps {
    create?: boolean;
    edit?: boolean;
}

const optionLocations = [
    { value: "sunyani", label: "Sunyani" },
    { value: "accra", label: "Accra" },
    { value: "kumasi", label: "kumasi" },
    { value: "techiman", label: "techiman" }
]
const optionProducts = [
    { value: "computerElectronics", label: "Computer Electronics" },
    { value: "agroChemicals", label: "Agro Chemicals" },
    { value: "stationery", label: "Stationery" },
    { value: "buildingAndConstruction", label: "Building And Construction" }
]

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        maxWidth: 800,
        margin: "auto",
        marginTop: theme.spacing(3),
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        flex: 1,
        minHeight: "60vh",
        display: "flex",
        justifyContent: "space-around",
        marginRight: theme.spacing(2),
        padding: 40
    },
    logoContainer: {
        height: "30vh",
        width: 280,
        marginLeft: theme.spacing(2),
        position: "relative"
    },
    right: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
    },
    boxShadow: {
        boxShadow: "-1px 4px 12px -11px rgba(0,0,0,0.75);"
    },
    input: {
        height: 40,
        width: 280
    },
    inputSm: {
        height: 40,
        width: 135,
        marginLeft: 2,
        marginRight: 2,
    },
    inputContainer: {
        margin: theme.spacing(1)
    },
    inputLabel: {
        position: "absolute",
        top: 0,
        transform: "translate(10px, 12px)"
    },
    inputsContainer: {
        display: "flex",
        flexDirection: "column",
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        position: "relative",
        zIndex: 10
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
    createBtn: {
        width: "95%",
        margin: "auto",
        borderRadius: 5,
        marginTop: theme.spacing(2.5)
    },
    addPhotoIcon: {
        transition: theme.transitions.create(["fontSize"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        })
    }
}))


const VendorCreateUpdate: React.FC<VendorCreateUpdateProps> = ({ create, edit }) => {
    const classes = useStyle();
    const { register, trigger, reset, handleSubmit } = useForm();
    const params = useParams();
    const selectedEdit = useSelector(selectSelectedVendor);
    const history = useHistory();
    /* const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>();
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
    } */

    const handleCreate = (data: any) => {
        console.log(data)
    }

    const handleUpdate = (data: any) => {
        console.log(data)
    }

    useEffect(() => {
        if (edit) {
            if (!selectedEdit) history.push(ROUTES.VENDORS);
        }

    }, [selectedEdit])

    return (
        <div className={classes.container}>
            <Paper className={clsx(classes.formContainer, classes.boxShadow)} elevation={0}>
                {/* <input type="file" accept="image/*" onChange={handleFileInputChange} ref={inputRef} hidden /> */}
                <div className={classes.inputsContainer}>
                    <div className={classes.inputContainer}>
                        <TextField {...register("name", { required: true })}
                            defaultValue={edit && selectedEdit?.vendorName}
                            placeholder={edit ? "Vendor Name" : ""}
                            InputLabelProps={{ className: classes.inputLabel }}
                            InputProps={{
                                className: classes.input
                            }} variant="outlined" label={create ? "Vendor Name" : ""} />
                    </div>
                    <div className={classes.inputContainer}>
                        <Select options={optionProducts} defaultValue={edit ? { label: selectedEdit?.product, value: selectedEdit?.product } : undefined} className={classes.input} styles={{
                            control: (base, state) => ({
                                ...base,
                                background: "#fff",
                                opacity: 1
                            }),
                            menu: (base) => ({
                                ...base,
                                background: "#fff",
                                opacity: 1,
                                zIndex: 100
                            }),
                            menuList: (base) => ({
                                ...base,
                                background: "#fff",
                            })
                        }} placeholder="Select Product Category" />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField {...register("email", { required: true })}
                            InputLabelProps={{ className: classes.inputLabel }}
                            defaultValue={edit && selectedEdit?.email}
                            placeholder={edit ? "Email" : ""}
                            type="email"
                            InputProps={{
                                className: classes.input
                            }} variant="outlined" label={create ? "Email" : ""} />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField {...register("phone", { required: true })}
                            InputLabelProps={{ className: classes.inputLabel }}
                            type="tel"
                            defaultValue={edit && selectedEdit?.phoneNumber}
                            placeholder={edit ? "Phone" : ""}
                            InputProps={{
                                className: classes.input
                            }} variant="outlined" label={create ? "Phone Number" : ""} />
                    </div>
                    {
                        create
                            ?
                            <Button variant="outlined" className={classes.createBtn} onClick={handleSubmit(handleCreate)}>Create</Button>
                            :
                            <Button variant="outlined" className={classes.createBtn} onClick={handleSubmit(handleUpdate)}>Update</Button>
                    }
                    {/* <div className={classes.inputContainer}>
                        <Typography variant="body1" style={{ color: "#ccc" }}>Location: </Typography>
                        <div style={{ display: "flex", marginTop: 10 }}>
                            <TextField {...register("longitude", { required: true })}
                                InputLabelProps={{ className: classes.inputLabel }}
                                defaultValue={edit && selectedEdit?.longitude}
                                placeholder={edit ? "Longitude" : ""}
                                InputProps={{
                                    className: classes.inputSm
                                }} variant="outlined" label={create ? "Longitude" : ""} />
                            <TextField {...register("latitude", { required: true })}
                                InputLabelProps={{ className: classes.inputLabel }}
                                defaultValue={edit && selectedEdit?.latitude}
                                placeholder={edit ? "Latitude" : ""}
                                InputProps={{
                                    className: classes.inputSm
                                }} variant="outlined" label={create ? "Latitude" : ""} />
                        </div>
                    </div> */}
                </div>
                {
                    edit 
                    &&
                    <div className={classes.right}>
                        <Paper elevation={0} className={clsx(classes.logoContainer, classes.boxShadow)}>
                            <Avatar className={classes.avatar} alt="Vendor Logo" src={selectedEdit?.icon} />    
                        </Paper>
                    </div>
                }
                {/* <div className={classes.right}>
                    <Paper elevation={0} className={clsx(classes.logoContainer, classes.boxShadow)}>
                        <div onClick={() => { inputRef.current?.click() }} className={classes.clickOverlay}>
                            <AddAPhotoIcon style={{ color: "#ddd" }} className={classes.addPhotoIcon} />
                        </div>
                        {
                            create
                                ?
                                <Avatar className={classes.avatar} alt="Vendor Logo" src={previewSource ? previewSource.toString() : undefined} />
                                :
                                <Avatar className={classes.avatar} alt="Vendor Logo" src={previewSource ? previewSource.toString() : selectedEdit?.icon} />
                        }
                    </Paper>
                    
                </div> */}
            </Paper>
        </div>
    )
}

export default VendorCreateUpdate;