/*eslint-disable*/
import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core ../MaterialKitProReact/components
import { makeStyles } from "@material-ui/core/styles";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/components/Header/Header.js";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Button from "../MaterialKitProReact/components/CustomButtons/Button.js";
import Accordion from "../MaterialKitProReact/components/Accordion/Accordion.js";
import {useHistory} from 'react-router-dom';
import Datetime from "react-datetime";

import productStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/productStyle.js";
import {Storage, API, graphqlOperation} from "aws-amplify";
import {getService} from "../graphql/queries";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Close} from "@material-ui/icons";
import Transition from "react-transition-group/Transition";
import style from "../MaterialKitProReact/assets/jss/material-kit-pro-react/modalStyle.js";
import {createBooked, createService} from "../graphql/mutations";
import {useSelector} from "react-redux";
import awsExports from '../aws-exports';
import CustomInput from "../MaterialKitProReact/components/CustomInput/CustomInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";

// images

const useStyles = makeStyles(productStyle);
const useModalStyles = makeStyles(style);

export default function CreateEventPage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }, []);
    const history = useHistory();
    const [type, setType] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [imageFile, setImageFile] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const classes = useStyles();
    const modalClasses = useModalStyles();
    const userId = useSelector((state) => state.auth.id);
    const [file, setFile] = React.useState({});
    const [nameError, setNameError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [typeError, setTypeError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);
    const [costError, setCostError] = React.useState(false);
    const [quantityError, setQuantityError] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const handleCreateEvent = async () => {
        setShowModal(false);
        console.log(name, description, date, cost, type, quantity, imageFile)
        try {
            await API.graphql(graphqlOperation(createService,{
                input: {
                    userId,
                    type,
                    quantity,
                    name,
                    description,
                    date,
                    cost,
                    file: imageFile
                }
            })).then(data => {
                console.log(data)
                history.push(`/service-confirmation/${data.data.createService.id}`)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const fileChange = (e) => {
        const image = e.target.files[0];
        Storage.put(image.name, image, {
            contentType: 'image/png',
            level: 'public'
        }).then((result) => {
            setFile({file: URL.createObjectURL(image)})
            console.log(result)
            const imageUpload = {
                name: image.name,
                file: {
                    bucket: awsExports.aws_user_files_s3_bucket,
                    region: awsExports.aws_user_files_s3_bucket_region,
                    key: image.name
                }
            }
            console.log(imageUpload)
            setImageFile(imageUpload.file);
            console.log('added complete')
        }).catch(err => console.log(err))
    }

    const checkRequiredThenShowModal = () => {
        if(name === "") {
            setNameError(true);
        } else {
            setNameError(false);
        }
        if (description === "") {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
        if (type === "") {
            setTypeError(true);
        } else {
            setTypeError(false);
        }
        if (cost === "") {
            setCostError(true);
        } else {
            setCostError(false);
        }
        if(quantity === "") {
            setQuantityError(true);
        } else {
            setQuantityError(false);
        }
        if (date === "") {
            setDateError(true);
        } else {
            setDateError(false);
        }
        if (imageFile.key === undefined) {
            setImageError(true);
        } else {
            setImageError(false);
        }

        if (name === "" || description === "" || type === "" || cost === "" || quantity === "" || date === "" || imageFile.key === undefined) {

        } else {
            setShowModal(true)
        }

    }

    const renderPage = () => {
        if(userId === "" || userId === undefined || userId === null) {
            return (
                <GridContainer>
                    <GridItem md={6} sm={6}>
                        <Card product plain>
                            <CardHeader image plain>
                                <h2 className={classes.title}>Create An Event or Service </h2>
                                <img src={"https://www.acenet.edu/PublishingImages/Interior-Page-Heroes/2018ACE-1045.JPG?RenditionID=10"} alt="..."/>
                                <div
                                    className={classes.coloredShadow}
                                    style={{backgroundImage: `url(https://www.acenet.edu/PublishingImages/Interior-Page-Heroes/2018ACE-1045.JPG?RenditionID=10)`, opacity: 1}}
                                />
                            </CardHeader>
                        </Card>
                    </GridItem>
                    <GridItem md={6} sm={6}>
                        <h2 className={classes.title}>Please login to create an event </h2>
                    </GridItem>
                </GridContainer>
            )
        }
        return (
            <GridContainer>
                <GridItem md={6} sm={6}>
                    <Card product plain>
                        <CardHeader image plain>
                            <h2 className={classes.title}>Create An Event or Service </h2>
                            <img src={"https://www.acenet.edu/PublishingImages/Interior-Page-Heroes/2018ACE-1045.JPG?RenditionID=10"} alt="..."/>
                            <div
                                className={classes.coloredShadow}
                                style={{backgroundImage: `url(https://www.acenet.edu/PublishingImages/Interior-Page-Heroes/2018ACE-1045.JPG?RenditionID=10)`, opacity: 1}}
                            />
                            <div>
                                <h3 className={classes.title}>Please select an image to upload for your event/service: </h3>
                                <input type="file" onChange={(e) => fileChange(e)} />
                                { imageError ? <h2 style={{color: 'red'}}>An Image is Required</h2> : null}
                            </div>
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem md={6} sm={6}>
                    <h2 className={classes.title}>Enter in event/service information: </h2>
                    <h3 className={classes.title}>Name of Event/Service: </h3>
                    <CustomInput
                        labelText="Name"
                        id="name"
                        error={nameError}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{onChange: (e)=> setName(e.target.value)}}
                    />
                    <h3 className={classes.title}>Description: </h3>
                    <CustomInput
                        labelText="Description"
                        id="description"
                        error={descriptionError}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{onChange: (e)=> setDescription(e.target.value)}}
                    />
                    <h3 className={classes.title}>Type of Event: </h3>
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            error={typeError}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Type Of Event
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="social event"
                            >
                                Social Events
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="equipment services"
                            >
                                Equipment & Services
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="in house service"
                            >
                                In House Services
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="external service"
                            >
                                External Services
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <h3 className={classes.title}>Date of Event: </h3>
                    <FormControl fullWidth>
                        <Datetime
                            timeFormat={false}
                            inputProps={{ placeholder: "Date of Event", onChange:(e) => e.target.value }}
                            onChange={(e)=> setDate(moment(e).format('MM-DD-YYYY'))}
                        />
                    </FormControl>
                    <h3 className={classes.title}>Cost: </h3>
                    <CustomInput
                        labelText="Cost"
                        id="cost"
                        error={costError}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{onChange: (e)=> setCost(e.target.value), type: 'number'}}
                    />
                    <h3 className={classes.title}>Quantity of People allowed to rent/book: </h3>
                    <CustomInput
                        labelText="Quantity"
                        id="quantity"
                        error={quantityError}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{onChange: (e) => setQuantity(e.target.value), type: 'number'}}
                    />
                    <GridContainer className={classes.pullRight}>
                        <div>
                            <Button color="info" onClick={() => checkRequiredThenShowModal()}>
                                Create Event
                            </Button>
                            <Dialog
                                classes={{
                                    root: modalClasses.modalRoot,
                                    paper: modalClasses.modal
                                }}
                                open={showModal}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => setShowModal(false)}
                                aria-labelledby="classic-modal-slide-title"
                                aria-describedby="classic-modal-slide-description"
                            >
                                <DialogTitle
                                    id="classic-modal-slide-title"
                                    disableTypography
                                    className={modalClasses.modalHeader}
                                >
                                    <Button
                                        simple
                                        className={modalClasses.modalCloseButton}
                                        key="close"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        {" "}
                                        <Close className={modalClasses.modalClose} />
                                    </Button>
                                    <h2 className={modalClasses.modalTitle}>Event Details</h2>
                                </DialogTitle>
                                <DialogContent
                                    id="classic-modal-slide-description"
                                    className={modalClasses.modalBody}
                                >
                                    <div>
                                        <h4 className={classes.title}>Event name: {name}</h4>
                                        <h4 className={classes.mainPrice}>Event cost: ${cost}</h4>
                                        <h4 className={classes.mainPrice}>Event Date: {date}</h4>
                                    </div>
                                </DialogContent>
                                <DialogActions className={modalClasses.modalFooter}>
                                    <Button onClick={() => setShowModal(false)} color="secondary">
                                        Close
                                    </Button>
                                    <Button onClick={() => handleCreateEvent()} color="info">Create Event</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        )
    }


    return (
        <div className={classes.productPage}>
            <Header
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 100,
                    color: "info"
                }}
            />
            <Parallax
                image={require("../MaterialKitProReact/assets/img/bg43.jpg")}
                filter="dark"
                className={classes.pageHeader}
            />
            <div className={classNames(classes.section, classes.sectionGray)}>
                <div className={classes.container}>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    );
}
