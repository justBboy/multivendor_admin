import { colors, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Tooltip, XAxis } from 'recharts';

interface AnalyticsProps {

}

const useStyle = makeStyles(theme => ({
    container: {
        width: "100%",
        marginTop: theme.spacing(5)
    },
    usageChartContainer: {
        width: 550
    },
    headerText: {
        color: "#ccc",
        fontWeight: 200,
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    right: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    smallChart: {
        width: 550,
    }
}))

const usageData = [
    { name: "January", usage: 80 },
    { name: "Febuary", usage: 300 },
    { name: "March", usage: 1122 },
    { name: "April", usage: 840 },
    { name: "May", usage: 950 },
    { name: "June", usage: 1400 },
]

const topSellingUsers = [
    { name: "OastagDevs", rate: 800 },
    { name: "Cosmetic Shop", rate: 712 },
    { name: "Yaw Shop", rate: 600 },
    { name: "Mj Shop", rate: 500 },
    { name: "Gideon Shop", rate: 420 },
]

const topSellingLocations = [
    { location: "Kumasi", rate: 620 },
    { location: "Accra", rate: 612 },
    { location: "Sunyani", rate: 400 },
    { location: "Tamale", rate: 320 },
    { location: "Techiman", rate: 210 }
]

const topSellingProducts = [
    {product: "Electronics", rate: 1200},
    {product: "Cosmetics", rate: 1000},
    {product: "agrochemicals", rate: 900},
    {product: "building tools", rate: 600},
    {product: "Dresses", rate: 450}
]

const barColorsLocations = [colors.red[300], colors.blue[300], colors.green[300], colors.deepPurple[300], colors.indigo[300]]
const barColorsUsers = [ colors.deepOrange[300], colors.pink[300], colors.blueGrey[300], colors.purple[300], colors.lime[300]]
const barColorsProducts = [ colors.amber[300], colors.red[200], colors.orange[200], colors.teal[300], colors.yellow[100]]

const Analytics: React.FC<AnalyticsProps> = ({ }) => {
    const classes = useStyle();
    const theme = useTheme();
    return (
        <div className={classes.container}>
            <div>
                <div style={{ display: "flex" }}>
                    <div className={`${classes.usageChartContainer} box-shadow`}>
                        <Typography variant="h6" className={classes.headerText}>Usage Data | Monthly</Typography>
                        <LineChart data={usageData} width={550} height={400}>
                            <Line type="monotone" dataKey="usage" stroke={colors.deepPurple[200]} />
                            <CartesianGrid stroke="rgba(0, 0, 0, 0.06)" strokeDasharray="5 5" />
                            <Tooltip />
                        </LineChart>
                    </div>
                    <div className={classes.right}>
                        <div className={`${classes.smallChart} box-shadow`}>
                            <Typography variant="h6" className={classes.headerText}>Top selling locations | Monthly</Typography>
                            <BarChart data={topSellingLocations} width={550} height={400}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="rate" fill="#00a0fc" stroke="#ccc" strokeWidth={1}>
                                    {
                                        topSellingUsers.map((item, index) => (
                                            <Cell key={`cell-${index}`} fill={barColorsLocations[index % 21]} />
                                        ))
                                    }
                                </Bar>
                                <XAxis dataKey="location" />
                                <Tooltip />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: theme.spacing(2), display: "flex"}}>
                <div className={`${classes.smallChart} box-shadow`}>
                    <Typography variant="h6" className={classes.headerText}>Top selling Users | Monthly</Typography>
                    <BarChart data={topSellingUsers} width={550} height={400}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="rate" fill="#00a0fc" stroke="#ccc" strokeWidth={1}>
                            {
                                topSellingUsers.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={barColorsUsers[index]} />
                                ))
                            }
                        </Bar>

                        <XAxis dataKey="name" />
                        <Tooltip />
                    </BarChart>
                </div>
                <div className={`${classes.smallChart} box-shadow`}>
                    <Typography variant="h6" className={classes.headerText}>Top selling Users | Monthly</Typography>
                    <BarChart data={topSellingProducts} width={550} height={400}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="rate" fill="#00a0fc" stroke="#ccc" strokeWidth={1}>
                            {
                                topSellingProducts.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={barColorsProducts[index]} />
                                ))
                            }
                        </Bar>

                        <XAxis dataKey="product" />
                        <Tooltip />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default Analytics;