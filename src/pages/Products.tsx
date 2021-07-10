import { Avatar, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { CustomModal } from "../components";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoOutlined';
import React, { useEffect, useRef, useState } from 'react';

interface ProductsProps {

}

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5)
    },
    table: {
        width: "100%",
        minHeight: "62vh",
        marginTop: theme.spacing(1.5)
    },
    modalContainer: {
        background: "#fff",
        width: "40vw",
        minHeight: "50vh",
        borderRadius: 10,
        padding: 30
    },
    createBtn: {
        marginLeft: "auto"
    },
    formContainer: {
        display: "flex",
        justifyContent: "center"
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
    createModalBtn: {
        borderRadius: 10,
        marginTop: theme.spacing(2)
    },
    addPhotoIcon: {
        transition: theme.transitions.create(["fontSize"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        })
    }
}))

const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 200 },
    { field: "productName", headerName: "Product Name", width: 300 },
    {
        field: "icon", headerName: "Icon", width: 200, renderCell: (params: GridCellParams) => (
            <Avatar src={params.value ? params.value.toString() : ""} />
        )
    }
]

const rows = [
    { id: 1, productName: "Electronics", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" },
    { id: 2, productName: "Building And Construction", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" },
    { id: 3, productName: "Agro Chemicals", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png"},
    { id: 4, productName: "Cosmetics", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png"},
    { id: 5, productName: "Shirts", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png"},
    { id: 6, productName: "Kicks", icon: "https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png"},
]

const Products: React.FC<ProductsProps> = ({ }) => {
    const classes = useStyle();
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>();
    let inputRef = useRef<HTMLInputElement | null>(null);
    const [selected, setSelected] = useState<any | null>(null);
    const { register } = useForm();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(selected){
            setOpen(true);
        }
    }, [selected])

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

    const handleSelect = (params: GridCellParams) => {
        setSelected(params.row)
    }
    const handleUpdate = () => {
        
    }
    const handleCreate = () => {
        console.log("create")
    }
    return (
        <div className={classes.container}>
            <CustomModal open={open} beforeClose={() => {setSelected(null)}} setOpen={setOpen}>
                <div className={classes.modalContainer}>
                    <input type="file" accept="image/*" onChange={handleFileInputChange} ref={inputRef} hidden />
                    <Typography variant="h6" style={{ color: "#ccc", marginLeft: 12, fontWeight: 200 }}>New Product</Typography>
                    <div className={classes.formContainer}>
                        <div className={classes.inputsContainer}>
                            <div className={classes.inputContainer}>
                                <TextField {...register("name", { required: true })}
                                    InputLabelProps={{ className: classes.inputLabel }}
                                    defaultValue={selected && selected.productName}
                                    placeholder={selected ? "Product Name" : ""}
                                    InputProps={{
                                        className: classes.input
                                    }} variant="outlined" label={!selected ? "Product Name" : ""} />
                                    {
                                        selected 
                                        ?
                                        <Button variant="outlined" className={classes.createModalBtn} onClick={handleUpdate}>Update</Button>
                                        :
                                        <Button variant="outlined" className={classes.createModalBtn} onClick={handleCreate}>Create</Button>
                                    }
                            </div>
                        </div>
                        <Paper elevation={0} className={clsx(classes.logoContainer, classes.boxShadow)}>
                            <div onClick={() => { inputRef.current?.click() }} className={classes.clickOverlay}>
                                <AddAPhotoIcon style={{ color: "#ddd" }} className={classes.addPhotoIcon} />
                            </div>
                            {
                                !selected
                                ?
                                <Avatar className={classes.avatar} alt="Vendor Logo" src={previewSource ? previewSource.toString() : undefined} />
                                :
                                <Avatar className={classes.avatar} alt="Vendor Logo" src={previewSource ? previewSource.toString() : selected.icon} />
                            }
                        </Paper>
                    </div>
                    </div>
            </CustomModal>
            <div style={{ display: "flex" }}>
                <Button variant="outlined" className={`${classes.createBtn} box-shadow`} onClick={() => { setOpen(true) }}>Create</Button>
            </div>
            <div className={classes.table}>
                <DataGrid rows={rows} onCellClick={handleSelect} columns={columns} disableSelectionOnClick checkboxSelection />
            </div>
        </div>
    )
}

export default Products;