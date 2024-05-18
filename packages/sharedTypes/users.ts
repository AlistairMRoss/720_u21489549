export interface AuthDetails {
    userId: string,
    email: string,
    token: string,
    emailVerified?: boolean,
    group?: string,
  }
  export interface Attribute {
    Name: 'sub' | 'email_verified' | 'email';
    Value: string;
  }
  
  export interface User {
    Username: string;
    Attributes: Attribute[];
    UserCreateDate: string;
    UserLastModifiedDate: string;
    Enabled: boolean;
    UserStatus: 'CONFIRMED';
  }
  