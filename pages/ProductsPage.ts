import {Page} from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
  }

  async verifyOnProductsPage() {
    await this.title.waitFor();
  }

}