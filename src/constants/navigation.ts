import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import * as ROUTES from "./routes";
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import TimelineIcon from '@material-ui/icons/TimelineOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import AppsIcon from '@material-ui/icons/AppsOutlined';

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
        name: "App Mng.",
        route: ROUTES.APP_MANAGEMENT,
        icon: AppsIcon
    },
    {
        name: "Admins",
        route: ROUTES.ADMINS,
        icon: PeopleIcon
    },
    {
        name: "Categories",
        route: ROUTES.PRODUCTS,
        icon: MonetizationOnIcon
    },
    {
        name: "Feedback",
        route: ROUTES.FEEDBACKS,
        icon: CommentIcon
    }
]

export default navigation;