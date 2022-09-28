![Frame 92](https://user-images.githubusercontent.com/18395671/192744836-92bbd04b-84ad-462d-8b3c-45c93c005540.png)

Loan App takes you through the basics of a simulated loan application—including options for paycheck-linked lending (PLL)—and demonstrates where and how Argyle’s solutions fit in to simplify the flow.

Argyle supports many different components of an online loan application, including:

- **Real-time income verifications** through direct, programmatic connections to users’ payroll accounts
- **Autocomplete and deep-linking capabilities** through a smart Employer Search bar
- **Automatically allocated repayments** through direct deposit switching and paycheck-linked lending solutions

But unless you see these tools at work as part of an actual loan application flow, it’s difficult to gauge what they’ll look and feel like in practice or to imagine how users might encounter them on your platform.

Our new Loan App eliminates the guesswork and paints a clear picture of how Argyle works with an interactive demo that walks you through an Argyle-powered application from end to end.

## Getting Started
Rename env.example to .env and fill in Argyle related keys from your https://console.argyle.com account. 

Install the dependencies

```
npm install
# or
yarn install
```

Run the development server:

```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

### Folder structure (in `src`)

- **Hooks** - used when caching when same network calls are required for multiple components.
- **Layouts** - define reusable page layouts.
- **Models** - store reusable TypeScript types.
- **Pages**:
  - API for all backend functionality that's hidden from end-user. To not expose any keys or potentially abusive calls.
  - Other folders represent different flows (basically separated by tabs).
- **Stores** - zustand is used since it provides a simple yet scalable storage solution. Storage is split into decoupled slices separated by logical flows. All actions are defined in relevant slices. The global store contains parameters that are essential for the whole app, i.e. isPdConfigured or userId.
- **Components** - dumb components that do not carry their own state but rather use what is provided via props.
- **Views** - smart views that have their own state, business logic and are reused over multiple screens.

[Next.js](https://nextjs.org/) is used to have a fast server side rendered React.js application.

[tailwindcss](https://tailwindcss.com/) was chosen for styling as it provides rapid and easy on-the-go styling. `tailwind.config.js` file contains custom styling presets like fonts and colors.

### Page order

0. /
1. /landing
2. /information
3. /employment
4. /credit/landing
5. /credit/checking
6. /credit/success
7. /bank/landing
8. /bank/connecting/
9. /bank/failed
10. /connect
* Argyle Link screens
11. /loan/landing

* PPL not enabled:

12. /loan/sign
13. /loan/success

* PPL enabled:

12. /loan/ppl/confirm
13. /loan/ppl/sign
14. /loan/ppl/success
