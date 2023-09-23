import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/ToDoPage';
import { ReportingApi } from '@reportportal/agent-js-playwright';

test('Register a new user in ToDo web application', async ({ page }, testInfo) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.load(page);
	await signupPage.signup(page, user);
	const todoPage = new TodoPage();
	const welcomeMessage = todoPage.getWelcomeMessageElement(page);
	try{
		ReportingApi.setTestCaseId('newUserCaseId');
		await expect(welcomeMessage).toBeVisible();
		// Capture a screenshot and attach it
		const screenshot = await page.screenshot();
		await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
		ReportingApi.setStatusPassed();
	}
	catch (e) {
    	console.log((e as Error).message);
		ReportingApi.setStatusFailed();
	}
});