import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/ToDoPage';
import NewTodoPage from '../pages/NewToDoPage';
import { ReportingApi } from '@reportportal/agent-js-playwright';

test('Add a new ToDo task', async ({ page, request, context }, testInfo) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.signupUsingAPI(request, user, context);
	const newTodoPage = new NewTodoPage();
	await newTodoPage.load(page);
	await newTodoPage.addTodo(page, 'Learn Automation!');
	const todoPage = new TodoPage();
	const todoItem = await todoPage.getTodoItem(page);
	try {
		ReportingApi.setTestCaseId('newToDOCaseId');
		expect(await todoItem.innerText()).toEqual('Learn Automation!');
		// Capture a screenshot and attach it
		const screenshot = await page.screenshot();
		await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
		ReportingApi.setStatusPassed();
	}catch (e) {
    	console.log((e as Error).message);
		ReportingApi.setStatusFailed();
}
	
});

test('Delete a ToDo task', async ({ page, request, context }, testInfo) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.signupUsingAPI(request, user, context);

	const newTodoPage = new NewTodoPage();
	await newTodoPage.addTodoUsingApi(request, user);

	const todoPage = new TodoPage();
	await todoPage.load(page);
	await todoPage.deleteTodo(page);
	const noTodosMessage = await todoPage.getNoTodosMessage(page);
	try{
		ReportingApi.setTestCaseId('deleteToDOCaseId');
		await expect(noTodosMessage).toBeVisible();
		// Capture a screenshot and attach it
		const screenshot = await page.screenshot();
		await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
		ReportingApi.setStatusPassed();
	}catch (e) {
    	console.log((e as Error).message);
		ReportingApi.setStatusFailed();
	}
});