/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      position
      services {
        items {
          id
          name
          description
          type
          date
          imageUri
          cost
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        position
        services {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      name
      description
      type
      date
      imageUri
      cost
      userId
      user {
        id
        name
        position
        services {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        type
        date
        imageUri
        cost
        userId
        user {
          id
          name
          position
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
