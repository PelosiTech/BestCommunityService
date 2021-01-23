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
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {Devices} from "@material-ui/icons";
import {getUser} from "../graphql/queries";

const useStyles = makeStyles(loginPageStyle);


export default function LoginPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);

        Auth.signIn({
            username,
            password,
        }).then(async (user) => {
            console.log(user)
            const info = await API.graphql(graphqlOperation(getUser,{
                id: user.attributes.sub,
            }))
            console.log(info)
        }).then(() => {
            history.push('/')
        }).catch(err => console.log(err))
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
                                        color="info"
                                        signup
                                        className={classes.cardHeader}
                                    >
                                        <h4 className={classes.cardTitle}>Login</h4>
                                    </CardHeader>
                                    <CardBody signup>
                                        <CustomInput
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                placeholder: "Email...",
                                                onChange: (e) => setUsername(e.target.value),
                                                type: "email",
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                placeholder: "Password",
                                                type: "password",
                                                onChange: (e) => setPassword(e.target.value),
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_utline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <div className={classes.textCenter}>
                                        <Button simple color="info" size="lg" onClick={handleLogin}>
                                            Login
                                        </Button>
                                        <div style={{color: "darkred"}}>
                                            OR
                                        </div>
                                        <Button simple color="facebook" size="lg"
                                                onClick={() => history.push("/signup")}>
                                            Sign Up / Make An Account
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
