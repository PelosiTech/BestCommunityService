/*eslint-disable*/
import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core ../MaterialKitProReact/components
import { makeStyles } from "@material-ui/core/styles";
// core ../MaterialKitProReact/components
import Header from "../MaterialKitProReact/components/Header/Header.js";
import HeaderLinks from "../MaterialKitProReact/components/Header/HeaderLinks.js";
import Parallax from "../MaterialKitProReact/components/Parallax/Parallax.js";
import GridContainer from "../MaterialKitProReact/components/Grid/GridContainer.js";
import GridItem from "../MaterialKitProReact/components/Grid/GridItem.js";
import Button from "../MaterialKitProReact/components/CustomButtons/Button.js";
import Accordion from "../MaterialKitProReact/components/Accordion/Accordion.js";

import productStyle from "../MaterialKitProReact/../MaterialKitProReact/assets/jss/material-kit-pro-react/views/productStyle.js";
import {API, graphqlOperation} from "aws-amplify";
import {getService} from "../graphql/queries";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";

// images

const useStyles = makeStyles(productStyle);

export default function ServicePage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const [data, setData] = React.useState({});
    const [bookedUsers, setBookedUsers] = React.useState([]);
    const classes = useStyles();
    const id = props.location.pathname.slice(9);

    const getSocialEvents = async () => {
        const data = await API.graphql(graphqlOperation(getService,{
            id: id,
        }));
        setData(data.data.getService)
        setBookedUsers(data.data.getService.bookedUsers.items)
    }

    useEffect(() => {
        getSocialEvents();
    }, [])

    const renderBookedUsersList = () => {
        if(bookedUsers.length > 0) {
            return bookedUsers.map((user) => {
                return <div key={user.id}>{user.bookedUser.name}</div>
            })
        }
    }

    const renderPage = () => {
        if(data.name === undefined) {
            return null;
        }

        return (
            <GridContainer>
                <GridItem md={6} sm={6}>
                    <Card product plain>
                        <CardHeader image plain>
                            <img src={data.imageUri} alt="..."/>
                            <div
                                className={classes.coloredShadow}
                                style={{backgroundImage: `url(${data.imageUri})`, opacity: 1}}
                            />
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem md={6} sm={6}>
                    <h2 className={classes.title}>{data.name}</h2>
                    <h3 className={classes.mainPrice}>${data.cost}</h3>
                    <Accordion
                        active={0}
                        activeColor="info"
                        collapses={[
                            {
                                title: "Description",
                                content: (
                                    <p>
                                        {data.description}
                                    </p>
                                )
                            },
                            {
                                title: "Date and Availability",
                                content: (
                                    <>
                                        <div>Date: {data.date}</div>
                                        <div>Spots open: {data.quantity}</div>
                                        <div>Type: {data.type}</div>
                                    </>
                                )
                            },
                            {
                                title: "Details",
                                content: (
                                    <ul>
                                        <li>Created By: {data.user.name}</li>
                                        <li>
                                            Current Users who have this booked:
                                            {renderBookedUsersList()}
                                        </li>
                                    </ul>
                                )
                            }
                        ]}
                    />
                    <GridContainer className={classes.pullRight}>
                        <Button round color="info">
                            Book Now
                        </Button>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        )
    }


    return (
        <div className={classes.productPage}>
            <Header
                brand="Best Community Service"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 100,
                    color: "info"
                }}
            />
            <Parallax
                image={require("../MaterialKitProReact/assets/img/bg43.jpg")}
                filter="dark"
                className={classes.pageHeader}
            />
            <div className={classNames(classes.section, classes.sectionGray)}>
                <div className={classes.container}>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    );
}
