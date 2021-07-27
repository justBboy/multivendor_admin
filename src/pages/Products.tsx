import { Avatar, Button, CircularProgress, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { CustomModal } from "../components";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoOutlined';
import React, { useEffect, useRef, useState } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ConfirmModal from '../components/ConfirmModal';
import { v4 as uuidV4 } from "uuid";
import { db, storage } from '../Firebase';
import colors from '../constants/colors';
import { useSelector } from 'react-redux';
import { addCategory, deleteCategory, fetchCategories, selectCategories, updateCategory } from '../features/categories/CategorySlice';
import { categoryType } from '../constants/types';
import { useAppDispatch } from '../app/hooks';

interface ProductsProps {

}

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
    },
    table: {
        width: "100%",
        minHeight: "62vh",
        marginTop: theme.spacing(1.5),
        backgroundColor: "#fff"
    },
    modalContainer: {
        background: "#fff",
        width: "40vw",
        minHeight: "50vh",
        borderRadius: 10,
        position: "relative",
        padding: 30
    },
    createBtn: {
        marginLeft: "auto",
        backgroundColor: "#fff"
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
    },
    loaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
        zIndex: 200,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

type rowType = {
    id: string;
    categoryName: string;
    iconName: string;
    icon: string;
    description: string;
}

const Products: React.FC<ProductsProps> = ({ }) => {
    const classes = useStyle();
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>();
    let inputRef = useRef<HTMLInputElement | null>(null);
    const [selected, setSelected] = useState<any | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [name, setName] = useState("");
    const [rows, setRows] = useState<rowType[]>([]);
    const categories = useSelector(selectCategories);
    const dispatch = useAppDispatch();



    const columns: GridColDef[] = [
        { field: "id", headerName: "id", width: 200 },
        { field: "categoryName", headerName: "Category Name", width: 300 },
        {
            field: "icon", headerName: "Icon", width: 200, renderCell: (params: GridCellParams) => (
                <Avatar src={params.value ? params.value.toString() : ""} />
            )
        },
        { field: "iconName", hide: true },
        {
            field: "del", headerName: "Del", width: 120, renderCell: (params: GridCellParams) => (
                <div>
                    <ConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} onCancel={() => { setDeleteModalOpen(false) }} onOk={() => { handleDelete(params.row) }} />
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModalOpen(true)
                    }}>
                        <DeleteOutlineIcon style={{ color: "#a33" }} />
                    </IconButton>
                </div>
            )
        }
    ]


    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        if (file) {
            previewFile(file[0]);
        }
    }
    const handleRemoveImage = () => {
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
            handleRemoveImage();
        }
    }


    const handleSelect = (params: GridCellParams) => {
        handleRemoveImage();
        setName(params.row.categoryName);
        setSelected(params.row)
    }

    const handleUpdate = () => {
        const exists = categories?.findIndex((item: categoryType) => item.title === selected.categoryName);
        if (exists !== -1) {
            console.log(previewSource)
            setLoading(true);
            db.collection("product_categories").doc(`${selected.categoryName}`).get()
                .then(doc => {
                    if (doc && doc.exists) {
                        const d = doc?.data();
                        console.log(d?.title === name);
                        if (d?.title !== name) {
                            /* 
                                update title or title and image if they're changed
                            */
                            console.log("not same name")
                            if (previewSource) {
                                const metadata = {
                                    contentType: "image"
                                }
                                storage.ref()
                                    .child(`category_images/${name}`)
                                    .putString(previewSource.toString(), "data_url", metadata)
                                    .then(() => {
                                        const imageRef = storage.ref().child(`category_images/${name}`);
                                        imageRef.getDownloadURL()
                                            .then(url => {
                                                const newData = {
                                                    id: uuidV4(),
                                                    title: name,
                                                    imageUrl: url,
                                                    imageName: name,
                                                    description: ""
                                                }
                                                db.collection("product_categories").doc(name).set(newData)
                                                    .then(() => {
                                                        setLoading(false);
                                                        reset();
                                                        dispatch(updateCategory({
                                                            data: newData,
                                                            oldId: d?.id
                                                        }))
                                                        setSelected(null)
                                                        storage.ref().child(`category_images/${selected.categoryName}`)
                                                            .delete()
                                                            .then(() => {
                                                                console.log("deleted")
                                                            })
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                        db.collection("product_categories").doc(d?.title).delete();
                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                        setLoading(false);
                                                    })
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                setLoading(false);
                                            })
                                    })
                                    .catch(err => {
                                        setLoading(false);
                                        console.log(err);
                                    })
                            } else {
                                console.log("else")
                                const newData = {
                                    id: uuidV4(),
                                    title: name,
                                    imageUrl: d?.imageUrl,
                                    imageName: d?.imageName,
                                    description: ""
                                }
                                db.collection("product_categories").doc(name).set(newData)
                                    .then(() => {
                                        setLoading(false);
                                        reset();
                                        dispatch(updateCategory({
                                            data: newData,
                                            oldId: d?.id
                                        }))
                                        setSelected(null)
                                        db.collection("product_categories").doc(d?.title).delete();
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        setLoading(false);
                                    })
                            }

                        } else {
                            /* 
                                update image if it was the only one changed
                            */
                            if (previewSource) {
                                const metadata = {
                                    contentType: "image"
                                }
                                storage.ref()
                                    .child(`category_images/${name}`)
                                    .putString(previewSource.toString(), "data_url", metadata)
                                    .then(() => {
                                        const imageRef = storage.ref().child(`category_images/${name}`);
                                        imageRef.getDownloadURL()
                                            .then(url => {
                                                const newData = {
                                                    id: uuidV4(),
                                                    title: name,
                                                    imageUrl: url,
                                                    imageName: name,
                                                    description: ""
                                                }
                                                db.collection("product_categories").doc(name).set(newData)
                                                    .then(() => {
                                                        setLoading(false);
                                                        reset();
                                                        dispatch(updateCategory({
                                                            data: newData,
                                                            oldId: d?.id
                                                        }))
                                                        setSelected(null)
                                                        if (name !== d?.imageName) {
                                                            storage.ref().child(`category_images/${d?.imageName}`)
                                                            .delete()
                                                            .then(() => {
                                                                console.log("deleted")
                                                            })
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                        }

                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                        setLoading(false);
                                                    })
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                })
        }
    }

    const handleCreate = () => {
        const exists = categories?.findIndex((item: categoryType) => item.title === name);
        console.log(exists);
        if (exists === -1) {
            const metadata = {
                contentType: "image"
            }
            if (previewSource) {
                setLoading(true);
                storage.ref()
                    .child(`category_images/${name}`)
                    .putString(previewSource.toString(), "data_url", metadata)
                    .then(snapshot => {
                        const imageRef = storage.ref().child(`category_images/${name}`)
                        imageRef.getDownloadURL()
                            .then(url => {
                                const d = {
                                    id: uuidV4(),
                                    title: name,
                                    imageUrl: url,
                                    imageName: name,
                                    description: ""
                                }
                                db.collection("product_categories").doc(`${name}`)
                                    .set(d)
                                    .then((snapshot) => {
                                        dispatch(addCategory(d));
                                        reset();
                                        handleRemoveImage();
                                        setLoading(false);
                                    })
                                    .catch(err => {
                                        setLoading(false);
                                        console.log(err)
                                    })
                            })
                            .catch(err => {
                                setLoading(false)
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err);
                    })
            }
        }
        else {
            console.log("error")
        }
        return false;
    }
    const handleDelete = (row: any) => {
        db.collection("product_categories").doc(`${row.categoryName}`)
            .delete()
            .then((snapshot) => {
                storage.ref()
                    .child(`category_images/${row.iconName}`)
                    .delete()
                    .then(() => {
                        console.log("image deleted")
                    })
                    .catch(err => {
                        console.log(err)
                    })
                dispatch(deleteCategory(row.id));
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (selected) {
            setOpen(true);
        } else {
            setOpen(false)
        }
    }, [selected])
    useEffect(() => {
        if (!categories?.length) dispatch(fetchCategories());
    }, [])
    useEffect(() => {
        const data: rowType[] = categories?.map((item: categoryType) => ({
            id: item.id,
            categoryName: item.title,
            icon: item.imageUrl,
            iconName: item.imageName,
            description: item.description
        }))
        setRows(data);
    }, [categories])
    return (
        <div className={classes.container}>
            <CustomModal open={open} beforeClose={() => { setSelected(null) }} setOpen={setOpen}>
                <div className={classes.modalContainer}>
                    {
                        loading
                        &&
                        <div className={classes.loaderContainer}>
                            <CircularProgress size={28} style={{ color: colors.deepPrimary }} />
                        </div>
                    }

                    <input type="file" accept="image/*" onChange={handleFileInputChange} ref={inputRef} hidden />
                    <Typography variant="h6" style={{ color: "#ccc", marginLeft: 12, fontWeight: 200 }}>New Product</Typography>
                    <div className={classes.formContainer}>
                        <div className={classes.inputsContainer}>
                            <div className={classes.inputContainer}>
                                <TextField value={name} onChange={(e) => {setName(e.target.value)}}
                                    required
                                    InputLabelProps={{ className: classes.inputLabel }}
                                    defaultValue={selected && selected.categoryName}
                                    placeholder={selected ? "Category " : ""}
                                    autoComplete="false"
                                    InputProps={{
                                        className: classes.input
                                    }} variant="outlined" label={!selected ? "Category " : ""} />
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
                <Button variant="outlined" className={`${classes.createBtn} box-shadow`} onClick={() => {
                    setName("");
                    setOpen(true)
                }}>Create</Button>
            </div>
            <div className={classes.table}>
                <DataGrid rows={rows} onCellClick={handleSelect} columns={columns} disableSelectionOnClick checkboxSelection />
            </div>
        </div>
    )
}

export default Products;