# Senior QA Automation Engineer Assignment

Playwright (TypeScript) automation for [Demo Web Shop](https://demowebshop.tricentis.com) using the Page Object Model (POM).

Implemented test case:
- Place order with multiple products
- Validate cart price calculations (unit price * quantity = line subtotal, and summed subtotal matches cart subtotal)

## Tech Stack

- Playwright Test
- TypeScript
- Allure reporter
- Dotenv

## Project Structure

```text
.
├── data/
│   └── testData.json
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CategoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   └── order.spec.ts
├── playwright.config.ts
├── .env.example
└── package.json
```

## Setup

1) Install dependencies:

```bash
npm install
```

2) Install Playwright browser:

```bash
npx playwright install
```

3) Create environment file:

```powershell
Copy-Item .env.example .env
```

Required variables:

```env
BASE_URL=https://demowebshop.tricentis.com
USER_EMAIL=testuser123@example.com
```

`.env` is ignored by git and should not be committed.

## Run Tests

Run full suite:

```bash
npm test
```

Run specific test:

```bash
npx playwright test tests/order.spec.ts
```

Run headed:

```bash
npx playwright test --headed
```

## Reports

Playwright HTML report:

```bash
npx playwright show-report
```

Allure report:

```bash
npm run allure:report
```

## Notes

- Test data (customer/products) is externalized in `data/testData.json`.
- Email is provided via `USER_EMAIL` environment variable.
