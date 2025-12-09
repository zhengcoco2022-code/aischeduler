# SmartSchedule - AI-Powered Personal Scheduling

A full-stack web application that uses AI to automatically create personalized, healthy daily and weekly schedules.

## 🎯 Features

### Core Functionality
- **📸 Smart OCR Upload**: Upload a photo of your class schedule and AI automatically extracts all information
- **🤖 AI Chat Assistant**: Use natural language to create tasks - "I need to study for 2 hours every evening"
- **🎙️ Voice Recording**: Record voice commands to add tasks and modify your schedule hands-free
- **📅 Interactive Calendar**: Drag-and-drop schedule editor with color-coded events
- **🔄 Intelligent Scheduling**: AI respects sleep hours, breaks, and workload distribution
- **📊 Schedule Health**: Alerts when schedule is overloaded or unhealthy
- **📱 Mobile Optimized**: Fully responsive design for desktop, tablet, and mobile

### Advanced Features
- **📥 Import/Export**: 
  - Export as JSON, CSV, or iCalendar (.ics) format
  - Print schedule as PDF
  - Create shareable links (30-day expiration)
  - Copy schedule to clipboard
  
- **🔗 Google Calendar Integration**: Connect your Google Calendar to import events
- **⏱️ Pomodoro Timer**: Built-in focus timer for study sessions
- **📈 Daily Summary**: Track completed tasks and remaining workload
- **🎨 Color-Coded Events**: Visual distinction between classes and tasks by category

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Framer Motion** for animations
- **Lucide Icons** for iconography

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **OpenAI Integration** for AI features
- **Multer** for file uploads
- **Replit Auth** for authentication

### Deployment
- **Vite** for frontend bundling
- **esbuild** for backend bundling
- **Replit** hosting platform

## 📦 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd aischeduler
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=your_postgres_connection_string

# AI Integration
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_api_key
AI_INTEGRATIONS_OPENAI_BASE_URL=your_openai_base_url

# Google Calendar (Optional)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Server
BASE_URL=http://localhost:5000
NODE_ENV=development
```

### 4. Database Setup
```bash
npm run db:push
```

This creates the required database schema:
- `users` - User accounts
- `sessions` - Session management
- `classEntries` - Uploaded class schedules
- `tasks` - User tasks
- `scheduledBlocks` - AI-generated schedule placements
- `userSettings` - User preferences
- `googleTokens` - Google Calendar OAuth tokens

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run check
```

## 📖 API Endpoints

### Schedule Management
- `GET/POST /api/classes` - Manage class entries
- `POST /api/classes/bulk` - Bulk create classes
- `GET/POST/PATCH/DELETE /api/tasks` - Task CRUD operations
- `GET/PATCH /api/scheduled-blocks` - Manage scheduled time blocks

### AI Features
- `POST /api/schedule/extract` - OCR image extraction
- `POST /api/schedule/generate` - Generate optimal schedule
- `POST /api/schedule/study-plan-options` - Generate 3 study plan options
- `POST /api/chat/task` - Natural language task creation
- `POST /api/transcribe` - Audio transcription

### Export & Sharing
- `POST /api/export/json` - Export as JSON
- `POST /api/export/csv` - Export as CSV
- `POST /api/export/pdf` - Generate PDF
- `POST /api/export/share` - Create shareable link
- `GET /api/share/:shareId` - View shared schedule

### Settings
- `GET/PUT /api/settings` - User preferences
- `GET /api/schedule/health` - Schedule health check

### Google Calendar
- `GET /api/auth/google` - OAuth authorization URL
- `GET /api/auth/google/callback` - OAuth callback handler
- `GET /api/google-calendar/status` - Connection status
- `GET /api/google-calendar/calendars` - List calendars
- `POST /api/google-calendar/import` - Import events
- `POST /api/google-calendar/disconnect` - Disconnect account

## 📋 Project Structure

```
├── client/
│   └── src/
│       ├── components/           # React components
│       │   ├── Dashboard.tsx      # Main dashboard
│       │   ├── WeeklyCalendar.tsx # Schedule grid
│       │   ├── ScheduleUpload.tsx # Image upload
│       │   ├── TaskPanel.tsx      # Task management
│       │   ├── ScheduleExportPanel.tsx # Export options
│       │   ├── AppSidebar.tsx     # Navigation
│       │   ├── SettingsPanel.tsx  # User settings
│       │   ├── StudyPlanPanel.tsx # AI planning
│       │   └── ui/                # Shadcn UI primitives
│       ├── hooks/                 # Custom React hooks
│       ├── lib/                   # Utilities
│       │   ├── scheduleExport.ts  # Export utilities
│       │   └── queryClient.ts     # API client
│       └── pages/                 # Route pages
│
├── server/
│   ├── index.ts                   # Main server file
│   ├── routes.ts                  # API endpoints
│   ├── transcription.ts           # Audio transcription
│   ├── export.ts                  # Export endpoints
│   ├── db.ts                      # Database connection
│   └── openai.ts                  # AI integration
│
├── shared/
│   └── schema.ts                  # Drizzle schemas & types
│
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
└── vite.config.ts                 # Vite config
```

## 🎓 Usage Guide

### 1. Upload Your Schedule
1. Navigate to "Upload Schedule"
2. Take a photo of your class schedule or upload an image
3. AI extracts classes automatically
4. Review and confirm the extracted information

### 2. Add Tasks
1. Go to "Tasks" page
2. Click "Add Task" or use the AI Chat
3. Fill in task details (name, duration, deadline, priority, category)
4. Toggle "Repeat Weekly" for recurring tasks

### 3. AI Scheduling
1. Go to "Study Plan"
2. Review your classes and tasks
3. Click "Generate Study Plans"
4. Choose between Conservative, Balanced, or Intensive plans
5. Apply your preferred plan

### 4. Manage Your Schedule
1. View schedule in "Weekly Schedule"
2. Drag-and-drop tasks to reschedule
3. Click events for details
4. Modify or delete as needed

### 5. Use Voice Commands
1. Click the microphone icon in the chat
2. Speak naturally: "Add a 1-hour workout tomorrow at 6 AM"
3. AI creates and schedules the task automatically

### 6. Export & Share
1. Click "Export Schedule"
2. Choose format: JSON, CSV, Calendar (.ics), or PDF
3. Or create a shareable link (valid for 30 days)

## 🔐 Authentication

Uses **Replit Auth (OpenID Connect)**:
- Secure login via Replit
- Session-based authentication
- Encrypted session storage
- Auto-logout after inactivity

## 🧠 AI Integration

### OpenAI Integration
- **OCR**: Extracts text and data from uploaded images
- **Natural Language Processing**: Understands task creation commands
- **Schedule Generation**: Intelligently places tasks in available time slots
- **Study Plan Options**: Generates multiple scheduling strategies

### Features
- Respects sleep schedules (user-configurable)
- Prevents overloading (health checks)
- Prioritizes by deadline and importance
- Suggests optimal break times
- Splits long tasks into manageable chunks

## 📱 Mobile Optimization

- **Responsive Layout**: Adapts to all screen sizes
- **Touch-Friendly**: Large buttons and controls for mobile
- **Offline Support**: Works without internet connection (localStorage)
- **Native Feel**: Smooth animations and transitions

## ⚙️ Configuration

### User Settings
- **Sleep Schedule**: Configure your sleep hours (default: 11 PM - 7 AM)
- **Break Duration**: Set preferred break length (default: 15 mins)
- **Max Work Hours**: Daily work limit (default: 8 hours)
- **Break Frequency**: How often to take breaks

### Schedule Preferences
- **Lunch Time**: Automatically blocked (12 PM - 1 PM)
- **Dinner Time**: Automatically blocked (5:30 PM - 7 PM)
- **Study Hall**: Ideal for homework and tasks
- **No Late Night**: Tasks won't schedule after 9:30 PM

## 🔄 Workflow

1. **Upload** → Extract your class schedule via OCR
2. **Create** → Add tasks manually or via voice/chat
3. **Generate** → AI creates optimal schedule
4. **Manage** → Drag-drop to reschedule as needed
5. **Export** → Share or save your schedule

## 🚨 Common Issues

### Microphone Access Denied
- Check browser permissions
- Allow microphone access when prompted
- Ensure HTTPS is enabled (required for getUserMedia)

### OCR Not Working
- Ensure image is clear and readable
- Try different lighting/angles
- Verify API key is configured

### Import from Google Calendar
- Check OAuth credentials
- Authorize access when prompted
- Calendar must be shared with your Google account

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing discussions
- Email support@smartschedule.com

---

**SmartSchedule** - Making scheduling smart and simple. Built with ❤️ for students, professionals, and everyone in between.
