import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import * as ROUTES from "./routes";
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import TimelineIcon from '@material-ui/icons/TimelineOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ReportIcon from '@material-ui/icons/ReportOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

export type navigationType = {
    name: string;
    route: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export const navigation = [
    {
        name: "Analytics",
        route: ROUTES.ANALYTICS,
        icon: TimelineIcon
    },
    {
        name: "Vendors",
        route: ROUTES.VENDORS,
        icon: BusinessIcon
    },
    {
        name: "Admins",
        route: ROUTES.ADMINS,
        icon: PeopleIcon
    },
    {
        name: "Products",
        route: ROUTES.PRODUCTS,
        icon: MonetizationOnIcon
    },
    {
        name: "Mail",
        route: ROUTES.MAIL,
        icon: MailOutlineIcon
    },
    {
        name: "Feedback",
        route: ROUTES.FEEDBACKS,
        icon: CommentIcon
    },
    {
        name: "Report",
        route: ROUTES.REPORTS,
        icon: ReportIcon
    }
]

export default navigation;