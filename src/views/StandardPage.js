import React from 'react';
import Header from "../MaterialKitProReact/components/Header/Header";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "../MaterialKitProReact/components/CustomButtons/Button";
import landingPageStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/landingPageStyle";

const useStyles = makeStyles(landingPageStyle);

const StandardPage = ({ ...rest }) => {
    const classes = useStyles();

    return (
        <>
            <Header
                color="transparent"
                brand="Material Kit PRO React"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                changeColorOnScroll={{
                    height: 300,
                    color: "info"
                }}
                {...rest}
            />
            <Parallax image={require("MaterialKitProReact/assets/img/bg8.jpg")} filter="dark">
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                            <h1 className={classes.title}>Your Story Starts With Us.</h1>
                            <h4>
                                Every landing page needs a small description after the big bold
                                title, that{"'"}s why we added this text here. Add here all the
                                information that can make you or your product create the first
                                impression.
                            </h4>
                            <br />
                            <Button
                                color="danger"
                                size="lg"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                                target="_blank"
                            >
                                <i className="fas fa-play" />
                                Watch video
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                </div>
            </div>
        </>
    );
};

export default StandardPage;
