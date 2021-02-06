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
          quantity
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
      bookedServices {
        items {
          id
          userId
          serviceId
          date
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
        bookedServices {
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
      quantity
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
        bookedServices {
          nextToken
        }
        createdAt
        updatedAt
      }
      bookedUsers {
        items {
          id
          userId
          serviceId
          date
          createdAt
          updatedAt
          bookedUser {
            name
          }
        }
        nextToken
      }
      file {
        bucket
        region
        key
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
        quantity
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
        bookedUsers {
          nextToken
        }
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBooked = /* GraphQL */ `
  query GetBooked($id: ID!) {
    getBooked(id: $id) {
      id
      userId
      bookedUser {
        id
        name
        position
        services {
          nextToken
        }
        bookedServices {
          nextToken
        }
        createdAt
        updatedAt
      }
      serviceId
      service {
        id
        name
        description
        quantity
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
        bookedUsers {
          nextToken
        }
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      date
      createdAt
      updatedAt
    }
  }
`;
export const listBookeds = /* GraphQL */ `
  query ListBookeds(
    $filter: ModelBookedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        bookedUser {
          id
          name
          position
          createdAt
          updatedAt
        }
        serviceId
        service {
          id
          name
          description
          quantity
          type
          date
          imageUri
          cost
          userId
          createdAt
          updatedAt
        }
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
