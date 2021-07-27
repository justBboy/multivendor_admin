import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React from 'react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

interface FeedProps {

}

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        width: "80%",
        padding: 10,
        borderRadius: 4
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    borderRight: {
        borderRight: "1px solid "
    }
}));

const Feed: React.FC<FeedProps> = ({ }) => {
    const classes = useStyle();
    const [openConfirm, setOpenConfirm] = useState(false);
    return (
        <div className={`${classes.container} box-shadow`}>
            <ConfirmModal open={openConfirm} setOpen={setOpenConfirm} onOk={() => {console.log("ok")}} onCancel={() => {setOpenConfirm(false)}} />
            <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                <div className={`${classes.flex}`}>
                        <Avatar />

                    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <Typography variant="body1" style={{marginLeft: 5}}>Asare Tutu Yaw</Typography>
                        <Typography variant="body2" style={{fontSize: 12, color: "#999"}}>3 days ago</Typography>
                    </div>
                </div>
                <div>
                    <Typography variant="body2" style={{marginLeft: 40, fontSize: 12, fontWeight: 300}}>
                        Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nam iste, laborum aut provident, voluptatum quos enim corporis inventore laudantium, id facere omnis repudiandae excepturi soluta? Quasi aperiam totam porro quas aut a dolor asperiores dolore distinctio delectus voluptatem temporibus ab perferendis cum consequuntur mollitia neque ullam, reprehenderit placeat. Natus?
                    </Typography>
                </div>
                <div style={{width: "100%", position: "absolute", bottom: -10, right: 0}}>
                    <IconButton onClick={() => {setOpenConfirm(true)}} style={{
                        float: "right",
                        width: 40,
                        height: 40,
                    }}>
                        <DeleteOutlineIcon style={{color: "#999"}} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Feed;