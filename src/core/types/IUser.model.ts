export class IUser {
  static fromDataBase({ name, userId, email, photoUrl, admin }) {
    return new IUser(name, userId, email, photoUrl, admin);
  }

  constructor(
    public name: string,
    public userId: string,
    public email: string,
    public photoUrl: string,
    public admin?: boolean
  ) {}
}
