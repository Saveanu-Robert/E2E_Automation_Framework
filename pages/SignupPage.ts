import { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import config from '../playwright.config';

export default class SignupPage {
  private firstNameInputSelector = `[data-testid=first-name]`;
  private lastNameInputSelector = `[data-testid=last-name]`;
  private emailInputSelector = `[data-testid=email]`;
  private passwordInputSelector = `[data-testid=password]`;
  private confirmPasswordInputSelector = `[data-testid=confirm-password]`;
  private submitButtonSelector = `[data-testid=submit]`;

  async load(page: Page) {
    try {
      await page.goto('/signup');
      ReportingApi.info('Loaded the Signup page.');
    } catch (error) {
      ReportingApi.error(`Error loading Signup page: ${error.message}`);
      throw error;
    }
  }

  async signup(page: Page, user: User) {
    try {
      await page.type(this.firstNameInputSelector, user.getFirstName());
      await page.type(this.lastNameInputSelector, user.getLastName());
      await page.type(this.emailInputSelector, user.getEmail());
      await page.type(this.passwordInputSelector, user.getPassword());
      await page.type(this.confirmPasswordInputSelector, user.getPassword());
      await page.click(this.submitButtonSelector);
      ReportingApi.info('User successfully signed up.');
    } catch (error) {
      ReportingApi.error(`Error during user signup: ${error.message}`);
      throw error;
    }
  }

  async signupUsingAPI(
    request: APIRequestContext,
    user: User,
    context: BrowserContext
  ) {
    try {
      const response = await new UserApi().signup(request, user);
      const responseBody = await response.json();
      const access_token = responseBody.access_token;
      const firstName = responseBody.firstName;
      const userID = responseBody.userID;

      await context.addCookies([
        {
          name: 'access_token',
          value: access_token,
          url: config.use?.baseURL,
        },
        {
          name: 'firstName',
          value: firstName,
          url: config.use?.baseURL,
        },
        {
          name: 'userID',
          value: userID,
          url: config.use?.baseURL,
        },
      ]);
      ReportingApi.info('User signed up using API.');
    } catch (error) {
      ReportingApi.error(`Error during user signup using API: ${error.message}`);
      throw error;
    }
  }
}
