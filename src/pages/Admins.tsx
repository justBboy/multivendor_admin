import { Avatar, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import clsx from "clsx";
import React, { useState } from 'react';
import * as ROUTES from "../constants/routes";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccountOutlined';
import { setSelectedAdmin } from '../features/admins/AdminsSlice';
import PersonIcon  from '@material-ui/icons/PersonOutlineOutlined';

interface AdminsProps{
    
}

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
    tableContainer: {
        width: "100%",
        minHeight: "68vh",
        margin: "auto"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    searchInput: {
        outline: "none",
        border: "none",
        width: "100%"
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 280,
        marginBottom: theme.spacing(2),
        marginTop: 10,
        borderRadius: 5,
        padding: 10
    },
}))

const rows = [
    {id: 1, userName: "Gideon", role: 1, avatar: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg", email: "justBboy1@gmail.com", phone: "0247506391"},
    {id: 2, userName: "Kwasi Mensah", role: 0, avatar: "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png", email: "justBboy1@gmail.com", phone: "0247506391"},
    {id: 3, userName: "Something nice", role: 0, avatar: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png", email: "justBboy1@gmail.com", phone: "0247506391"},
    {id: 4, userName: "Nana I'm Shy", role: 0, avatar: "https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg", email: "justBboy1@gmail.com", phone: "0247506391"},
    {id: 5, userName: "Levels don change", role: 0, avatar: "https://teacherchallenge.edublogs.org/files/2016/11/cartoonify-vqwpfj.png", email: "justBboy1@gmail.com", phone: "0247506391"},
]


const Admins:React.FC<AdminsProps> = ({}) => {
    const classes = useStyle();
    const [search, setSearch] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const columns:GridColDef[] = [
        {field: "id", headerName: "id", width: 70},
        {field: "avatar", hide: true},
        {field: "email", headerName:"Email", width: 250, renderCell: (params: GridCellParams) => {
            return (
                <div className={classes.flex}>
                    <Avatar src={params.row.avatar?.toString()} />
                    <Typography variant="body1" style={{fontSize: 14, color: "#333", marginRight: 5, marginLeft: 5}}>{params.value}</Typography>
                </div>
            )
        }},
        {field: "userName", headerName: "User Name", width: 200},
        {field: "phone", headerName: "Phone Number", width: 170},
        {field: "role", headerName: "Role", width: 200, renderCell: (params: GridCellParams) => {
            if (params.value === 1){
                return <SupervisorAccountIcon titleAccess="Super Admin" color="primary" />
            }
            else{
                return <PersonIcon color="disabled" titleAccess="Regular Admin" />
            }
        }}
    ]
    const handleCreateRoute = () => {
        history.push(ROUTES.ADMINS_CREATE);
    }

    const handleEditRoute = (params: GridCellParams) => {
        dispatch(setSelectedAdmin(params.row));
        history.push(`${ROUTES.ADMINS}/edit/${params.id}`)
    }
    return (
         <div className={classes.container}>
             <div className={classes.flex}>
                 <Paper elevation={0} className={`${classes.searchContainer} box-shadow`}>
                     <input type="text" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} className={classes.searchInput} />
                 </Paper>
                 <Paper elevation={0} style={{marginLeft: "auto"}} className={`box-shadow`}>
                     <Button variant="outlined" onClick={handleCreateRoute}>Create</Button>
                 </Paper>
             </div>
            <Paper elevation={0} className={clsx(classes.tableContainer, "box-shadow")}>
                <DataGrid rows={rows} columns={columns} onCellClick={handleEditRoute} pageSize={20} disableSelectionOnClick checkboxSelection />
            </Paper>
         </div>
    )
}

export default Admins;