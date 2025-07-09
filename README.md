# 🏨 The Wild Oasis

A modern hotel management application built with React, designed to help hotel staff manage cabins, bookings, guests, and daily operations with ease.

![The Wild Oasis](./public/logo-light.png)

## ✨ Features

### 🏠 **Cabin Management**

- View all cabins with detailed information (capacity, price, discount)
- Add, edit, and delete cabins
- Upload cabin images
- Filter and sort cabins

### 📅 **Booking Management**

- Comprehensive booking overview with status tracking
- Detailed booking information including guest details
- Filter bookings by status (unconfirmed, checked-in, checked-out)
- Sort bookings by date, amount, etc.
- Delete bookings

### 📊 **Dashboard & Analytics**

- Real-time statistics and KPIs
- Sales charts and revenue tracking
- Occupancy duration charts
- Recent bookings overview
- Filterable data by time periods (7, 30, 90 days)

### 👥 **User Management**

- Secure user authentication (login/logout)
- User registration for new staff members
- Profile management
- Password updates

### ⚙️ **Settings**

- Hotel settings configuration
- Breakfast pricing management
- Min/max booking length settings
- Maximum guests per booking

### 🌙 **UI/UX Features**

- Dark/Light mode toggle
- Modern, clean interface
- Toast notifications for user feedback
- Form validation

## 🛠️ Tech Stack

### **Frontend**

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling

### **State Management**

- **React Query (TanStack Query)** - Server state management
- **Context API** - Global state (Dark mode)

### **Backend & Database**

- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - File storage

### **Forms & Validation**

- **React Hook Form** - Performant forms with easy validation

### **Data Visualization**

- **Recharts** - Charts and data visualization

### **UI & Styling**

- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **Date-fns** - Date formatting and manipulation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Marwan878/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Create a new project on [Supabase](https://supabase.com)
   - Get your project URL and anon key
   - Update `src/services/supabase.js` with your credentials:

   ```javascript
   export const SUPABASE_URL = "your-supabase-url";
   const supabaseKey = "your-supabase-anon-key";
   ```

4. **Set up the database**

   - Create the necessary tables in your Supabase dashboard
   - Set up Row Level Security (RLS) policies
   - Upload the sample data using the provided uploader component

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
the-wild-oasis/
├── public/                 # Static assets
│   ├── logo-dark.png
│   ├── logo-light.png
│   └── default-user.jpg
├── src/
│   ├── context/           # React Context providers
│   ├── data/              # Sample data and uploader
│   ├── features/          # Feature-based components
│   │   ├── authentication/
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── check-in-out/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── styles/            # Global styles
│   ├── ui/                # Reusable UI components
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
└── package.json
```

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Set up environment variables in Netlify dashboard

### Deploy to Vercel

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ✅ Acknowledgments

- The open-source community for the wonderful libraries used
- Built in the Ultimate React Course by Jonas Schmedtmann
