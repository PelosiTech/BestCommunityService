import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import teamsStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import cardProfile1Square from "../MaterialKitProReact/assets/img/faces/card-profile0-square.png";
import CardBody from "../MaterialKitProReact/components/Card/CardBody";
import Muted from "../MaterialKitProReact/components/Typography/Muted";
import CardFooter from "../MaterialKitProReact/components/Card/CardFooter";
import Button from "../MaterialKitProReact/components/CustomButtons/Button";

const useStyles = makeStyles(teamsStyle);

const TeamComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.team}>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={
                            classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
                        }
                    >
                        <h2 className={classes.title}>The Executive Team</h2>
                        <h5 className={classes.description}>
                            Without this person this entire operations would struggle to exist.
                            This is our clear leader.
                            We came up with the entire idea for our community and how to acheive greatness.
                        </h5>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card profile plain className={classes.card3}>
                            <GridContainer>
                                <GridItem xs={12} sm={5} md={5}>
                                    <CardHeader image plain>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img src={cardProfile1Square} alt="..."/>
                                        </a>
                                        <div
                                            className={classes.coloredShadow}
                                            style={{
                                                backgroundImage: `url(${cardProfile1Square})`,
                                                opacity: "1"
                                            }}
                                        />
                                    </CardHeader>
                                </GridItem>
                                <GridItem xs={12} sm={7} md={7}>
                                    <CardBody plain>
                                        <h4 className={classes.cardTitle}>Carlo Pelosi</h4>
                                        <Muted>
                                            <h6 className={classes.cardCategory}>FOUNDER | SOFTWARE ENGINEER</h6>
                                        </Muted>
                                        <p className={classes.description}>
                                            Don{"'"}t be scared of the truth because we need to
                                            restart the human foundation in truth...
                                        </p>
                                    </CardBody>
                                    <CardFooter profile plain>
                                        <Button justIcon simple color="twitter">
                                            <i className="fab fa-twitter"/>
                                        </Button>
                                        <Button justIcon simple color="facebook">
                                            <i className="fab fa-facebook-square"/>
                                        </Button>
                                        <Button justIcon simple color="google">
                                            <i className="fab fa-google"/>
                                        </Button>
                                    </CardFooter>
                                </GridItem>
                            </GridContainer>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
};

export default TeamComponent;