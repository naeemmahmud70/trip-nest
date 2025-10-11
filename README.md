![TripNest](public/tripnest.png)

# Project Overview
### Project Name: TripNest 
**Description:** TripNest is a full-stack hotel booking platform built with Next.js, offering a seamless end-to-end experience for travelers to search, filter, and book hotels with secure authentication and payment integration. The platform allows users to explore hotels based on location and availability, make instant bookings, and manage their reservations effortlessly. With integrated Stripe payment gateway, OAuth authentication (Google & Facebook), and real-time email notifications, TripNest ensures a smooth and secure user experience from discovery to booking confirmation.

The system also enables users to share feedback through reviews and ratings, providing valuable insights for future travelers and helping hotels improve their services. Built using a scalable architecture, TripNest ensures reliability, performance, and intuitive UI/UX across all devices.


## Repository/Project Information
**Version:** `0.01`  
**Last Release Date:** `10/10/2025`  
**Latest Stable Branch:** `main`  
**Active Development Branch:** `development`
**Hosted Link:** `https://trip-nest-blond.vercel.app`



## Build Instructions

**1. Clone the Repository**  
Run the following commands in your terminal:

```bash
 git clone https://github.com/naeemmahmud70/trip-nest
 cd trip-nest
```

**2. Install Dependencies**  
Use one of the following commands to install project dependencies:

```bash
 # Using npm
 npm install

 # OR using yarn
 yarn install
```

**3. Configure Environment Variables**  
Create a `.env` file in the root directory and add the following example configuration:

```bash
# database
MONGODB_CONNECTION_STRING=

# Oauth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
AUTH_SECRET=
ENVIRONMENT=
AUTH_TRUST_HOST=
NEXTAUTH_URL=

# payment integration
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# email sending
SEND_METHOD=
RESEND_API_KEY=
FROM_EMAIL=
 ```

Do not commit this file. Make sure it is listed in your `.gitignore`.

**4. Build the App (if using TypeScript or build step)**  
If your project requires a build step, run:

```bash
 npm run build
 # OR
 yarn build
```

**5. Run the App**  
Use one of the following commands to start the server:

```bash
 # For production
  npm start

 # For development with hot-reloading
 npm run dev
 # OR
 yarn dev
```
**6. Troubleshooting Tips**  
 - Ensure Node.js and npm/yarn are installed: `node -v` and `npm -v`
 - If you are facing issue while installing npm install then try with npm install –force
 - Check for missing environment variables or file misconfigurations