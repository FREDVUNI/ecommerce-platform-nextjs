# Full Stack Integrated E-Commerce Website with Admin Dashboard

This project demonstrates how to build and deploy a full-stack integrated e-commerce website with an admin dashboard using the following technologies:

- **Next.js 14**: A React framework for server-rendered applications.
- **Stripe**: A payment processing platform.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **MongoDB**: A NoSQL database for all database management.
- **Clerk**: A service for authentication and user management.
- **React-Hook-Form**: A library for form validation.
- **Zod:** A schema validation library used to define and validate the shape of data in TypeScript
- **Tailwind CSS & Shadcn UI**: Utility-first CSS framework and UI components for responsive UI design.
- **Next Cloudinary**: A service for image upload and storage.

## Features

- E-commerce functionalities including product listing, shopping cart, and checkout.
- Admin dashboard for managing products, orders, and users.
- Secure payment processing with Stripe.
- User authentication and management with Clerk.
- Form validation with React-Hook-Form.
- Responsive UI design with Tailwind CSS and Shadcn UI.
- Image upload and storage with Next Cloudinary.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database.
- Stripe account for payment processing.
- Clerk account for authentication.
- Cloudinary account for image storage.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FREDVUNI/ecommerce-platform-nextjs
   cd fullstack-ecommerce-platform
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add the following variables:

   ```env
   MONGO_DB_NAME=your-mongo-db-name
   MONGODB_URI=your-mongodb-uri
   STRIPE_SECRET_KEY=your-stripe-secret-key
   CLERK_FRONTEND_API=your-clerk-frontend-api
   CLERK_API_KEY=your-clerk-api-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL
   NEXT_PUBLIC_CLERK_SIGN_UP_URL
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   MONGO_URI=your-mongo-db-uri
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Building for Production

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

### Deployment

Deploy your application using a platform of your choice, such as Vercel, Heroku, or AWS. Make sure to configure the environment variables on your deployment platform.

## Project Structure

- **/components**: React components for the UI.
- **/pages**: Next.js pages.
- **/lib**: Library functions and utilities.
- **/styles**: CSS and styling files.
- **/public**: Static files.
- **/api**: API routes.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Clerk Documentation](https://docs.clerk.dev/)
- [React-Hook-Form Documentation](https://react-hook-form.com/get-started)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://shadcn.dev/docs)
- [Next Cloudinary Documentation](https://cloudinary.com/documentation/next_integration)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Special thanks to [Code With Phuc](https://www.youtube.com/watch?v=SR4dFgdKUyI&t=661s) and contributors of the libraries and services used in this project.
