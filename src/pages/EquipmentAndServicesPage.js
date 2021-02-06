/*eslint-disable*/
import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/../MaterialKitProReact/components/Header/Header.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
// @material-ui/core ../MaterialKitProReact/components
import { makeStyles } from "@material-ui/core/styles";

import styles from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/ecommerceStyle.js";
import TripleCardShow from "../components/TripleCardShow";
import EquipmentData from "../data/EquipmentData";
import {API, graphqlOperation} from "aws-amplify";
import {listServices} from "../graphql/queries";
import ServiceCard from "../components/ServiceCard";
import Button from "../MaterialKitProReact/components/CustomButtons/Button";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function EquipmentAndServicesPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const history = useHistory();
    const classes = useStyles();
    const [equipmentServices, setEquipmentServices] = useState([]);

    const getInHouseServices = async () => {
        const data = await API.graphql(graphqlOperation(listServices, {
            filter: {
                type: {
                    contains: 'equipment services'
                }
            }
        }));
        setEquipmentServices(data.data.listServices.items)
    }

    useEffect(() => {
        getInHouseServices();
    }, [])


    const renderEquipment = () => {
        if(equipmentServices.length > 0) {
            return equipmentServices.map((event) => {
                if(event.type === "equipment services") {
                    return <ServiceCard data={event} key={event.id} />
                }
            })
        }
    }

    return (
        <div>
            <Header
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 300,
                    color: "info"
                }}
            />
            <Parallax
                image={require("../MaterialKitProReact/assets/img/bg43.jpg")}
                filter="dark"
                small
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem
                            md={8}
                            sm={8}
                            className={classNames(
                                classes.mlAuto,
                                classes.mrAuto,
                                classes.textCenter
                            )}
                        >
                            <div className={classes.brand}>
                                <h1 className={classes.title}>Equipment & Services!</h1>
                                <h4>
                                    Check out the local equipment for rent and local services we have in our community this week!
                                </h4>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 10}}>
                    <h2 style={{color: "black", paddingTop: 30, textAlign: "center"}}>Rent Equipment & Services</h2>
                    <Button style={{height: '50%'}} round color="info" size="lg" onClick={() => history.push(`/create-event`)}>
                        Create a Equipment or Services Event!
                    </Button>
                </div>
                {renderEquipment()}
            </div>
        </div>
    );
}
