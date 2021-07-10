import { Avatar, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import clsx from "clsx";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Select from "react-select";
import { useDispatch } from 'react-redux';
import { changePage } from '../features/pageTransitions';
import { setSelectedVendor } from '../features/vendors/VendorSlice';


interface VendorsProps {

}



const rows = [
    { id: 1, vendorName: "Oastag Devs", longitude: 1.7, latitude: 10.211, product: "Computer Electronics: ", email: "oastagdevs@gmail.com", phoneNumber: "0247506391", location: "Sunyani", icon: "https://uilogos.co/img/logotype/treva.png" },
    { id: 2, vendorName: "Something Else", longitude: 1.7, latitude: 10.211, product: "Computer Electronics: ", email: "oastagdevs@gmail.com", phoneNumber: "0247506391", location: "Sunyani", icon: "https://uilogos.co/img/logotype/circle.png" },
]

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
        maxWidth: 1334,
        paddingLeft: 20,
        paddingRight: 20,
    },
    tableContainer: {
        width: "100%",
        minHeight: "68vh",
        boxShadow: "2px 0px 15px -11px rgba(0,0,0,0.75);",
        margin: "auto"
    },
    actionsContainer: {
        display: "flex",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    createBtn: {
        marginLeft: "auto",
        boxShadow: "-1px 4px 12px -7px rgba(0,0,0,0.75);"
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 5
    },
    searchInput: {
        outline: "none",
        border: "none"
    },
    filterBusinessType: {

    },
    boxShadow: {
        boxShadow: "-1px 4px 12px -7px rgba(0,0,0,0.75);",
    },
    filterBusinessSelect: {
        width: 170,
        height: "100%",
        border: "none",
        marginleft: 5,
        marginRight: 5
    },
    flex: {
        display: "flex",
        alignItems: "center"
    }
}))


const Vendors: React.FC<VendorsProps> = ({ }) => {
    const classes = useStyle();
    const [search, setSearch] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const columns: GridColDef[] = [
        { field: "id", headerName: "id", width: 130 },
        {
            field: "vendorName", headerName: "Vendor Name", width: 200, renderCell: (params: GridCellParams) => (
                <div className={classes.flex}>
                    <Avatar src={params.getValue(params.id, "icon")?.toString()} />
                    <Typography variant="body1" style={{color: "#333", fontSize: 14, marginLeft: 5}}>{params.row.vendorName}</Typography>
                </div>
            )
        },
        {field: "icon", hide: true},
        { field: "product", headerName: "Product Type", width: 200 },
        { field: "longitude", headerName: "Longitude", width: 170 },
        { field: "latitude", headerName: "Latitude", width: 170 },
        { field: "email", headerName: "Email", width: 170 },
        { field: "phoneNumber", headerName: "Phone Number", width: 170 },
        { field: "location", headerName: "Location", width: 170 },
    ]
    const handleCreateRoute = () => {
        console.log("create")
        history.push(ROUTES.VENDORS_CREATE);
        dispatch(changePage("Create Vendor"));
    }

    const handleEditRoute = (params: GridCellParams, event: React.MouseEvent) => {
        dispatch(setSelectedVendor(params.row));
        history.push(`${ROUTES.VENDORS}/edit/${params.id}`)
    }
    return (
        <div className={classes.container}>
            <div className={classes.actionsContainer}>
                <Paper elevation={0} className={clsx(classes.searchContainer, classes.boxShadow)}>
                    <input type="text" placeholder="Search" className={classes.searchInput} value={search} onChange={(e) => setSearch(e.target.value)} />
                </Paper>
                <Paper elevation={0} className={clsx(classes.filterBusinessType, classes.boxShadow)}>
                    <Select options={optionLocations} placeholder="Filter Location" className={classes.filterBusinessSelect} />
                </Paper>
                <Paper elevation={0} className={clsx(classes.filterBusinessType, classes.boxShadow)}>
                    <Select options={optionProducts} placeholder="Filter Product" className={classes.filterBusinessSelect} />
                </Paper>
                <Button variant="outlined" onClick={() => { handleCreateRoute() }} className={classes.createBtn}>Create</Button>
            </div>
            <Paper elevation={0} className={classes.tableContainer}>
                <DataGrid rows={rows} columns={columns} onCellClick={handleEditRoute} pageSize={20} disableSelectionOnClick checkboxSelection />
            </Paper>
        </div>

    )
}

export default Vendors;