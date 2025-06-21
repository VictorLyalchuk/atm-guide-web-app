export interface Role {
  id: number;
  name: string;
}

export const ROLES: Role[] = [
  { id: 1, name: 'User' },
  { id: 2, name: 'Administrator' },
];
