/*eslint-disable*/
import React, {useState} from "react";
// @material-ui/core ../MaterialKitProReact/components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/components/Header/Header.js";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Button from "../MaterialKitProReact/components/CustomButtons/Button.js";
import Card from "../MaterialKitProReact/components/Card/Card.js";
import CardBody from "../MaterialKitProReact/components/Card/CardBody.js";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader.js";
import CustomInput from "../MaterialKitProReact/components/CustomInput/CustomInput.js";

import loginPageStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import {useHistory} from 'react-router-dom';

import image from "../MaterialKitProReact/assets/img/bg43.jpg";
import {Auth} from 'aws-amplify';
import { logout} from "../Redux/actions/authActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(loginPageStyle);


export default function Logout() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const logOut = async(e) => {
        e.preventDefault();
        try {
            await Auth.signOut().then(data => console.log(data));
            dispatch(logout());
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info"/>}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <form className={classes.form}>
                                    <CardHeader
                                        color="danger"
                                        signup
                                        className={classes.cardHeader}
                                    >
                                        <h4 className={classes.cardTitle}>Logout</h4>
                                    </CardHeader>
                                    <div className={classes.textCenter}>
                                        <Button simple color="danger" size="lg" onClick={logOut}>
                                            CLICK HERE TO LOG OUT
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}