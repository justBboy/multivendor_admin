import React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, responsiveFontSizes, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from "./constants/routes";
import { drawerWidth } from './components/Sidebar';
import { TOPBAR_HEIGHT } from './components/Topbar';
import { Topbar, Sidebar } from "./components";
import { Vendors, VendorCreate, VendorEdit, Analytics, Products, Admins, AdminsCreate, AdminsEdit, Feedbacks, AppManagement } from './pages';
import { useSelector } from 'react-redux';
import { selectPage } from './features/pageTransitions';
import { AnimatePresence, motion } from 'framer-motion';

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
            <AnimatePresence exitBeforeEnter>
                <Router>
                    <CssBaseline />
                    <Topbar />
                    <div className={classes.mainContainer}>
                        <Sidebar />
                        <div className={classes.mainContent}>
                            <Route path={ROUTES.VENDORS}>
                                <Switch>
                                    <Route path={ROUTES.VENDORS_CREATE}>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <VendorCreate />
                                        </motion.div>
                                    </Route>
                                    <Route path={ROUTES.VENDORS_EDIT}>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <VendorEdit />
                                        </motion.div>
                                    </Route>
                                    <Route path="/">
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <Vendors />
                                        </motion.div>
                                    </Route>
                                </Switch>
                            </Route>
                            <Route path={ROUTES.PRODUCTS}>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                >
                                    <Products />
                                </motion.div>
                            </Route>
                            <Route path={ROUTES.ADMINS}>
                                <Switch>
                                    <Route path={ROUTES.ADMINS_CREATE}>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <AdminsCreate />
                                        </motion.div>
                                    </Route>
                                    <Route path={ROUTES.ADMINS_EDIT}>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <AdminsEdit />
                                        </motion.div>
                                    </Route>
                                    <Route path="">
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                        >
                                            <Admins />
                                        </motion.div>
                                    </Route>
                                </Switch>
                            </Route>
                            <Route path={ROUTES.FEEDBACKS}>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                >
                                    <Feedbacks />
                                </motion.div>
                            </Route>
                            <Route path={ROUTES.APP_MANAGEMENT}>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                >
                                    <AppManagement />
                                </motion.div>
                            </Route>
                            <Route exact path={ROUTES.ANALYTICS}>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}
                                >
                                    <Analytics />
                                </motion.div>
                            </Route>
                        </div>
                    </div>
                </Router>
            </AnimatePresence>
        </ThemeProvider>
    )
}

export default Routes;