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
import {getService, listUsers} from "../graphql/queries";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Close} from "@material-ui/icons";
import Transition from "react-transition-group/Transition";
import style from "../MaterialKitProReact/assets/jss/material-kit-pro-react/modalStyle.js";
import {createBooked, createService, updateUser} from "../graphql/mutations";
import {useDispatch, useSelector} from "react-redux";
import awsExports from '../aws-exports';
import CustomInput from "../MaterialKitProReact/components/CustomInput/CustomInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";
import {login} from "../Redux/actions/authActions";
import {listUsersDonations} from "../queries/CustomQueries";

// images

const useStyles = makeStyles(productStyle);
const useModalStyles = makeStyles(style);

export default function DonationsPage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [donationAmount, setDonationAmount] = React.useState('');
    const [showModal, setShowModal] = React.useState(false)
    const [showThankYou, setShowThankYou] = React.useState(false)
    const [donatedUsers, setDonatedUsers] = React.useState([])
    const classes = useStyles();
    const modalClasses = useModalStyles();
    const userId = useSelector((state) => state.auth.id);
    const currentDonate = useSelector((state) => state.auth.donationAmount);

    const handleCreateEvent = async () => {
        let amount;
        if (currentDonate === null) {
            amount = parseInt(donationAmount)
        } else {
            amount = parseInt(donationAmount) + parseInt(currentDonate)
        }
        try {
            await API.graphql(graphqlOperation(updateUser,{
                input: {
                    id: userId,
                    donationAmount: parseInt(amount)
                }
            })).then(data => {
                console.log(data)
                const graphQLUser = data.data.updateUser;
                dispatch(login(graphQLUser.id, graphQLUser.email, graphQLUser.name, graphQLUser.position, graphQLUser.services, graphQLUser.donationAmount));
                setShowThankYou(true)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        try {
            const getUsersDonations = async () => {
                await API.graphql(graphqlOperation(listUsersDonations)).then(data => {
                    console.log(data.data.listUsers)

                })
            }
            getUsersDonations();
        } catch (err) {
            console.log(err)
        }
    }, [])

    const renderPage = () => {

        return (
            <GridContainer>
                <GridItem md={6} sm={6}>
                    <Card product plain>
                        <CardHeader image plain>
                            <h2 className={classes.title}>Donations </h2>
                            <img src={"https://nathanallotey.com/wp-content/uploads/2018/01/ecommerce-donation-na.jpg"} alt="..."/>
                            <div
                                className={classes.coloredShadow}
                                style={{backgroundImage: `url(https://nathanallotey.com/wp-content/uploads/2018/01/ecommerce-donation-na.jpg)`, opacity: 1}}
                            />
                        </CardHeader>
                    </Card>
                </GridItem>
                { showThankYou
                    ?
                    <GridItem md={6} sm={6}>
                        <Card product plain>
                            <CardHeader image plain>
                                <h2 className={classes.title}>We have received your donation!</h2>
                                <h2 className={classes.title}>${donationAmount}!</h2>
                                <h2 className={classes.title}>Very generous of you!</h2>
                            </CardHeader>
                        </Card>
                    </GridItem>
                    :
                    <GridItem md={6} sm={6}>
                        <div>Thank you so much for your donation! We really appreciate it!</div>
                        <h2 className={classes.title}>Enter in your donation amount: </h2>
                        <h3 className={classes.title}>Amount: </h3>
                        <CustomInput
                            labelText="Amount"
                            id="amount"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{onChange: (e)=> setDonationAmount(e.target.value)}}
                        />
                        <GridContainer className={classes.pullRight}>
                            <div>
                                <Button color="info" onClick={() => setShowModal(true)}>
                                    Donate now
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
                                        <h2 className={modalClasses.modalTitle}>We really appreciate it!</h2>
                                    </DialogTitle>
                                    <DialogContent
                                        id="classic-modal-slide-description"
                                        className={modalClasses.modalBody}
                                    >
                                        <div>
                                            <h3>Thank you so much for your donation!</h3>
                                            <h4 className={classes.title}>Donation Amount: ${donationAmount}</h4>
                                        </div>
                                    </DialogContent>
                                    <DialogActions className={modalClasses.modalFooter}>
                                        <Button onClick={() => setShowModal(false)} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleCreateEvent()} color="info">Donate!</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </GridContainer>
                    </GridItem>
                }
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
