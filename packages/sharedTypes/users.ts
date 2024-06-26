export interface AuthDetails {
  userId: string,
  email: string,
  token: string,
  emailVerified?: boolean
}
export interface Attribute {
  Name: 'sub' | 'email_verified' | 'email'
  Value: string
}

export interface User {
  Username: string
  Attributes: Attribute[]
  UserCreateDate: string
  UserLastModifiedDate: string
  Enabled: boolean
  UserStatus: 'CONFIRMED'
}

export interface Groups {
  GroupName: string
  UserPoolId: string
  LastModifiedDate: string
  CreationDate: string
}

export interface Profile {
  email: string
  name: string
  surname: string
  phone_number: string
  birthdate: Date
}  