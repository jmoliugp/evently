 # 🌐 Full Stack Next.js 14 Events App

## Overview 🔎

Welcome to the Full Stack Next.js 14 Events App repository. This application is built using Next.js, leveraging server actions for efficient backend processing within the same framework used for the frontend. It utilizes MongoDB with Prisma as the ORM, allowing for seamless data handling and complex queries with ease. The app integrates Stripe for secure payment processing 💳 and uses TypeScript and Tailwind CSS for a type-safe, responsive design. Authentication is managed with Clerk 🔐, and file uploads are handled through uploadthing.

## Features 🌟

- Event creation and management 🎉.
- User authentication and authorization with Clerk 🔑.
- Secure payment processing with Stripe 💰.
- Responsive design using Tailwind CSS 🎨.
- Type-safe codebase with TypeScript ✅.
- File management with Uploadthing 📁.

## Prerequisites 📋

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) package manager 🧶
- [MongoDB](https://www.mongodb.com/) 🍃
- [Stripe](https://stripe.com/) Account 💳
- [Clerk](https://clerk.com/) Account 👥
- [Uploadthing](https://uploadthing.com/) Account 🗂️

## Installation 💻

To install the Full Stack Next.js 14 MERN Events App, follow these steps:

1. Clone the repository:
   ```
   git clone git@github.com:jmoliugp/evently.git
   ```
2. Install dependencies with Yarn:
   ```
   yarn install
   ```

## Setting Up Your Environment 🛠️

Create a `.env` file in the root directory with the following contents:

```env
# Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="MY_CLERK_PUBLIC_KEY"
CLERK_SECRET_KEY="MY_CLERK_SECRET_KEY"

# DB
DATABASE_URL=MY_MONGODB_URL

# UploadThing
UPLOADTHING_SECRET=MY_UPLOADTHING_SECRET
UPLOADTHING_APP_ID=MY_UPLOADTHING_ID
```

Replace `MY_CLERK_PUBLIC_KEY`, `MY_CLERK_SECRET_KEY`, `MY_MONGODB_URL`, `MY_UPLOADTHING_SECRET`, and `MY_UPLOADTHING_ID` with your actual credentials.

## Running the Application 🏃‍♂️

To run the application, use the following command:

```
yarn dev
```

This will start the development server on `http://localhost:3000`.

## Contributing 🤝

Contributions are welcomed and greatly appreciated. To contribute:

1. Fork the Project 🍴
2. Create your Feature Branch (`git checkout -b feature/<feature>`)
3. Commit your Changes (`git commit -m 'Add some <feature>'`)
4. Push to the Branch (`git push origin feature/<feature>`)
5. Open a Pull Request 📬

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.
