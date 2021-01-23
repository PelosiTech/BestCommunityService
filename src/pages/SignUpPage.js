/*eslint-disable*/
import React, {useState} from "react";
// @material-ui/core ../MaterialKitProReact/components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/components/Header/Header.js";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Button from "../MaterialKitProReact/components/CustomButtons/Button.js";
import Card from "../MaterialKitProReact/components/Card/Card.js";
import CardBody from "../MaterialKitProReact/components/Card/CardBody.js";
import InfoArea from "../MaterialKitProReact/components/InfoArea/InfoArea.js";
import CustomInput from "../MaterialKitProReact/components/CustomInput/CustomInput.js";

import signupPageStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/signupPageStyle.js";
import {useHistory} from 'react-router-dom';

import image from "../MaterialKitProReact/assets/img/bg43.jpg";
import {Auth} from "aws-amplify";

const useStyles = makeStyles(signupPageStyle);

export default function SignUpPage({ ...rest }) {
    const history = useHistory();
    const [checked, setChecked] = React.useState([1]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info" />}
                {...rest}
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
                        <GridItem xs={12} sm={10} md={10}>
                            <Card className={classes.cardSignup}>
                                <h2 className={classes.cardTitle}>Register</h2>
                                <CardBody>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={5} md={5}>
                                            <InfoArea
                                                className={classes.infoArea}
                                                title="Social Events!"
                                                description="We've created best social events in the community get ready to come participate!"
                                                icon={Timeline}
                                                iconColor="rose"
                                            />
                                            <InfoArea
                                                className={classes.infoArea}
                                                title="Rent Our Space!"
                                                description="We have tons of floors available for our community to rent out! Use this for your next rehersal dinner!"
                                                icon={Code}
                                                iconColor="primary"
                                            />
                                            <InfoArea
                                                className={classes.infoArea}
                                                title="Services!"
                                                description="We have multiple in house and external services we offer for our community!"
                                                icon={Group}
                                                iconColor="info"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={5} md={5}>
                                            <form className={classes.form}>
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
                                                <FormControlLabel
                                                    classes={{
                                                        label: classes.label
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            tabIndex={-1}
                                                            onClick={() => handleToggle(1)}
                                                            checkedIcon={
                                                                <Check className={classes.checkedIcon} />
                                                            }
                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                            classes={{
                                                                checked: classes.checked,
                                                                root: classes.checkRoot
                                                            }}
                                                            checked={checked.indexOf(1) !== -1 ? true : false}
                                                        />
                                                    }
                                                    label={
                                                        <span>
                                                            I agree to the{" "}terms and conditions.
                                                        </span>
                                                    }
                                                />
                                                <div className={classes.textCenter} onClick={handleSignup}>
                                                    <Button round color="primary">
                                                        Get started
                                                    </Button>
                                                </div>
                                            </form>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
