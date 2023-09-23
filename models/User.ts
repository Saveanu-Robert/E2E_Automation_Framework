import { faker } from '@faker-js/faker';

export default class User {
  private firstName: string = faker.person.firstName();
  private lastName: string = faker.person.lastName();
  private email: string = faker.internet.email();
  private password: string = 'Automation2023';
  private accessToken: string = '';
  private userID: string = '';

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getUserID(): string {
    return this.userID;
  }

  setUserID(userID: string): void {
    this.userID = userID;
  }
}
