import React from 'react';
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import CardBody from "../MaterialKitProReact/components/Card/CardBody";
import {makeStyles} from "@material-ui/core/styles";
import styles
    from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";
import Button from "../MaterialKitProReact/components/CustomButtons/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

const ServiceCard = ({data}) => {
    const classes = useStyles();
    const history = useHistory()
    if (!data) {
        return null
    }
    const firstCard = data;
    const url = firstCard.type.replace(/\s/g, '') + '/' + firstCard.id;
    return (
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <img src={firstCard.imageUri} alt="..."/>
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${firstCard.imageUri})`, opacity: 1}}
                        />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>{firstCard.name}</h4>
                        <p className={classes.cardDescription}>
                            {firstCard.description}
                        </p>
                        <p className={classes.cardDescription}>
                            Hosted by: <b>{firstCard.user.name}</b>
                        </p>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button round color="info" size="lg" onClick={() => history.push(`${url}`)}>
                                Check this out!
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
    );
};

export default ServiceCard;