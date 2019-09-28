export class User {
  constructor(
    public email: string,
    public username: string,
    public id: string,
    private userToken: string
  ) {}
  get token(): string {
    return this.userToken;
  }
}
