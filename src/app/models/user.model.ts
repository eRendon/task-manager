export interface User {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;
}

export class UserModel implements User {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;

  constructor(user: Omit<User, 'id'>) {
    this.id = UserModel.generateId();
    Object.assign(this, user);
  }

  private static generateId(): string {
    const numbers = Math.floor(1000000 + Math.random() * 9000000);
    const letters = Array.from({ length: 2 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))  ).join('');
    return `${numbers}${letters}`;
  }
}

