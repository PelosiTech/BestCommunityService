/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      position
      donationAmount
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      position
      donationAmount
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      position
      donationAmount
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
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
        donationAmount
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
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
        donationAmount
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
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
        donationAmount
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
export const onCreateBooked = /* GraphQL */ `
  subscription OnCreateBooked {
    onCreateBooked {
      id
      userId
      bookedUser {
        id
        name
        position
        donationAmount
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
          donationAmount
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
export const onUpdateBooked = /* GraphQL */ `
  subscription OnUpdateBooked {
    onUpdateBooked {
      id
      userId
      bookedUser {
        id
        name
        position
        donationAmount
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
          donationAmount
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
export const onDeleteBooked = /* GraphQL */ `
  subscription OnDeleteBooked {
    onDeleteBooked {
      id
      userId
      bookedUser {
        id
        name
        position
        donationAmount
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
          donationAmount
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
