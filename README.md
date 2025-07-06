# 🐝 Taskify - Honeybee-Themed Task Management App

A playful, interactive, and modern task management application with a unique honeybee theme, animated bees and flowers, and age-based user avatars. Built with React, Node.js, and MongoDB.

## ✨ Features

### 🎨 **Honeybee Theme & Interactive UI**
- **Animated Bee Mascot & Avatars**: Cute SVG bees, age-based roles, and lively floating/flying bees
- **Animated Flowers**: Decorative, interactive flowers on every page
- **Playful Color Palette**: Honey, gold, and nature-inspired gradients
- **Modern Field Names**: "What's the Buzz?" (task title), "Bee Brief" (description), "Add Buzz" (add task button)
- **Smooth Animations**: Framer Motion for all interactions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 📋 **Task Management**
- **Create, Read, Update, Delete** tasks with priority and categories
- **Task Status**: Pending, In Progress, Completed, Overdue (auto-detection)
- **Priority Levels**: High 🔥, Medium ⚡, Low 🌱 with color coding and grouping
- **Categories**: Work, Personal, Health, Other
- **Search & Filter**: Find tasks by status, priority, or text search
- **Due Date Management**: Automatic overdue detection and notifications
- **Grouped Task List**: Tasks are grouped by priority for easy viewing

### 🔐 **Authentication & Onboarding**
- **Google OAuth Integration**: Secure login with Google accounts
- **JWT Token Management**: Secure session handling
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Age Selection Flow**: After Google signup/login, users are prompted to select their age for a personalized bee avatar and greeting

### 🎉 **Interactivity & Feedback**
- **Toast Notifications**: Fun, animated notifications for all actions
- **Hover Effects**: Cards lift and glow on hover
- **Confetti Animations**: Celebration effects for task completion
- **Live Status Indicators**: Real-time connection status
- **Emoji Icons**: Playful emoji-based status and priority indicators

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd listtodoapp
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/taskify?retryWrites=true&w=majority
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   cd backend
   npm start
   
   # Start frontend (from root directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🎯 Usage

### Getting Started
1. **Visit the app** at http://localhost:3000
2. **Sign up/Login** using Google OAuth or email/password
3. **After Google signup/login, you'll be prompted to select your age** (unless already set) for a personalized bee avatar and greeting
4. **Start creating tasks** with the "Add Buzz" button

### Task Management
- **Create Tasks**: Click "Add Buzz" and fill in "What's the Buzz?", "Bee Brief", priority, category, and due date
- **Edit Tasks**: Click the edit icon (✏️) on any task card
- **Delete Tasks**: Click the delete icon (🗑️) on any task card
- **Mark Complete**: Click the status icon to cycle through statuses
- **Search & Filter**: Use the search bar and filter dropdowns to find specific tasks
- **Grouped by Priority**: Tasks are grouped visually by High, Medium, and Low priority

### Bee Roles & Personalization
- Your bee avatar and greeting change based on your age
- Each age group has a unique bee role with motivational messages
- The mascot animates and responds to your actions

### Playful UI
- Animated bees and flowers on every page
- Modern, lively headings and buttons
- Consistent honeybee theme throughout login, signup, age selection, and dashboard

## 🛠️ Technology Stack

### Frontend
- **React 18** with Hooks and Context API
- **Framer Motion** for smooth animations
- **React Icons** for beautiful icons
- **CSS3** with custom honeybee theme
- **Responsive Design** with mobile-first approach

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Google OAuth 2.0** integration
- **CORS** enabled for cross-origin requests

### Database
- **MongoDB Atlas** (cloud) or local MongoDB
- **User Schema**: Authentication and profile data
- **Task Schema**: Task management with relationships, priority, and category

## 🌍 Deployment

You can deploy Taskify for free using:
- **Vercel** (frontend)
- **Render** or **Heroku** (backend)
- **MongoDB Atlas** (database)

Or use any cloud provider. For a custom domain (like https://yourapp.com), you'll need to purchase a domain name.

## 📱 Screenshots

*[Add screenshots of your app here]*

## 🔧 Configuration

### Customizing Bee Roles
Edit `src/components/BeeAvatar.js` to modify age ranges and greetings:
```javascript
export function getBeeRole(age) {
  if (age <= 10) return { 
    role: "Baby Bee", 
    emoji: "🐝", 
    greeting: "Your custom greeting here!"
  };
  // ... add more age groups
}
```

### Theme Customization
Modify `src/components/Dashboard.css` to change colors and styling:
```css
.dashboard-bg-bee {
  background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bee SVG**: Custom designed honeybee mascot
- **Framer Motion**: For smooth animations
- **React Icons**: For beautiful iconography
- **MongoDB Atlas**: For cloud database hosting
- **Google OAuth**: For secure authentication

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Made with 🐝 and ❤️ by the Taskify Team**

