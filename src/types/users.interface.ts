export interface IUser {
  name: string;
  email: string;
  role: string;
  branch: number;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  status?: number;
  role?: string;
  branch?: number;
  password?: string;
}