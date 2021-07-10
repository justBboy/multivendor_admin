import { AppBar, Avatar, Badge, IconButton, InputAdornment, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import { drawerWidth } from './Sidebar';
import { useSelector } from 'react-redux';
import { selectPage } from '../features/pageTransitions';

interface TopbarProps{
}

export const TOPBAR_HEIGHT = 60;

const useStyle = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.common.white,
        height: TOPBAR_HEIGHT,
        boxShadow: "-1px 4px 12px -11px rgba(0,0,0,0.75);"
    },
    logo: {
        color: "#111",
        fontWeight: 700,
        padding: theme.spacing(0.8),
        borderRadius: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    icon: {
        color: "#6666644",
        boxShadow: "-1px 4px 12px -7px rgba(0,0,0,0.75);",
        padding: theme.spacing(0.5),
        fontSize: 20,
        borderRadius: theme.spacing(5),
        
    },
    iconButton: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen
        }),
        "&:hover": {
            transform: "scale(1.1)",
            background: "none",
        }
    },
    avatar: {
        marginLeft: 20,
        "&:hover": {
            cursor: "pointer",
        }
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    searchContainer: {
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 400
    },
    inputContainer: {
        width: "100%",
        outline: "none"
    },
    inputFocused: {
        outline: "none",
    },
    headerText: {
        color: "#ccc"
    }
}))

const Topbar:React.FC<TopbarProps> = ({}) => {
    const classes = useStyle();
    const screenLocation = useSelector(selectPage); 
    return (
         <AppBar elevation={0} className={classes.appBar}>
            <Toolbar className={classes.container}>
                <div style={{width: drawerWidth}}>
                    <Typography variant="h5" className={classes.logo}>Admin Logo</Typography>
                </div>
                <div style={{marginRight: "auto"}}>
                    <Typography className={classes.headerText} variant="h6">{screenLocation}</Typography>
                </div>
                <div className={classes.flex}>
                    <div className={classes.searchContainer}>
                        <TextField variant="outlined" placeholder="Search app" classes={{root: classes.inputContainer}}  InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{fontSize: 18}} />
                                </InputAdornment>
                            ),
                            style: {height: 30, padding: 5, width: "100%"}
                        }}  />
                    </div>
                    <IconButton className={classes.iconButton} style={{position: "relative"}} title="Notifications">
                         <Badge badgeContent={2} color="error">
                             <NotificationsNoneIcon className={classes.icon} />
                        </Badge>                       
                    </IconButton>
                    {/* <IconButton className={classes.iconButton} title="Add Vendor">
                        <PersonAddIcon className={classes.icon} />                        
                    </IconButton>
                    <IconButton className={classes.iconButton} title="Feedback">
                        <Badge badgeContent={10} color="error">
                            <CommentIcon className={classes.icon} />                        
                        </Badge>
                    </IconButton> */}
                    <div className={classes.avatar}>
                        <Avatar title="Kwame Mj" />
                    </div>
                </div>
            </Toolbar> 
        </AppBar>
    )
}

export default Topbar;