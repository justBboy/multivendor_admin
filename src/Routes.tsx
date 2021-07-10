import React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, responsiveFontSizes } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from "./constants/routes";
import { drawerWidth } from './components/Sidebar';
import { TOPBAR_HEIGHT } from './components/Topbar';
import { Topbar, Sidebar } from "./components";
import { Vendors, VendorCreate, VendorEdit, Analytics, Products, Admins, AdminsCreate, AdminsEdit } from './pages';
import { useSelector } from 'react-redux';
import { selectPage } from './features/pageTransitions';

let theme = createTheme({
    palette: {
        common: {
            white: "#fefefe"
        },
        error: {
            main: "#d50000"
        }
    }
});

theme = responsiveFontSizes(theme);

const useStyle = makeStyles(theme => ({
    mainContainer: {
        display: "flex",
    },
    mainContent: {
        flex: 1,
        marginLeft: drawerWidth,
        marginTop: TOPBAR_HEIGHT
    }
}))

const Routes: React.FC = ({ }) => {
    const classes = useStyle();
    const screenLocation = useSelector(selectPage);
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Topbar />
                <div className={classes.mainContainer}>
                    <Sidebar />
                    <div className={classes.mainContent}>
                        <Route path={ROUTES.VENDORS}>
                            <Switch>
                                <Route path={ROUTES.VENDORS_CREATE}>
                                    <VendorCreate />
                                </Route>
                                <Route path={ROUTES.VENDORS_EDIT}>
                                    <VendorEdit />
                                </Route>
                                <Route path="/">
                                    <Vendors />
                                </Route>
                            </Switch>
                        </Route>
                        <Route path={ROUTES.PRODUCTS}>
                            <Products />
                        </Route>
                        <Route path={ROUTES.ADMINS}>
                            <Switch>
                                <Route path={ROUTES.ADMINS_CREATE}>
                                    <AdminsCreate />
                                </Route>
                                <Route path={ROUTES.ADMINS_EDIT}>
                                    <AdminsEdit />
                                </Route>
                                <Route path="">
                                    <Admins />
                                </Route>
                            </Switch>
                        </Route>
                        <Route exact path={ROUTES.ANALYTICS}>
                            <Analytics />
                        </Route>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default Routes;