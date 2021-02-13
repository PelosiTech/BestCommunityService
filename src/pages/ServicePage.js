/*eslint-disable*/
import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core ../MaterialKitProReact/components
import {makeStyles} from "@material-ui/core/styles";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/components/Header/Header.js";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Button from "../MaterialKitProReact/components/CustomButtons/Button.js";
import Accordion from "../MaterialKitProReact/components/Accordion/Accordion.js";
import {useHistory} from 'react-router-dom';

import productStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/productStyle.js";
import {API, graphqlOperation} from "aws-amplify";
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
import {createBooked, deleteService, updateService} from "../graphql/mutations";
import {useSelector} from "react-redux";

// images

const useStyles = makeStyles(productStyle);
const useModalStyles = makeStyles(style);

export default function ServicePage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const history = useHistory();
    const [data, setData] = React.useState({});
    const [bookedUsers, setBookedUsers] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");
    const classes = useStyles();
    const modalClasses = useModalStyles();
    const id = props.location.pathname.slice(9);
    const userId = useSelector((state) => state.auth.id);

    const getSocialEvents = async () => {
        const data = await API.graphql(graphqlOperation(getService, {
            id: id,
        }));
        setData(data.data.getService)
        setBookedUsers(data.data.getService.bookedUsers.items)
        const keyUrl = data.data.getService.file.key.replaceAll(" ", "+");
        setImageUrl("https://" + data.data.getService.file.bucket + ".s3-" + data.data.getService.file.region + ".amazonaws.com/" + keyUrl)
    }

    useEffect(() => {
        getSocialEvents();
    }, [])

    const renderBookedUsersList = () => {
        if (bookedUsers.length > 0) {
            return bookedUsers.map((user) => {
                return <div key={user.id}>{user.bookedUser.name}</div>
            })
        }
    }

    const handleBookNow = async () => {
        setShowModal(false);
        const info = await API.graphql(graphqlOperation(createBooked, {
            input: {
                userId: userId,
                serviceId: id,
                date: data.date
            }
        }))
        history.push(`/confirmation/${info.data.createBooked.id}`)
    }

    const deleteEventService = async () => {
        setShowDeleteModal(false);
        try {
            const info = await API.graphql(graphqlOperation(deleteService, {
                input: {
                    id
                }
            }))
            console.log(info)
        } catch (err) {
            console.log(err)
        }
        history.push(`/`)
    }

    const editEventService = async () => {
        setShowEditModal(false);
        // try {
        //     const info = await API.graphql(graphqlOperation(updateService, {
        //         input: {
        //             id
        //         }
        //     }))
        //     console.log(info)
        // } catch (err) {
        //     console.log(err)
        // }
        history.push(`/`)
    }

    const renderDeleteButtonAndModal = () => {
        return (
            <>
                <Button color="danger" onClick={() => setShowDeleteModal(true)}>
                    DELETE SERVICE/EVENT
                </Button>
                <Dialog
                    classes={{
                        root: modalClasses.modalRoot,
                        paper: modalClasses.modal
                    }}
                    open={showDeleteModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setShowDeleteModal(false)}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                >
                    <DialogTitle
                        id="delete-modal-slide-title"
                        disableTypography
                        className={modalClasses.modalHeader}
                    >
                        <Button
                            simple
                            className={modalClasses.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            {" "}
                            <Close className={modalClasses.modalClose}/>
                        </Button>
                        <h2 className={modalClasses.modalTitle}>Delete Service/Event</h2>
                    </DialogTitle>
                    <DialogContent
                        id="delete-modal-slide-description"
                        className={modalClasses.modalBody}
                    >
                        <div>
                            <h4 className={classes.title}>Event name: {data.name}</h4>
                        </div>
                    </DialogContent>
                    <DialogActions className={modalClasses.modalFooter}>
                        <Button onClick={() => setShowDeleteModal(false)} color="secondary">
                            Close
                        </Button>
                        <Button onClick={() => deleteEventService()} color="danger">Delete NOW</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const renderEditButtonAndModal = () => {
        return (
            <>
                <Button color="facebook" onClick={() => setShowEditModal(true)}>
                    EDIT SERVICE/EVENT
                </Button>
                <Dialog
                    classes={{
                        root: modalClasses.modalRoot,
                        paper: modalClasses.modal
                    }}
                    open={showEditModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setShowEditModal(false)}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                >
                    <DialogTitle
                        id="edit-modal-slide-title"
                        disableTypography
                        className={modalClasses.modalHeader}
                    >
                        <Button
                            simple
                            className={modalClasses.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            onClick={() => setShowEditModal(false)}
                        >
                            {" "}
                            <Close className={modalClasses.modalClose}/>
                        </Button>
                        <h2 className={modalClasses.modalTitle}>Edit Service/Event</h2>
                    </DialogTitle>
                    <DialogContent
                        id="edit-modal-slide-description"
                        className={modalClasses.modalBody}
                    >
                        <div>
                            <h4 className={classes.title}>Event name: {data.name}</h4>
                        </div>
                    </DialogContent>
                    <DialogActions className={modalClasses.modalFooter}>
                        <Button onClick={() => setShowEditModal(false)} color="secondary">
                            Close
                        </Button>
                        <Button onClick={() => editEventService()} color="facebook">Edit NOW</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const renderPage = () => {
        if (data.name === undefined) {
            return null;
        }

        return (
            <GridContainer>
                <GridItem md={6} sm={6}>
                    <Card product plain>
                        <CardHeader image plain>
                            <img src={imageUrl} alt="..."/>
                            <div
                                className={classes.coloredShadow}
                                style={{backgroundImage: `url(${imageUrl})`, opacity: 1}}
                            />
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem md={6} sm={6}>
                    <h2 className={classes.title}>{data.name}</h2>
                    <h3 className={classes.mainPrice}>${data.cost}</h3>
                    <Accordion
                        active={0}
                        activeColor="info"
                        collapses={[
                            {
                                title: "Description",
                                content: (
                                    <p>
                                        {data.description}
                                    </p>
                                )
                            },
                            {
                                title: "Date and Availability",
                                content: (
                                    <>
                                        <div>Date: {data.date}</div>
                                        <div>Spots open: {data.quantity}</div>
                                        <div>Type: {data.type}</div>
                                    </>
                                )
                            },
                            {
                                title: "Details",
                                content: (
                                    <ul>
                                        <li>Created By: {data.user.name}</li>
                                        <li>
                                            Current Users who have this booked:
                                            {renderBookedUsersList()}
                                        </li>
                                    </ul>
                                )
                            }
                        ]}
                    />
                    <GridContainer className={classes.pullRight}>
                        <div>
                            <Button color="info" onClick={() => setShowModal(true)}>
                                Book Now
                            </Button>
                            {data.userId === userId
                                ?
                                <>
                                    {renderEditButtonAndModal()}
                                    {renderDeleteButtonAndModal()}
                                </>
                                : null}
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
                                        <Close className={modalClasses.modalClose}/>
                                    </Button>
                                    <h2 className={modalClasses.modalTitle}>Event Details</h2>
                                </DialogTitle>
                                <DialogContent
                                    id="classic-modal-slide-description"
                                    className={modalClasses.modalBody}
                                >
                                    <div>
                                        <h4 className={classes.title}>Event name: {data.name}</h4>
                                        <h4 className={classes.mainPrice}>Event cost: ${data.cost}</h4>
                                        <h4 className={classes.mainPrice}>Event Date: {data.date}</h4>
                                    </div>
                                </DialogContent>
                                <DialogActions className={modalClasses.modalFooter}>
                                    <Button onClick={() => setShowModal(false)} color="secondary">
                                        Close
                                    </Button>
                                    <Button onClick={() => handleBookNow()} color="info">Book NOW</Button>
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
                links={<HeaderLinks dropdownHoverColor="info"/>}
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
