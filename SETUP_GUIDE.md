# Bridge - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to `http://localhost:5173` (Vite will display the exact URL in the terminal)

### Other Available Commands

- **Build for Production**
  ```bash
  npm run build
  ```

- **Preview Production Build**
  ```bash
  npm run preview
  ```

- **Run Linter**
  ```bash
  npm run lint
  ```

## 📁 Project Structure

```
bridge/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx                # Main navigation bar with theme toggle
│   │   ├── NewsCard.tsx              # News article card component
│   │   ├── StockTable.tsx            # Portfolio stock table
│   │   ├── TransactionList.tsx       # Transaction history list
│   │   ├── PortfolioChart.tsx        # Stock price chart using Recharts
│   │   └── DashboardSidebar.tsx      # Dashboard sidebar navigation
│   │
│   ├── pages/               # Main page components
│   │   ├── Homepage.tsx              # News homepage with search
│   │   ├── Login.tsx                 # Login page with validation
│   │   └── Dashboard.tsx             # Portfolio dashboard
│   │
│   ├── context/             # React Context providers
│   │   └── ThemeContext.tsx          # Dark/light mode theme provider
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── news.ts                   # News article types
│   │   ├── auth.ts                   # Authentication types
│   │   ├── portfolio.ts              # Portfolio & stock types
│   │   └── index.ts                  # Type exports
│   │
│   ├── data/                # Mock data
│   │   ├── newsData.ts               # Mock news articles
│   │   └── portfolioData.ts          # Mock portfolio data
│   │
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles & Tailwind imports
│
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

## 🎨 Features Overview

### 1. Homepage (News)
- **Path**: `/`
- **Features**:
  - Google News-style grid layout
  - Real-time search functionality
  - Responsive cards with images
  - Category badges
  - Publication dates and sources
  - Dark/light mode toggle

### 2. Login Page
- **Path**: `/login`
- **Features**:
  - Email and password validation
  - Show/hide password toggle
  - "Remember me" checkbox
  - "Forgot password" link
  - Form validation with error messages
  - Logs form data to console on submit
  - Modern gradient design

### 3. Dashboard (Portfolio)
- **Path**: `/dashboard`
- **Features**:
  - Portfolio summary cards (total value, daily change, total gain)
  - Interactive stock table
  - Live price charts (Recharts)
  - Transaction history
  - Sidebar navigation (Portfolio, Markets, Watchlist, Account)
  - Click stocks to view price history
  - Mobile-responsive bottom navigation
  - Robinhood-inspired design

## 🎯 Key Technologies

- **React 18** - UI library with functional components
- **TypeScript** - Type-safe JavaScript
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Chart library for data visualization
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## 🌓 Dark Mode

The application includes a fully functional dark/light mode toggle:
- Click the moon/sun icon in the navbar to switch themes
- Preference is saved to localStorage
- All components are styled for both modes
- Smooth transitions between themes

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: Optimized layouts, bottom navigation on dashboard
- **Tablet**: Adjusted grid layouts
- **Desktop**: Full sidebar navigation, multi-column grids

## 🔧 Customization

### Adding New News Articles
Edit `src/data/newsData.ts` and add new articles to the `mockNewsArticles` array.

### Adding New Stocks
Edit `src/data/portfolioData.ts` and add new stocks to the `mockStocks` array.

### Modifying Colors
Edit `tailwind.config.js` to customize the color scheme.

### Adding New Routes
Add routes in `src/App.tsx` using React Router's `<Route>` component.

## 🔐 Login Credentials

The login page is frontend-only (no backend integration). You can enter any email and password meeting the validation criteria:
- Valid email format
- Password at least 6 characters

Click "Sign In" to see the form data logged to the browser console.

## 📊 Mock Data

All data is currently mocked for demonstration:
- **News Articles**: 12 sample articles in various categories
- **Portfolio**: 6 stocks with price history
- **Transactions**: 7 recent transactions
- **Price Charts**: 30 days of generated price data per stock

To integrate with a real backend:
1. Replace mock data imports with API calls
2. Add loading states
3. Implement error handling
4. Add authentication logic

## 🎨 Design Philosophy

- **Clean & Modern**: Minimalist design with smooth transitions
- **User-Centric**: Intuitive navigation and interactions
- **Accessible**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized rendering and lazy loading
- **Maintainable**: Well-organized code with clear comments

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Missing Dependencies
Run `npm install` to ensure all dependencies are installed.

### Type Errors
Make sure TypeScript is configured correctly by checking `tsconfig.json`.

### Styling Issues
Verify that Tailwind CSS is properly configured in `tailwind.config.js` and imported in `src/index.css`.

## 📝 Notes

- This is a frontend-only application with no backend integration
- All authentication is simulated (form validation only)
- Data persistence is not implemented (refresh resets state)
- Charts use randomly generated historical data for demonstration

## 🚀 Next Steps

To turn this into a production application, consider:

1. **Backend Integration**
   - Connect to a real news API (e.g., NewsAPI, Guardian API)
   - Implement user authentication with JWT
   - Connect to stock market APIs (e.g., Alpha Vantage, IEX Cloud)

2. **State Management**
   - Add Redux or Zustand for global state
   - Implement data caching

3. **Additional Features**
   - User registration
   - Stock trading functionality
   - Real-time price updates with WebSockets
   - Watchlist management
   - Portfolio analytics and reports
   - Email notifications

4. **Testing**
   - Add unit tests (Jest, Vitest)
   - Add integration tests (React Testing Library)
   - Add E2E tests (Playwright, Cypress)

5. **Deployment**
   - Deploy to Vercel, Netlify, or AWS
   - Set up CI/CD pipeline
   - Configure environment variables

## 📄 License

This project is open source and available for educational purposes.

---

**Happy coding! 🎉**

