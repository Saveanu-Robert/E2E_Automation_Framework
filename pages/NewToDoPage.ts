import { APIRequestContext, Page } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';
import ToDoApi from '../apis/ToDoApi';
import User from '../models/User';

export default class NewTodoPage {
  private newTodoInputSelector = '[data-testid=new-todo]';
  private newTodoSubmitSelector = '[data-testid=submit-newTask]';

  async load(page: Page) {
    try {
      await page.goto('/todo/new');
      ReportingApi.info('Loaded the New Todo page.');
    } catch (error) {
      ReportingApi.error(`Error loading New Todo page: ${error.message}`);
      throw error;
    }
  }

  async addTodo(page: Page, task: string) {
    try {
      await page.type(this.newTodoInputSelector, task);
      await page.click(this.newTodoSubmitSelector);
      ReportingApi.info(`Added a new task: ${task}`);
    } catch (error) {
      ReportingApi.error(`Error adding a new task: ${error.message}`);
      throw error;
    }
  }

  async addTodoUsingApi(request: APIRequestContext, user: User) {
    try {
      const todoApi = new ToDoApi();
      await todoApi.addTodo(request, user);
      ReportingApi.info('Added a new task using API.');
    } catch (error) {
      ReportingApi.error(`Error adding a new task using API: ${error.message}`);
      throw error;
    }
  }
}
