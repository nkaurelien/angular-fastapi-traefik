export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    roles?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  