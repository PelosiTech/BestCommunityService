import React from 'react';
import Header from "../MaterialKitProReact/components/Header/Header";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import landingPageStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/landingPageStyle";
import TeamComponent from "../components/TeamComponent";
import TripleCardShow from "../components/TripleCardShow";
import SocialEvents from "../data/Event";
import EquipmentData from "../data/EquipmentData";
import InHouseServices from "../data/InHouseServices";
import ExternalServices from "../data/ExternalServices";
import { useHistory } from 'react-router-dom';
import Button from "../MaterialKitProReact/components/CustomButtons/Button";

const useStyles = makeStyles(landingPageStyle);

const HomePage = ({ ...rest }) => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <>
            <Header
                color="transparent"
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                changeColorOnScroll={{
                    height: 300,
                    color: "info"
                }}
                {...rest}
            />
            <Parallax image={require("MaterialKitProReact/assets/img/bg43.jpg")} filter="dark">
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                            <h1 className={classes.title}>Helping our community one day at a time!</h1>
                            <h4>
                                Take a look around at some of the current events held at our building!
                                You can choose to attend an event, request a service, or even rent some space
                                in our building!
                            </h4>
                            <br />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <h2 style={{color: "black", paddingTop: 30, textAlign: "center"}} onClick={() => history.push("/social-events")}>Social Events</h2>
                    <TripleCardShow data={SocialEvents}/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button round color="info" size="lg" onClick={() => history.push("/social-events")}>
                            Go to Social Events Page!
                        </Button>
                    </div>
                    <h2 style={{color: "black", paddingTop: 30, textAlign: "center"}} onClick={() => history.push("/rent-equipment")}>Rent Equipment & Services</h2>
                    <TripleCardShow data={EquipmentData}/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button round color="info" size="lg" onClick={() => history.push("/rent-equipment")}>
                            Go to Rent Equipment & Services Page!
                        </Button>
                    </div>
                    <h2 style={{color: "black", paddingTop: 30, textAlign: "center"}} onClick={() => history.push("/in-house-services")}>In House Services</h2>
                    <TripleCardShow data={InHouseServices}/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button round color="info" size="lg" onClick={() => history.push("/in-house-services")}>
                            Go to In House Services Page!
                        </Button>
                    </div>
                    <h2 style={{color: "black", paddingTop: 30, textAlign: "center"}} onClick={() => history.push("/external-services")}>External Services</h2>
                    <TripleCardShow data={ExternalServices}/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button round color="info" size="lg" onClick={() => history.push("/external-services")}>
                            Go to External Services Page!
                        </Button>
                    </div>
                    <TeamComponent />
                </div>
            </div>
        </>
    );
};

export default HomePage;
