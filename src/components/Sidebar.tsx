import { Button, Divider, Drawer, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { TOPBAR_HEIGHT } from './Topbar';
import { useHistory } from "react-router-dom";
import navigation from "../constants/navigation";
import { useDispatch } from 'react-redux';
import { changePage } from '../features/pageTransitions';

interface SidebarProps{
}

export const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
    sidebar: {
        position: "fixed",
        marginTop: TOPBAR_HEIGHT,
        width: drawerWidth,
        height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        background: theme.palette.common.white,
        border: "none",
        boxShadow: "2px 4px 12px -11px rgba(0,0,0,0.75);",
        overflowY: "auto",
    },
    container: {
        padding: 20
    },
    navBtn: {
        width: "100%",
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        boxShadow: "-1px 4px 12px -11px rgba(0,0,0,0.75);",
        display: "flex",
        alignItems: "center"
    },
    navIcon: {
        fontSize: 18,
    },
    navText: {
        fontSize: 14,
        width: "50%"
    }
}))

const Sidebar:React.FC<SidebarProps> = ({}) => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRoute = (route: string, name: string) => {
        history.push(route);
        dispatch(changePage(name))
    } 
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.sidebar
            }}
            elevation={0}
        >
            <div className={classes.container}>
                {
                    navigation.map(item => (
                        <>
                            <Button className={classes.navBtn} key={item.name} onClick={() => {handleRoute(item.route, item.name)}} variant="outlined">
                                <item.icon className={classes.navIcon} style={{marginRight: 10}} />
                                <Typography className={classes.navText} variant="body2">{item.name}</Typography>
                                </Button>
                            <Divider />
                        </>
                    ))
                }
            </div>
        </Drawer>
    )
}

export default Sidebar;