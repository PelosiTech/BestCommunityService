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
import InHouseServices from "../data/InHouseServices";
import {API, graphqlOperation} from "aws-amplify";
import {listServices} from "../graphql/queries";
import ServiceCard from "../components/ServiceCard";

const useStyles = makeStyles(styles);

export default function InHouseServicesPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    const [inHouseServices, setInHouseServices] = useState([]);

    const getInHouseServices = async () => {
        const data = await API.graphql(graphqlOperation(listServices));
        setInHouseServices(data.data.listServices.items)
    }

    useEffect(() => {
        getInHouseServices();
    }, [])


    const renderInHouseServices = () => {
        if(inHouseServices.length > 0) {
            return inHouseServices.map((event) => {
                if(event.type === "in house service") {
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
                                <h1 className={classes.title}>In House Services!</h1>
                                <h4>
                                    Check out the local in house services we have in our community this week!
                                </h4>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <h2 style={{color: "black", paddingTop: 30, textAlign: "center"} }>In House Services</h2>
                {renderInHouseServices()}
            </div>
        </div>
    );
}
