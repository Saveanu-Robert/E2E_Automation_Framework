import { APIRequestContext } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';
import User from '../models/User';

export default class ToDoApi {

  async addTodo(request: APIRequestContext, user: User) {
    try {
      const response = await request.post('/api/v1/tasks', {
        data: {
          isCompleted: false,
          item: 'Learn Automation!',
        },
        headers: {
          Authorization: `Bearer ${user.getAccessToken()}`,
        },
      });

      // Log a successful request
      ReportingApi.info('Successfully added a todo item.');

      return response;
    } catch (error) {
      // Log the error using ReportPortal
      ReportingApi.error(`Error while adding a todo item: ${error.message}`);

      // You can also throw the error if you want to handle it at a higher level.
      throw error;
    }
  }
}
