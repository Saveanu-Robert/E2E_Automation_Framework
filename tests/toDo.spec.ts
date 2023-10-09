import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/ToDoPage';
import NewTodoPage from '../pages/NewToDoPage';
import { ReportingApi } from '@reportportal/agent-js-playwright';

test('Add a new ToDo task', async ({ page, request, context }) => {

  try {
    const user = new User();
    const signupPage = new SignupPage();
    const newTodoPage = new NewTodoPage();
    const todoPage = new TodoPage();
    
    // Step 1: Sign up a new user
    ReportingApi.info('Step 1: Sign up a new user');
    await signupPage.signupUsingAPI(request, user, context);

    // Step 2: Load the New Todo page
    ReportingApi.info('Step 2: Load the New Todo page');
    await newTodoPage.load(page);

    // Step 3: Add a new task
    ReportingApi.info('Step 3: Add a new task');
    await newTodoPage.addTodo(page, 'Learn Automation!');

    // Step 4: Verify the added task
    ReportingApi.info('Step 4: Verify the added task');
    const todoItem = await todoPage.getTodoItem(page);
    expect(await todoItem.innerText()).toEqual('Learn Automation!');
  } catch (error) {
    // Log the error and set the test status as failed
    ReportingApi.error(`Step failed: ${error.message}`);
    ReportingApi.setStatusFailed();
    throw error;
  }
});

test('Delete a ToDo task', async ({ page, request, context }) => {

    const user = new User();
    const signupPage = new SignupPage();
    const newTodoPage = new NewTodoPage();
    const todoPage = new TodoPage();
  try {
    // Step 1: Sign up a new user
    ReportingApi.info('Step 1: Sign up a new user');
    await signupPage.signupUsingAPI(request, user, context);
  } catch (error) {
    // Log the error and set the test status as failed
    ReportingApi.error(`Step failed: ${error.message}`);
    ReportingApi.setStatusFailed();
    throw error;
  }
  try {
    // Step 2: Add a task using the API
    ReportingApi.info('Step 2: Add a task using the API');
    await newTodoPage.addTodoUsingApi(request, user);
  } catch (error) {
    // Log the error and set the test status as failed
    ReportingApi.error(`Step failed: ${error.message}`);
    ReportingApi.setStatusFailed();
    throw error;
  }
  try {
    // Step 3: Load the Todo page
    ReportingApi.info('Step 3: Load the Todo page');
    await todoPage.load(page);

    // Step 4: Delete a task
    ReportingApi.info('Step 4: Delete a task');
    await todoPage.deleteTodo(page);

    // Step 5: Verify no tasks are present
    ReportingApi.info('Step 5: Verify no tasks are present');
    const noTodosMessage = await todoPage.getNoTodosMessage(page);
    expect(await noTodosMessage).toBeVisible();
  } catch (error) {
    // Log the error and set the test status as failed
    ReportingApi.error(`Step failed: ${error.message}`);
    ReportingApi.setStatusFailed();
    throw error;
  }
});
