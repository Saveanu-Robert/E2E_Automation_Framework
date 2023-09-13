import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/ToDoPage';

test('Register a new user in ToDo web application', async ({ page }) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.load(page);
	await signupPage.signup(page, user);
	const todoPage = new TodoPage();
	const welcomeMessage = todoPage.getWelcomeMessageElement(page);
	await expect(welcomeMessage).toBeVisible();
});