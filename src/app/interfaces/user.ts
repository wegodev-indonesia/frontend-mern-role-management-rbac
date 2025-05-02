export interface Role {
  name: string;
  permissions: string[];
}

export interface User {
  _id: string;
  fullname: string;
  roles: Role[];
}
