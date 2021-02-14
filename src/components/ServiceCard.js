import React, {useEffect} from 'react';
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import CardBody from "../MaterialKitProReact/components/Card/CardBody";
import {makeStyles} from "@material-ui/core/styles";
import styles
    from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem";
import Button from "../MaterialKitProReact/components/CustomButtons/Button";
import { useHistory } from "react-router-dom";
import {Storage} from "aws-amplify";

const useStyles = makeStyles(styles);

const ServiceCard = ({data}) => {
    const classes = useStyles();
    const history = useHistory()
    const firstCard = data;
    const url = 'service/' + firstCard.id;
    const [imageUrl, setImageUrl] = React.useState('')
    useEffect(() => {
        Storage.get(firstCard.file.key).then((data) => {
            setImageUrl(data)
        })
    }, [firstCard.file.key])

    if (!data) {
        return null
    }
    return (
            <GridItem md={4} sm={4}>
                <Card product plain>
                    <CardHeader image plain>
                        <img src={imageUrl} alt="..."  height={300} width={300} />
                        <div
                            className={classes.coloredShadow}
                            style={{backgroundImage: `url(${imageUrl})`, opacity: 1, height: 300, width: 300}}
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