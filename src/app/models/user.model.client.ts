export class User {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  authToken?: string | null;

  constructor(
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    authToken: string | null
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.authToken = authToken;
  }
}
