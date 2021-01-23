/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
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
