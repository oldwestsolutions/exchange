# Bridge - News & Portfolio Dashboard

A modern TypeScript React application featuring a news homepage, login system, and Robinhood-style investment dashboard.

## Features

- **Homepage**: Google News style layout with search functionality and dark/light mode
- **Login Page**: Secure login form with validation
- **Dashboard**: Investment portfolio tracker with charts and transaction history
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons
- Vite for fast development

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components (Homepage, Login, Dashboard)
├── types/         # TypeScript type definitions
├── data/          # Mock data for development
├── context/       # React Context providers
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Available Routes

- `/` - Homepage (News)
- `/login` - Login page
- `/dashboard` - Portfolio dashboard

## Mock Data

The application uses placeholder data stored in the `src/data/` directory. Replace this with API calls when integrating with a backend.

