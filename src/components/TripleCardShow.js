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

const TripleCardShow = () => {
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#pablo">
                            <img src={gucci} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${gucci})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>Gucci</h4>
                        <p className={classes.cardDescription}>
                            The structured shoulders and sleek detailing ensure a sharp
                            silhouette. Team it with a silk pocket square and leather
                            loafers.
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#pablo">
                            <img src={gucci} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${gucci})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>Gucci</h4>
                        <p className={classes.cardDescription}>
                            The structured shoulders and sleek detailing ensure a sharp
                            silhouette. Team it with a silk pocket square and leather
                            loafers.
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <a href="#pablo">
                            <img src={gucci} alt="..."/>
                        </a>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${gucci})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>Gucci</h4>
                        <p className={classes.cardDescription}>
                            The structured shoulders and sleek detailing ensure a sharp
                            silhouette. Team it with a silk pocket square and leather
                            loafers.
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
};

export default TripleCardShow;