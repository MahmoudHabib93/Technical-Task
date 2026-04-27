import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateTo('/');
  }

  async goToCategory(categoryUrl: string) {
    await this.navigateTo(categoryUrl);
  }
}
