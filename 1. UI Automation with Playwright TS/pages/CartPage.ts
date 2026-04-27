import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateTo('/cart');
  }

  async verifyPriceCalculations() {
    // Collect all rows in the cart table
    const cartRows = this.page.locator('.cart tbody tr');
    const rowCount = await cartRows.count();
    
    let calculatedTotal = 0;
    
    for (let i = 0; i < rowCount; i++) {
      const row = cartRows.nth(i);
      
      const priceText = await row.locator('.product-unit-price').innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      
      const qtyText = await row.locator('.qty-input').inputValue();
      const qty = parseInt(qtyText, 10);
      
      const subtotalText = await row.locator('.product-subtotal').innerText();
      const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
      
      // Verification per item
      expect(subtotal).toBeCloseTo(price * qty, 2);
      
      calculatedTotal += subtotal;
    }
    
    // Verify total against the calculated subtotal 
    const subTotalRow = this.page.locator('tr').filter({ hasText: 'Sub-Total:' });
    if (await subTotalRow.count() > 0) {
      const subTotalFieldText = await subTotalRow.locator('td').nth(1).innerText();
      const parsedSubTotal = parseFloat(subTotalFieldText.replace(/[^0-9.]/g, ''));
      expect(parsedSubTotal).toBeCloseTo(calculatedTotal, 2);
    }
  }

  async proceedToCheckout() {
    await this.page.locator('#termsofservice').click();
    await this.page.locator('#checkout').click();
  }
}
