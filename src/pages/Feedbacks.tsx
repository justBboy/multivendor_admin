import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Feed } from '../components';

interface FeedbacksProps{
    
}

const useStyle = makeStyles(theme => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3)
    }
}))

const Feedbacks:React.FC<FeedbacksProps> = ({}) => {
    const styles = useStyle();
    return (
         <div className={styles.container}>
             <Feed />
             <Feed />
             <Feed />
             <Feed />
             <Feed />
             <Feed />
             <Feed />
             <Feed />
         </div>
    )
}

export default Feedbacks;