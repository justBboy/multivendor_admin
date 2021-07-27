import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { Carousel } from 'react-responsive-carousel';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useState } from 'react';
import { CustomModal } from '../components';
import { RMIUploader } from "react-multiple-image-uploader";
import { EditorState } from "draft-js";
import CloseIcon from '@material-ui/icons/Close';



interface AppManagementProps {

}

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    swiperContainer: {
        flex: 1,
        width: 500,
        height: 500,
        alignSelf: "center",
        "& .carousel-slider, & .slider": {
            height: "100%"
        }
    },
    faqContainer: {
        flex: 0.5,
        width: "100%",
        backgroundColor: "#fff",
        paddingLeft: 20
    },
    howContainer: {
        flex: 0.5,
        background: "#fff",
        "& .rdw-editor-main": {
            height: "400px !important"
        }
    },
    flex: {
        display: "flex",
    },
    sliderModalContainer: {
        width: "50vw",
        height: "50vh",
        overflowY: "scroll",
        background: "#fff",
        borderRadius: 5,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    faqForm: {
        width: "300px",
        height: "325px",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#fff",
        position: "relative"
    }
}))

const images = [
    {
        id: 1,
        dataURL: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg",
    },
    {
        id: 2,
        dataURL: "https://s.alicdn.com/@img/imgextra/i4/O1CN01a7eREi1Ug74iqFDCq_!!6000000002546-2-tps-990-400.png",
    },
    {
        id: 3,
        dataURL: "https://img.alicdn.com/imgextra/i4/O1CN01y7S22X1mJosJiYZI7_!!6000000004934-0-tps-990-400.jpg"
    }
]

const AppManagement: React.FC<AppManagementProps> = ({ }) => {
    const classes = useStyle();
    const [swiperModalOpen, setSwiperModalOpen] = useState(false);
    const [faqModalOpen, setFaqModalOpen] = useState(false);
    const [howText, setHowText] = useState(EditorState.createEmpty());

    const onUpload = (data: any) => {
        console.log("Upload files", data);
    };
    const onSelect = (data: any) => {
        console.log("Select files", data);
    };
    const onRemove = (id: any) => {
        console.log("Remove image id", id);
    };
    return (
        <div className={classes.container}>
            <CustomModal open={swiperModalOpen} setOpen={setSwiperModalOpen}>
                <div className={classes.sliderModalContainer}>
                    <RMIUploader
                        dataSources={images}
                        onRemove={onRemove}
                        onSelect={onSelect}
                        onUpload={onUpload}
                        warnMessage="There was a problem try again"
                    />
                </div>
            </CustomModal>
            <div style={{ display: "flex", width: "100%", position: "relative" }}>
                <Button variant="contained" onClick={() => { setSwiperModalOpen(true) }} style={{ background: "#fff" }}>Change Slide Items</Button>
                <Carousel autoPlay stopOnHover infiniteLoop centerSlidePercentage={100} centerMode={true} className={classes.swiperContainer}>
                    {
                        images.map(item => (
                            <div>
                                <img src={item.dataURL} />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            <div className={classes.flex} style={{
                padding: 10,
                marginTop: 80,
                height: "500px",
                backgroundColor: "#fff",
                overflowY: "scroll"
            }}>
                <div className={classes.howContainer}>
                    <Typography variant="body1" style={{ color: "#999", marginBottom: 15 }}>How It Works</Typography>
                    <Editor
                        editorState={howText}
                        onEditorStateChange={setHowText}
                    />
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: 10 }}>
                        <Button variant="outlined" style={{ marginLeft: "auto", marginBottom: 10 }} onClick={() => { console.log(howText.values) }}>Update</Button>
                    </div>
                </div>
                <div className={classes.faqContainer}>
                    <CustomModal open={faqModalOpen} disableClickAway setOpen={setFaqModalOpen}>
                        <div className={classes.faqForm}>
                            <IconButton style={{
                                position: "absolute",
                                zIndex: 99,
                                top: 0,
                                right: 0
                            }} onClick={() => {setFaqModalOpen(false)}}>
                               <CloseIcon /> 
                            </IconButton>
                            <TextField variant="outlined" placeholder="Question" style={{width: "100%", marginTop: 30, marginBottom: 4}} />
                            <TextField variant="outlined" placeholder="Answer" style={{width: "100%"}} inputProps={{
                                style: {
                                    height: 150 
                                }
                            }} multiline />
                            <Button variant="outlined" style={{marginLeft: "auto", marginTop: 5}}>Add</Button>
                        </div>
                    </CustomModal>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography variant="body1" style={{ color: "#999" }}>FAQ's</Typography>
                        <Button onClick={() => {setFaqModalOpen(true)}} variant="outlined">
                            <AddIcon style={{ fontSize: 16 }} />
                            Add
                        </Button>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppManagement;