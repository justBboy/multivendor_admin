import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import {useForm} from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/AuthSlice';
import { auth, db } from '../Firebase';

interface LoginProps{
    
}

const useStyle = makeStyles(theme => ({
    container: {
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        background: "#eee",
        position: "relative",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
        height: 250,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        padding: 10,
        background: "white"
    },
    top: {
        width: "55vw",
        height: "100%",
        position: "relative"
    },
    absolute: {
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        width: "45vw",
        height: "100%",
        background: "#e65100",
        clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)"
    },
    input: {
        padding: 5,
        width: "90%",
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        outline: "none",
        border: "1px solid #e65100",
    }
}))

const Login:React.FC<LoginProps> = ({}) => {
    const classes = useStyle();
    const { register, handleSubmit, formState: {errors} } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data: {email: string; password: string}) => {
        auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
            const userInfo = {
                id: res?.user?.uid,
                displayName: res?.user?.displayName,
                photoUrl: res?.user?.photoURL,
                phoneNumber: res?.user?.phoneNumber,
                email: res?.user?.email
            }
            dispatch(login(userInfo))
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
            <div className={classes.container}>
                <div className={classes.absolute}>
                    <div className={`${classes.content} box-shadow`}>
                        <Typography variant="h6" style={{
                            textAlign: "center",
                            color: "#999",
                            textTransform: "uppercase"
                        }}>Login</Typography>
                        {
                            errors.email &&
                            <Typography variant="body2" style={{
                                color: "red"
                            }}>Invalid email</Typography>
                        }
                        <input {...register("email", {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} placeholder="Email Address" type="email" className={classes.input} />
                        <input placeholder="Password" {...register("password", {required: true})} type="password" className={classes.input} />
                        <Button variant="contained" onClick={handleSubmit(onSubmit)} style={{
                            width: "90%",
                            marginTop: 10,
                            backgroundColor: "#e65100aa",
                            color: "#eee"
                        }}>Submit</Button>
                    </div>
                 </div>
             <div className={classes.top}>
                 

             </div>
             <div className={classes.bottom}>

             </div>
         </div>
    )
}

export default Login;