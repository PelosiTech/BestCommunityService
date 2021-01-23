/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
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
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
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
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
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
