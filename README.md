# Expert Speaker Finder 🎤

A web platform that enables students to recommend expert speakers for university seminars and events. Built with React.js and Supabase, this application streamlines the process of discovering and managing potential speakers for academic institutions.

## 🌟 Features

- **Speaker Recommendations**
  - Students can submit detailed profiles of potential expert speakers
  - Include speaker's expertise, background, and previous speaking experiences
  - Attach relevant credentials and achievements

- **Admin Dashboard**
  - Review and manage speaker submissions
  - Filter speakers by expertise and availability
  - Make informed decisions on speaker selection
  - Track submission status and history

- **User Authentication**
  - Secure login system for students and administrators
  - Role-based access control
  - Protected admin routes

## 🛠️ Technology Stack

- **Frontend**
  - React.js (v14+)
  - React Router for navigation
  - TailwindCSS for styling
  - React Query for data fetching
  - React Hook Form for form handling

- **Backend**
  - Supabase for database and authentication
  - Real-time data synchronization
  - Secure file storage for speaker documents

## 📋 Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn package manager
- Supabase account and project

## ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/DebdootManna/expert-speaker-finder.git
cd expert-speaker-finder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Add your Supabase credentials:
```
REACT_APP_SUPABASE_URL=https://bxrvccxcilufcwefaqss.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cnZjY3hjaWx1ZmN3ZWZhcXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNjEzNzQsImV4cCI6MjA0NDgzNzM3NH0.4haTP4NPV9Un-6CQ16HKNxmGTPMYC8CP2AXEN4yd0bQ
```

4. Start the development server
```bash
npm start
```

## 🗄️ Database Schema

### Speakers Table
```sql
speakers (
  id: uuid primary key
  name: string
  expertise: string
  background: string
  previous_talks: json
  contact_info: json
  submitted_by: uuid foreign key
  status: enum ['pending', 'approved', 'rejected']
  created_at: timestamp
)
```

### Users Table
```sql
users (
  id: uuid primary key
  email: string
  role: enum ['student', 'admin']
  university_id: string
  created_at: timestamp
)
```

## 🔐 Security

- Role-based access control (RBAC) implemented
- Input validation and sanitization
- Protected API endpoints
- Secure file upload handling
- Rate limiting for submissions

## 🚀 Deployment

1. Build the project
```bash
npm run build
```

2. Deploy to your preferred hosting service (e.g., Vercel, Netlify)
```bash
# Example for Vercel
vercel deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Contact

Project Link: [https://github.com/DebdootManna/expert-speaker-finder](https://github.com/DebdootManna/expert-speaker-finder)

## 🙏 Acknowledgments

- React.js documentation
- Supabase team and documentation
- All contributors who helped shape this project
