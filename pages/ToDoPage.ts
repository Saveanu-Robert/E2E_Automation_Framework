import { Page } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

export default class TodoPage {
  private welcomeMessageSelector = `[data-testid=welcome]`;
  private deleteIconSelector = '[data-testid=delete]';
  private noTodosMessageSelector = '[data-testid=no-todos]';
  private todoItemSelector = '[data-testid=todo-item]';

  async load(page: Page) {
    try {
      await page.goto('/todo');
      ReportingApi.info('Loaded the Todo page.');
    } catch (error) {
      ReportingApi.error(`Error loading Todo page: ${error.message}`);
      throw error;
    }
  }

  getWelcomeMessageElement(page: Page) {
    return page.locator(this.welcomeMessageSelector);
  }

  async deleteTodo(page: Page) {
    try {
      await page.click(this.deleteIconSelector);
      ReportingApi.info('Deleted a todo item.');
    } catch (error) {
      ReportingApi.error(`Error deleting a todo item: ${error.message}`);
      throw error;
    }
  }

  async getNoTodosMessage(page: Page) {
    return page.locator(this.noTodosMessageSelector);
  }

  async getTodoItem(page: Page) {
    return page.locator(this.todoItemSelector);
  }
}
