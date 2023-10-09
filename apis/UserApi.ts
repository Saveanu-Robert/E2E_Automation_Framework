import { APIRequestContext } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';
import User from '../models/User';

export default class UserApi {

  async signup(request: APIRequestContext, user: User) {
    try {
      const response = await request.post('/api/v1/users/register', {
        data: {
          email: user.getEmail(),
          password: user.getPassword(),
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
        },
      });

      // Log a successful signup
      ReportingApi.info('User successfully signed up.');

      return response;
    } catch (error) {
      // Log the error using ReportPortal
      ReportingApi.error(`Error during user signup: ${error.message}`);
      ReportingApi.setStatusFailed();
      // You can also throw the error if you want to handle it at a higher level.
      throw error;
    }
  }
}
