# Sneaker Drop Frontend

This is the frontend for the Sneaker Drop application, built with React, Vite, and Tailwind CSS. It provides a real-time interface for users to browse limited sneaker drops, reserve items, and complete purchases.

## Features

- **User Authentication**: Secure signup and login flows with JWT-based persistent sessions.
- **Real-time Stock Updates**: Integrated with Socket.io to reflect stock changes instantly across all clients.
- **Reservation System**: Users can reserve a sneaker for 60 seconds. A countdown timer displays the remaining time before the reservation expires and stock is restored.
- **Recent Buyers Listing**: Displays the last 3 purchasers for each sneaker drop.
- **Responsive Navbar**: Clean navigation with user profile indicators and logout functionality.
- **Protected Routes**: Ensures only authenticated users can access the drops listing.

## Technologies Used

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router Dom**: Client-side routing
- **Socket.io-client**: Real-time communication
- **React Hot Toast**: Beautiful, customizable notifications
- **React Hook Form & Yup**: Form handling and validation

## Prerequisites

- Node.js (v18 or higher)
- Backend server running (see [backend/Readme.md](../backend/Readme.md))

## Installation

1.  **Navigate to the frontend directory**:
    ```bash
    cd sneaker-drop-frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the `sneaker-drop-frontend` directory and add the following:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

## Project Structure

- `src/api/`: Axios configuration and API service functions.
- `src/components/`: Reusable UI components (Navbar, ProtectedRoute, etc.).
- `src/context/`: Auth context for managing user sessions.
- `src/hooks/`: Custom hooks for drops and authentication logic.
- `src/pages/`: Main page components (Drops, Login, Signup).
- `src/utils/`: Helper functions and lazy loading utilities.
