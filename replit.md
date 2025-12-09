# SmartSchedule - AI-Powered Personal Scheduling

## Overview
SmartSchedule is a full-stack web application that automatically generates personalized, healthy daily and weekly schedules. Users can upload their class schedule as an image (OCR extraction), add tasks with deadlines and priorities, and let AI intelligently schedule everything into available time slots.

**Multi-user Support**: Each user has their own private schedule. User data is isolated - one user's changes never affect another user's schedule.

## Tech Stack
- **Frontend**: React + TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect) for secure user login
- **AI**: Replit AI Integrations (OpenAI-compatible) for schedule OCR and intelligent task placement
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state

## Project Structure
```
├── client/src/
│   ├── components/         # Reusable UI components
│   │   ├── AppSidebar.tsx  # Navigation sidebar
│   │   ├── Dashboard.tsx   # Main dashboard view
│   │   ├── ScheduleUpload.tsx  # Image upload with OCR
│   │   ├── TaskPanel.tsx   # Task CRUD management
│   │   ├── WeeklyCalendar.tsx  # Interactive calendar
│   │   ├── StudyPlanPanel.tsx  # AI study plan generator
│   │   ├── SettingsPanel.tsx   # User preferences
│   │   ├── ThemeProvider.tsx   # Dark/light mode
│   │   └── ui/             # Shadcn UI primitives
│   ├── pages/              # Route pages
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utilities
├── server/
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   ├── openai.ts           # AI integration (OCR, scheduling, study plans)
│   └── db.ts               # Database connection
└── shared/
    └── schema.ts           # Drizzle schemas & types
```

## Key Features
1. **Schedule Upload**: Drag-and-drop image upload with AI-powered OCR extraction
2. **Recurring Weekly Classes**: Uploaded classes automatically repeat every week
3. **Task Management**: Create, edit, delete tasks with priority, category, duration, deadline
4. **One-off or Repeating Tasks**: Toggle between one-time tasks and recurring weekly tasks with day-of-week selection
5. **AI Chat Assistant**: Dedicated AI chat page in sidebar navigation for natural language task creation - type prompts like "I need to shower everyday between 6pm and 10pm" and the AI creates appropriate tasks with common-sense scheduling
6. **AI Scheduling**: Intelligent task placement respecting sleep hours, breaks, workload
7. **AI Study Plan with Multiple Options**: Generate 3 distinct study plans (Conservative, Balanced, Intensive) that avoid conflicts with existing classes and tasks (except Study Hall which is available work time)
8. **Calendar with Daily/Weekly View Toggle**: Switch between week grid view and focused daily list view
9. **Interactive Calendar**: Drag-and-drop task rescheduling, click for event details
10. **Settings**: Configure sleep hours, break duration, max work hours
11. **Health Warnings**: Alerts when schedule is overloaded
12. **Event Details Dialog**: Click any class or task on the calendar to see full details
13. **Google Calendar Integration**: Connect via OAuth from sidebar - directly sign in to Google and import calendar events

## Key Behaviors
- **Classes repeat weekly**: When you upload a class schedule for one week, those classes appear on every week's calendar view
- **Tasks can be one-off or repeating**: One-off tasks are scheduled for specific dates; repeating tasks recur on selected days of the week (Mon, Wed, Fri, etc.)

## Scheduling Preferences (User-Specific)
- **Deadlines are strict**: All tasks must be completed BEFORE their deadline date
- **Lunch time blocked**: 12:00 PM - 1:00 PM is blocked for lunch (12:00-13:00)
- **Dinner time blocked**: 5:30 PM - 7:00 PM is blocked for dinner (17:30-19:00)
- **Study Hall is work time**: "Study Hall" periods are ideal for completing homework and assignments
- **Sleep schedule respected**: No tasks scheduled during sleep hours
- **No late-night studying**: Sessions won't be scheduled past 9:30 PM (21:30)
- **Prioritization order**: Deadline proximity > Priority level > Duration

## API Endpoints
- `GET/POST /api/classes` - Class schedule management
- `POST /api/classes/bulk` - Bulk create classes
- `GET/POST/PATCH/DELETE /api/tasks` - Task CRUD
- `GET/PATCH /api/scheduled-blocks` - Scheduled time blocks
- `POST /api/schedule/extract` - OCR image extraction
- `POST /api/schedule/generate` - AI schedule generation
- `POST /api/schedule/study-plan` - AI study plan generation (legacy)
- `POST /api/schedule/study-plan-options` - Generate 3 study plan options
- `POST /api/schedule/apply-plan-option` - Apply selected plan to schedule
- `GET /api/schedule/health` - Schedule health check
- `GET/PUT /api/settings` - User settings
- `POST /api/chat/task` - AI natural language task creation
- `GET /api/auth/google` - Get Google OAuth authorization URL
- `GET /api/auth/google/callback` - Handle OAuth callback
- `GET /api/google-calendar/status` - Check Google Calendar connection status
- `GET /api/google-calendar/calendars` - List available calendars
- `POST /api/google-calendar/import` - Import events from Google Calendar
- `POST /api/google-calendar/disconnect` - Disconnect Google Calendar

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `AI_INTEGRATIONS_OPENAI_API_KEY` - Replit AI Integrations (auto-configured)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - Replit AI Integrations base URL (auto-configured)

## Google Calendar Integration
The app uses custom OAuth 2.0 for per-user Google Calendar authentication.
- Each user connects their own Google account (not shared)
- Requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables
- OAuth redirect URI auto-detects Replit deployment URL or defaults to localhost:5000/api/auth/google/callback
- Tokens stored per-user in google_tokens table with automatic refresh
- Connect from sidebar footer or Upload Schedule page

## Running the Application
The application runs on port 5000 with `npm run dev`. The frontend and backend are served together via Vite middleware.

## Database Schema
- **sessions** - Session storage for Replit Auth (required for authentication)
- **users** - User accounts with Replit Auth (id, email, firstName, lastName, profileImageUrl)
- **classEntries** - Class schedule entries (name, day, time, location) - recurring weekly, per-user
- **tasks** - Tasks to schedule (name, duration, deadline, priority, category) - one-time, per-user
- **scheduledBlocks** - AI-generated time block placements with scheduledDate for specific dates, per-user
- **userSettings** - User preferences (sleep hours, breaks, etc.) - per-user
- **googleTokens** - Google OAuth tokens for calendar integration (access token, refresh token, expiry) - per-user

## Authentication
- Uses Replit Auth (OpenID Connect) for secure authentication
- Users log in via /api/login, redirected to Replit's OAuth flow
- Sessions stored in PostgreSQL (sessions table)
- Each user's data is isolated - classes, tasks, scheduled blocks, settings all have userId foreign key
- Frontend uses useAuth hook to check authentication status
