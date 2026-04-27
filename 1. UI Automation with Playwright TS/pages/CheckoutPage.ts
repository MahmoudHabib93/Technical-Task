import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkoutAsGuest() {
    await this.page.click('.checkout-as-guest-button');
  }

  async fillBillingAddress(data: any) {
    await this.page.fill('#BillingNewAddress_FirstName', data.firstName);
    await this.page.fill('#BillingNewAddress_LastName', data.lastName);
    await this.page.fill('#BillingNewAddress_Email', data.email);
    await this.page.selectOption('#BillingNewAddress_CountryId', { label: data.country });
    await this.page.fill('#BillingNewAddress_City', data.city);
    await this.page.fill('#BillingNewAddress_Address1', data.address1);
    await this.page.fill('#BillingNewAddress_ZipPostalCode', data.zip);
    await this.page.fill('#BillingNewAddress_PhoneNumber', data.phone);
    await this.page.click('input[onclick="Billing.save()"]');
  }

  async completeCheckoutSteps() {
    // Shipping Address
    await this.page.waitForSelector('#shipping-buttons-container input[onclick="Shipping.save()"]', { state: 'visible' });
    await this.page.click('input[onclick="Shipping.save()"]');
    
    // Shipping Method
    await this.page.waitForSelector('#shipping-method-buttons-container input[onclick="ShippingMethod.save()"]', { state: 'visible' });
    await this.page.click('input[onclick="ShippingMethod.save()"]');

    // Payment Method
    await this.page.waitForSelector('#payment-method-buttons-container input[onclick="PaymentMethod.save()"]', { state: 'visible' });
    await this.page.click('input[onclick="PaymentMethod.save()"]');

    // Payment Info
    await this.page.waitForSelector('#payment-info-buttons-container input[onclick="PaymentInfo.save()"]', { state: 'visible' });
    await this.page.click('input[onclick="PaymentInfo.save()"]');

    // Confirm Order
    await this.page.waitForSelector('#confirm-order-buttons-container input[onclick="ConfirmOrder.save()"]', { state: 'visible' });
    await this.page.click('input[onclick="ConfirmOrder.save()"]');
  }

  async verifyOrderCompleted() {
    await this.page.waitForSelector('.order-completed', { state: 'visible' });
    const text = await this.page.innerText('.order-completed');
    expect(text).toContain('Your order has been successfully processed!');
  }
}
