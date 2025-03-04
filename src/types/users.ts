export interface UserData {
    id: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface UsersFile {
    users: UserData[];
  }