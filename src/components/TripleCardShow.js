import React from 'react';
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import gucci from "../MaterialKitProReact/assets/img/examples/gucci.jpg";
import CardBody from "../MaterialKitProReact/components/Card/CardBody";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";

const useStyles = makeStyles(styles);

const TripleCardShow = ({data}) => {
    const classes = useStyles();
    if(!data) {
        return null
    }
    console.log(data)
    const firstCard = data[0];
    const secondCard = data[1];
    const thirdCard = data[2];
    return (
        <GridContainer>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#weddings">
                            <img src={firstCard.image} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${firstCard.image})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>{firstCard.title}</h4>
                        <p className={classes.cardDescription}>
                            {firstCard.description}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#communitymeetings">
                            <img src={secondCard.image} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${secondCard.image})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>{secondCard.title}</h4>
                        <p className={classes.cardDescription}>
                            {secondCard.description}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#gatherings">
                            <img src={thirdCard.image} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${thirdCard.image})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>{thirdCard.title}</h4>
                        <p className={classes.cardDescription}>
                            {thirdCard.description}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
};

export default TripleCardShow;