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

import productStyle from "../MaterialKitProReact/assets/jss/material-kit-pro-react/views/productStyle.js";
import {API, graphqlOperation} from "aws-amplify";
import {getBooked} from "../graphql/queries";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import style from "../MaterialKitProReact/assets/jss/material-kit-pro-react/modalStyle.js";
import {createBooked} from "../graphql/mutations";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

// images

const useStyles = makeStyles(productStyle);
const useModalStyles = makeStyles(style);

export default function ConfirmationPage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const [bookingUser, setBookingUser] = React.useState({});
    const [data, setData] = React.useState({});
    const [bookedUsers, setBookedUsers] = React.useState([]);
    const classes = useStyles();
    const id = props.location.pathname.slice(14);
    const userId = useSelector((state) => state.auth.id);
    const history = useHistory();

    const getSocialEvents = async () => {
        console.log(id)
        const data = await API.graphql(graphqlOperation(getBooked,{
            id: id,
        }));
        console.log(data)
        setBookingUser(data.data.getBooked.bookedUser)
        setData(data.data.getBooked.service)
        setBookedUsers(data.data.getBooked.service.bookedUsers.items)
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

    const handleBookNow = async () => {
        setShowModal(false);
        const info = await API.graphql(graphqlOperation(createBooked,{
            input: {
                userId: userId,
                serviceId: id,
                date: data.date
            }
        }))
        console.log(info)
        history.push(`confirmation:${info.data.id}`)
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
                    <h3 className={classes.title}> Congratulations {bookingUser.name}</h3>
                    <h3 className={classes.title}> You are all booked in for {data.name}</h3>
                    <h4 className={classes.title}> Your booking date is {data.date}</h4>
                    <h3 className={classes.title}> You confirmation code is {bookingUser.id}</h3>
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
