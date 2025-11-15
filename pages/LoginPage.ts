import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput; 
  readonly passwordInput; 
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/index.html');
  }

  async login(usarname: string, password: string) {
    await this.usernameInput.fill(usarname);
    await this.passwordInput.fill(password);
    await this.loginButton.click(); 
  }

}