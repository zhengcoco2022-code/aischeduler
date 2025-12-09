# SmartSchedule - Quick Start

## 🚀 Get Up and Running in 5 Minutes

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git
- PostgreSQL (or Replit DB)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/aischeduler.git
cd aischeduler

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 4. Initialize database
npm run db:push

# 5. Start development server
npm run dev
```

The app runs on `http://localhost:5000`

---

## 📱 Key Features Overview

### Core Scheduling
- ✅ Upload class schedule (OCR extraction)
- ✅ Add tasks manually or via AI chat
- ✅ AI-powered intelligent scheduling
- ✅ Drag-and-drop calendar editor
- ✅ Color-coded events by category

### AI Capabilities
- 🤖 Natural language task creation
- 🎙️ Voice recording and transcription
- 📸 Image OCR for schedule extraction
- 🧠 Intelligent schedule generation
- 💡 Study plan suggestions (3 options)

### Import/Export
- 📥 Import: Images, Google Calendar, CSV, JSON
- 📤 Export: JSON, CSV, iCalendar (.ics), PDF
- 🔗 Create shareable links (30-day expiry)
- 💾 Local storage backup & offline support

### User Experience
- 📱 Fully responsive mobile design
- 🌙 Dark/light theme support
- ⚡ Fast and lightweight
- 🔐 Private and secure (no login required option)

---

## 🎯 Workflow Example

### 1. Upload Your Schedule (5 min)
```
Homepage → Upload Schedule → Take Photo → Review → Confirm
```

### 2. Add Some Tasks (2 min)
```
Go to Tasks → Click "Add Task" → Enter Details → Create
OR
Go to AI Assistant → Say "I need to study for 2 hours" → Confirm
```

### 3. Generate Optimal Schedule (1 min)
```
Go to Study Plan → Click "Generate Plans" → Choose Option → Apply
```

### 4. View & Manage (Ongoing)
```
Weekly Schedule → Drag tasks to reschedule → Make changes as needed
```

### 5. Export & Share (Optional)
```
Export Schedule → Choose Format → Share Link or Download
```

---

## 🎓 Real-World Examples

### Example 1: College Student
**Scenario**: Busy college student with 15 hours of classes, 3 assignments due next week

1. Upload class schedule image
2. In AI chat: "I have 3 assignments due: Math due Friday (8 hours), Physics due Wednesday (6 hours), Essays due Monday (4 hours)"
3. AI creates tasks and schedules them
4. Generate 3 study plans
5. Pick the "Balanced" plan
6. Calendar shows: Monday (essays), Tuesday-Wed (physics), Thursday-Friday (math)
7. Each day has 2-3 hour study blocks with breaks
8. Export as calendar (.ics) to sync with phone

### Example 2: Working Professional
**Scenario**: Work 9-5, want to learn a new skill

1. Upload work calendar
2. Add task: "Learn React, 1 hour, 3x per week, Medium priority"
3. Add task: "Side project, 2 hours, 1x per week, High priority"
4. Set sleep: 11 PM - 7 AM
5. Set max work: 10 hours/day
6. Generate plan
7. AI schedules: 
   - React: Mon, Wed, Fri 6-7 PM
   - Side project: Saturday 9 AM - 11 AM
8. Share link with accountability partner

### Example 3: High School Student
**Scenario**: Prep for final exams, manage homework

1. Voice command: "I have finals in Math, Science, English, History coming up"
2. Add for each: "Study for 3 hours, deadline [exam date], High priority"
3. AI generates plan spreading study across available time
4. Calendar shows: 2-3 hour study blocks each afternoon
5. Breaks and meals blocked automatically
6. Export PDF to print and post on wall
7. Check off completed study sessions

---

## 🔧 Configuration

### For First-Time Users

**Step 1: Set Sleep Schedule**
```
Settings → Sleep Start: 11:00 PM
Settings → Sleep End: 7:00 AM
```

**Step 2: Set Work Preferences**
```
Settings → Max Daily Work: 8 hours
Settings → Break Duration: 15 minutes
```

**Step 3: Configure Blocked Times**
```
Settings → Lunch: 12:00 PM - 1:00 PM (pre-set)
Settings → Dinner: 5:30 PM - 7:00 PM (pre-set)
```

### For Developers

**Environment Variables** (.env):
```env
# Database
DATABASE_URL=postgresql://user:password@localhost/smartschedule

# AI API
AI_INTEGRATIONS_OPENAI_API_KEY=sk-...
AI_INTEGRATIONS_OPENAI_BASE_URL=https://...

# Google Calendar (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Server
BASE_URL=http://localhost:5000
NODE_ENV=development
```

**Build & Deploy**:
```bash
npm run build      # Production build
npm start          # Run production build
npm run db:push    # Migrate database
npm run check      # Type checking
```

---

## 📊 File Structure

```
aischeduler/
├── client/src/
│   ├── components/          # React UI components
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   │   ├── scheduleExport.ts
│   │   └── localStorageSync.ts
│   └── pages/               # Routes
│
├── server/
│   ├── index.ts             # Main server
│   ├── transcription.ts     # Audio API
│   ├── export.ts            # Export API
│   ├── openai.ts            # AI logic
│   └── routes.ts            # API endpoints
│
├── README.md                # Full documentation
├── GUIDE.md                 # Comprehensive guide
└── QUICKSTART.md            # This file
```

---

## 🎨 UI/UX Overview

### Landing Page
- Hero section with call-to-action
- 6 feature cards explaining capabilities
- 4-step workflow explanation
- Privacy/security notice
- Footer with links

### Dashboard
- Quick stats (tasks, schedule health)
- Today's schedule view
- Upcoming deadlines
- Quick action buttons

### Pages
1. **Upload Schedule** - Image OCR extraction
2. **Weekly Schedule** - Interactive calendar grid
3. **Tasks** - CRUD management panel
4. **AI Assistant** - Chat interface with voice
5. **Study Plan** - Plan generator with options
6. **Settings** - User preferences
7. **Export** - Multiple format options

---

## 💡 Pro Tips

### Scheduling
- Create tasks ASAP (even before knowing due date)
- Use descriptive names ("Chapter 5 reading" not "homework")
- Set priorities honestly (don't make everything "urgent")
- Review schedule weekly and adjust

### AI Chat
- Be natural and conversational
- Include context: "I have a exam Wednesday"
- Use familiar phrases: "after my Biology class", "on weekends"
- Correct AI if it misunderstands

### Voice Input
- Speak clearly at normal pace
- Minimize background noise
- Complete full sentence before stopping
- Use the microphone in quiet locations

### Sharing
- Share read-only links for accountability
- Export before major schedule changes
- Keep backups of important schedules
- Test imported schedules before relying on them

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Check Node version
node --version  # Should be 16+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check database connection
npm run db:push

# Start with debug mode
NODE_DEBUG=* npm run dev
```

### Microphone Issues
- Check browser permissions
- Allow microphone for this site
- Test microphone works (system settings)
- Try different browser
- Restart computer if needed

### Schedule Import Failing
- Check image quality (clear, well-lit, readable)
- Ensure table structure is clear
- Try different image orientation
- Make sure text is not blurry

### Changes Not Saving
- Check internet connection
- Look for error messages
- Try refreshing page
- Check browser console (F12)
- Try exporting/importing data

---

## 📞 Support

### Get Help
- Check GUIDE.md for detailed documentation
- Search GitHub issues
- Email: support@smartschedule.com
- Discord community server

### Report Issues
- Include error message
- Describe what you were doing
- Attach screenshots if relevant
- Mention browser/OS version

### Feature Requests
- Describe desired feature
- Explain use case
- Suggest implementation
- Vote on existing requests

---

## 🚀 What's Next?

1. **Use the App** - Start with your real schedule
2. **Explore Features** - Try voice, export, sharing
3. **Customize Settings** - Adjust to your rhythm
4. **Get Feedback** - Share with friends
5. **Report Issues** - Help improve the app

---

## 📚 Additional Resources

- **Full Guide**: See [GUIDE.md](./GUIDE.md)
- **Architecture**: See [replit.md](./replit.md)
- **API Docs**: See [README.md](./README.md)
- **Design System**: See [design_guidelines.md](./design_guidelines.md)

---

**Happy scheduling! 🎉**

*SmartSchedule - Making your schedule work for you.*
