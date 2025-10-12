# Bright Path - Career Recommendation App

A modern, responsive career guidance platform built with React and Tailwind CSS that helps students discover their ideal career paths through AI-powered recommendations.

## Features

### 🎯 Core Functionality
- **User Authentication**: Secure login and signup with form validation
- **Career Assessment**: Comprehensive form to gather user preferences and interests
- **AI-Powered Recommendations**: Personalized career suggestions based on user data
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Protected Routes**: Secure dashboard access with authentication

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Beautiful loading animations and spinners
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes

### 🛠 Technical Features
- **React Router**: Client-side routing with protected routes
- **Local Storage**: Persistent authentication state
- **Axios Integration**: API calls for career recommendations
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Component Architecture**: Modular, reusable React components

## Project Structure

```
client/src/
├── components/
│   ├── Dashboard.jsx      # Main career assessment and results page
│   ├── Landing.jsx        # Homepage with features and CTA
│   ├── Login.jsx          # User login form
│   ├── ProtectedRoute.jsx # Route protection component
│   └── Signup.jsx         # User registration form
├── App.jsx                # Main app with routing setup
├── main.jsx              # React app entry point
└── index.css             # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### For New Users
1. Visit the landing page to learn about Bright Path
2. Click "Get Started" or "Sign Up" to create an account
3. Fill out the registration form with your details
4. Access the dashboard to complete your career assessment
5. Submit the form to receive personalized career recommendations

### For Returning Users
1. Click "Sign In" from the landing page
2. Enter your email and password
3. Access your personalized dashboard
4. View previous recommendations or update your profile

## Pages Overview

### 🏠 Landing Page (`/`)
- Hero section with compelling value proposition
- Feature highlights and benefits
- Call-to-action buttons for signup/login
- Professional footer with branding

### 🔐 Login Page (`/login`)
- Clean, centered login form
- Email and password fields with validation
- "Remember me" option and forgot password link
- Link to signup page for new users
- Loading states and error handling

### 📝 Signup Page (`/signup`)
- Comprehensive registration form
- Real-time form validation
- Terms and conditions acceptance
- Professional gradient design
- Success feedback and navigation

### 📊 Dashboard (`/dashboard`)
- Protected route requiring authentication
- Career assessment form with multiple sections:
  - Personal information (class, percentage)
  - Academic interests (favorite subjects)
  - Career preferences (work environment, values)
  - Location preferences
- Real-time results display
- Personalized insights and recommendations
- Logout functionality

## Technologies Used

- **React 19**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and development server

## Design System

### Colors
- Primary: Blue gradient (#3B82F6 to #6366F1)
- Secondary: Purple/Pink gradient for signup
- Neutral: Gray scale for text and backgrounds
- Success: Green for positive feedback
- Error: Red for validation errors

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, large sizes for hierarchy
- Body: Regular weight, readable sizes
- Interactive: Medium weight for buttons and links

### Components
- Consistent border radius (8px for forms, 12px for cards)
- Subtle shadows for depth
- Smooth transitions (200ms) for interactions
- Responsive spacing and layouts

## Future Enhancements

- [ ] User profile management
- [ ] Career recommendation history
- [ ] Educational institution database
- [ ] Job market insights
- [ ] Progress tracking and goal setting
- [ ] Social features and community
- [ ] Mobile app development
- [ ] Advanced AI recommendations
- [ ] Integration with job boards
- [ ] Mentorship matching

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@brightpath.com or create an issue in the repository.

---

**Bright Path** - Your journey to the perfect career starts here! 🚀