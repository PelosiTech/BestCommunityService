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

// images

const useStyles = makeStyles(productStyle);
const useModalStyles = makeStyles(style);

export default function CreateEventPage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const history = useHistory();
    const [data, setData] = React.useState({});
    const [bookedUsers, setBookedUsers] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const classes = useStyles();
    const modalClasses = useModalStyles();
    const id = props.location.pathname.slice(9);
    const userId = useSelector((state) => state.auth.id);
    const [file, setFile] = React.useState({});

    const renderBookedUsersList = () => {
        if(bookedUsers.length > 0) {
            return bookedUsers.map((user) => {
                return <div key={user.id}>{user.bookedUser.name}</div>
            })
        }
    }

    const handleCreateEvent = async () => {
        setShowModal(false);
        const info = await API.graphql(graphqlOperation(createBooked,{
            input: {
                userId: userId,
                serviceId: id,
                date: data.date
            }
        }))
        history.push(`/confirmation/${info.data.createBooked.id}`)
    }

    const addImageToDB = async (image) => {
        try {
            await API.graphql(graphqlOperation(createService,{
                input: {
                    userId: 'e772568c-caba-46bc-a6a8-2ad1a0670bf0',
                    type: 'social event',
                    quantity: '20',
                    name: 'React Study Group PART 2',
                    description: 'Are you ready to start diving into React? You can start learning how to build awesome looking websites like this one. Join our React study group today!',
                    date: '02062021',
                    cost: '5',
                    file: image
                }
            })).then(data => console.log(data))
        } catch (err) {
            console.log(err)
        }
    }

    const fileChange = (e) => {
        const image = e.target.files[0];
        Storage.put(image.name, image, {
            contentType: 'image/png'
        }).then((result) => {
            setFile({file: URL.createObjectURL(image)})
            console.log(result)
            const imageUpload = {
                name: image.name,
                file: {
                    bucket: awsExports.aws_user_files_s3_bucket,
                    region: awsExports.aws_user_files_s3_bucket_region,
                    key: 'public/' + image.name
                }
            }
            console.log(imageUpload)
            addImageToDB(imageUpload.file);
            console.log('added complete')
        }).catch(err => console.log(err))
    }

    const renderPage = () => {
        // if(data.name === undefined) {
        //     return (
        //         <>
        //             <div>
        //                 <p>Please select an image to upload</p>
        //                 <input type="file" onChange={(e) => fileChange(e)} />
        //             </div>
        //             <div>
        //                 <img src={file} />
        //             </div>
        //         </>
        //     )
        // }

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
                    <h2 className={classes.title}>Name: </h2>
                    <input />
                    <h3 className={classes.mainPrice}>Cost: </h3>
                    <input />
                    <Accordion
                        active={0}
                        activeColor="info"
                        collapses={[
                            {
                                title: "Description",
                                content: (
                                    <p>
                                       Description:
                                        <input />
                                    </p>

                                )
                            },
                            {
                                title: "Date and Availability",
                                content: (
                                    <>
                                        <div>Date: <input /></div>
                                        <div>Spots open: <input /></div>
                                        <div>Type: <input /></div>
                                    </>
                                )
                            },
                            {
                                title: "Details",
                                content: (
                                    <ul>
                                        <li>Created By: <input /></li>
                                        <li>
                                            Current Users who have this booked:
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
                                        <h4 className={classes.title}>Event name: <input /></h4>
                                        <h4 className={classes.mainPrice}>Event cost: $<input /></h4>
                                        <h4 className={classes.mainPrice}>Event Date: <input /></h4>
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
