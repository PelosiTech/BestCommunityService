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
import { getService} from "../graphql/queries";
import Card from "../MaterialKitProReact/components/Card/Card";
import CardHeader from "../MaterialKitProReact/components/Card/CardHeader";
import {useSelector} from "react-redux";

// images

const useStyles = makeStyles(productStyle);

export default function ServiceConfirmationPage(props) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const [data, setData] = React.useState({});
    const [imageUrl, setImageUrl] = React.useState('');
    const classes = useStyles();
    const id = props.location.pathname.slice(22);
    const userId = useSelector((state) => state.auth.id);

    const getSocialEvents = async () => {
        console.log(id)
        const data = await API.graphql(graphqlOperation(getService,{
            id: id,
        }));
        setData(data.data.getService)
        const keyUrl = data.data.getService.file.key.replaceAll(" ", "+");
        setImageUrl("https://" + data.data.getService.file.bucket + ".s3-" + data.data.getService.file.region + ".amazonaws.com/" + keyUrl)
    }
    useEffect(() => {
        getSocialEvents();
    }, [])

    const renderPage = () => {
        if(data.name === undefined) {
            return null;
        }

        return (
            <GridContainer>
                <GridItem md={6} sm={6}>
                    <Card product plain>
                        <CardHeader image plain>
                            <img src={imageUrl} alt="..."/>
                            <div
                                className={classes.coloredShadow}
                                style={{backgroundImage: `url(${imageUrl})`, opacity: 1}}
                            />
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem md={6} sm={6}>
                    <h3 className={classes.title}> Congratulations {data.user.name}</h3>
                    <h3 className={classes.title}> You have created an Event called {data.name}</h3>
                    <h4 className={classes.title}> Your booking date is {data.date}</h4>
                    <h3 className={classes.title}> You confirmation code is {data.id}</h3>
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
