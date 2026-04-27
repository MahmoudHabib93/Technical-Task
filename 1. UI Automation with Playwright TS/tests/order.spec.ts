import { test } from '@playwright/test';
import * as testData from '../data/testData.json';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Place order with multiple products', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Add multiple products to cart based on testData
  for (const product of testData.products) {
    await homePage.goToCategory(product.categoryUrl);
    await categoryPage.addFirstProductToCart(product.buttonLocator);
  }

  // 2. Go to cart and verify price calculations
  await cartPage.open();
  await cartPage.verifyPriceCalculations();

  // 3. Proceed to checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.checkoutAsGuest();

  // 4. Fill details and place order
  // Getting email from environment variables (Requirement)
  const userEmail = process.env.USER_EMAIL || 'fallback@example.com';
  
  const customerData = {
    ...testData.customer,
    email: userEmail
  };

  await checkoutPage.fillBillingAddress(customerData);
  await checkoutPage.completeCheckoutSteps();

  // 5. Verify success
  await checkoutPage.verifyOrderCompleted();
});
