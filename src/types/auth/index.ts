export interface SignUpPayload {
    email: string;
    password: string;
    name: string;
  }
  export interface SignInPayload {
    employeeId: string;
    token: string;
  }
  export interface TokenObject {
    expires: string;
    token: string;
  }
  export interface Tokens<T> {
    access: T;
    refresh: T;
  }
  export interface StoredUser {
    email: string;
    id: string;
    isEmailVerified: boolean;
    name: string;
    onboard: boolean;
   
    role: string;
  }
  export interface UserRespone {
    user: StoredUser;
  }