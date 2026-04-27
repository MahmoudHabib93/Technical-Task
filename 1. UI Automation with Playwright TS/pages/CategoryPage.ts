import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addFirstProductToCart(buttonLocator: string) {
    const addToCartBtns = this.page.locator(buttonLocator);
    await addToCartBtns.first().click();
    // Wait for the ajax notification or just a brief timeout for stability
    await this.page.waitForTimeout(1000); 
  }
}
