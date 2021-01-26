# Best-Community-Service
*By Carlo Pelosi - [Visit Best-Community-Service](https://dev.d225qaiq3wjuiq.amplifyapp.com/)*

**Browse Community Service Events**

**Table of Contents**
* [Best-Community-Service Overview](#Best-Community-Service-overview)
* [Demonstrations](#demonstrations)
* [App Description](#app-description)
* [Technologies](#technologies)


# Browse Community Service overview
The application is built off a handmade API backend using GraphQL, AWS AppSync, and AWS Amplify, while the front end is maintained by React with Redux. 

# Demonstrations


## Landing Page: 
<img width="600" src="https://i.gyazo.com/a15ec6bcd23fcf1691a461092e12ceca.jpg">

## Log In:
<img width="600" src="https://i.gyazo.com/54c47e64d067f66ae6a259bafda47236.jpg">

# App Description
-   Full stack application utilizing state management and a handmade custom GraphQL backend.  

# Define Database Functionality + Input Data
1.  Redux persist stores User ID from graphql to check if logged in.
2.  GraphQL querying done when changing pages to check new events.

# Tools
-   VS Code
-   Google Chrome Redux Dev tools
-   GitHub
-   handemade GraphQL

# Technologies
-   Frontend UI engine: React / Redux
-   Backend server: AWS Amplify/AppSync
-   RDBMS/ORM: GraphQL DynamoDB 
 

# Database Structure

## Tables

type User @model {
  id: ID!
  name: String!
  position: String!
  services: [Service] @connection(keyName: "byUser", fields: ["id"])
  bookedServices: [Booked] @connection(keyName: "byUser", fields: ["id"])
}

type Service @model @key(name: "byUser", fields:["userId"]) {
  id: ID!
  name: String!
  description: String!
  quantity: String!
  type: String!
  date: String!
  imageUri: String!
  cost: String!
  userId: ID!
  user: User @connection(fields: ["userId"])
  bookedUsers: [Booked] @connection(keyName: "byService", fields: ["id"])
}

type Booked @model @key(name: "byUser", fields:["userId"]) @key(name:"byService", fields:["serviceId"]) {
  id: ID!
  userId: ID!
  bookedUser: User @connection(fields: ["userId"])
  serviceId: ID!
  service: Service @connection(fields:["serviceId"])
  date: String!
}

## Features / MVP

