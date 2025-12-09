# SmartSchedule - Complete User & Developer Guide

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [User Guide](#user-guide)
3. [AI Features](#ai-features)
4. [Voice Commands](#voice-commands)
5. [Export & Sharing](#export--sharing)
6. [Developer Guide](#developer-guide)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First-Time Setup

1. **Sign In**
   - Click "Sign In" on the landing page
   - Authenticate via your preferred method
   - You'll be taken to the dashboard

2. **Add Your Schedule**
   - Go to "Upload Schedule"
   - Upload a photo of your class schedule
   - AI extracts classes automatically
   - Review and confirm the extracted data

3. **Configure Settings**
   - Go to "Settings"
   - Set your sleep hours (default: 11 PM - 7 AM)
   - Configure break duration (default: 15 mins)
   - Set max work hours (default: 8 hours)

4. **Add Tasks**
   - Go to "Tasks"
   - Click "Add Task" to create manually
   - Or use the AI Chat to create naturally

---

## User Guide

### Dashboard Overview

The dashboard shows:
- **Weekly Calendar**: Visual overview of your schedule
- **Today's Tasks**: What's due today
- **Upcoming Deadlines**: Next week's important dates
- **Schedule Health**: Whether your schedule is healthy
- **Quick Actions**: Upload, add task, generate plan

### Managing Your Schedule

#### Uploading a Schedule

1. Click "Upload Schedule"
2. Take a clear photo of your timetable
3. Make sure:
   - All columns (days) are visible
   - All rows (time slots) are visible
   - Text is readable
   - Image is well-lit

4. AI extracts:
   - Class names
   - Days of week
   - Start and end times
   - Location (optional)

5. Review the extracted data
6. Edit any incorrect entries
7. Click "Confirm" to save

#### Creating Tasks

**Method 1: Manual Creation**
1. Go to "Tasks" → "Add Task"
2. Fill in details:
   - Task name (required)
   - Duration (in minutes)
   - Deadline (date)
   - Priority (Low/Medium/High/Urgent)
   - Category (School/Workout/Personal/Health/Other)
   - Recurring (toggle to repeat weekly)
   - Days (if recurring)
3. Click "Create Task"

**Method 2: AI Chat**
1. Go to "AI Assistant"
2. Type or speak naturally:
   - "I need to study for 2 hours tomorrow"
   - "Add a 30-minute workout every Monday and Friday"
   - "I have a meeting Friday at 2 PM for 1 hour"
3. AI understands context and creates the task
4. Review the suggestion
5. Click "Confirm" or adjust

**Method 3: Voice Commands**
1. In the chat or add task dialog
2. Click the microphone icon
3. Speak your command naturally
4. AI transcribes and creates the task

#### Viewing & Editing Schedule

**Weekly View**
- Click "Weekly Schedule"
- See all classes and tasks for the week
- Time slots from 6 AM to 11 PM
- Color-coded by category

**Daily View**
- Click a specific day
- See detailed breakdown of that day
- View breaks and free time
- Edit individual events

**Event Details**
- Click any event on the calendar
- See full details:
  - Time
  - Duration
  - Category
  - Description
  - Assigned deadlines
- Edit or delete from this view

#### Rescheduling Tasks

1. Click and drag a task on the calendar
2. Drop it on a new time slot
3. Confirm the change
4. If conflict detected:
   - View conflicting events
   - Choose to override or cancel
   - AI suggests alternative times

### Generating Optimal Schedules

1. Go to "Study Plan"
2. Review your current schedule
3. Click "Generate Study Plans"
4. AI generates 3 options:
   - **Conservative**: Fewer hours, more breaks, less stress
   - **Balanced**: Moderate workload, reasonable pace
   - **Intensive**: More work, fewer breaks, faster completion
5. Review each plan's details
6. Select your preferred plan
7. Click "Apply Plan"

Your schedule is now optimized based on your choice!

### Managing Settings

#### Sleep & Rest
- **Sleep Start**: When you sleep (default: 11 PM)
- **Sleep End**: When you wake (default: 7 AM)
- **Break Duration**: Minutes between tasks (default: 15)

#### Scheduling Constraints
- **Max Daily Work**: Maximum hours per day (default: 8)
- **Lunch Time**: Blocked time (12 PM - 1 PM)
- **Dinner Time**: Blocked time (5:30 PM - 7 PM)
- **No Late Night**: Tasks won't schedule after (default: 9:30 PM)

#### Preferences
- **Theme**: Light/Dark mode
- **Notifications**: Email/push notifications
- **Default Duration**: For new tasks (default: 60 mins)

---

## AI Features

### Smart OCR (Optical Character Recognition)

**What It Does:**
- Extracts text from schedule images
- Recognizes tables and grids
- Parses time formats
- Identifies day names

**Tips for Best Results:**
1. Use clear, well-lit photos
2. Ensure text is readable
3. Include all columns and rows
4. Avoid shadows or glare
5. Use landscape orientation

**Extracted Data:**
- Class name
- Days (Mon, Tue, Wed, etc.)
- Start time (24-hour format)
- End time
- Location (if available)

### Natural Language Understanding

**What It Does:**
- Understands task descriptions in plain English
- Recognizes time references:
  - "tomorrow", "next Monday", "in 2 weeks"
  - "6 AM", "after class", "before lunch"
- Infers task properties:
  - Duration from context
  - Priority from keywords
  - Category from task type

**Examples:**
- "I need to study math for 2 hours before Friday"
  - Creates: Math study, 2 hours, deadline Friday, High priority
  
- "Workout every Monday and Friday at 6 AM for 45 minutes"
  - Creates: Workout, 45 mins, recurring Mon/Fri, 6 AM

- "Quick 15-minute meditation tomorrow morning"
  - Creates: Meditation, 15 mins, tomorrow, morning slot

### Schedule Generation Algorithm

The AI considers:
1. **Existing Commitments**: Classes and fixed events
2. **Available Slots**: Free time blocks
3. **Task Deadlines**: Urgency and time sensitivity
4. **Task Priority**: User-assigned importance
5. **Task Duration**: How long each task takes
6. **Work Limits**: Maximum hours per day
7. **Rest Periods**: Sleep, lunch, dinner, breaks
8. **Feasibility**: Can the task fit?

**Scheduling Strategy:**
1. Sort tasks by deadline proximity
2. Sort by priority within deadlines
3. Find earliest available slots
4. Check if slot is large enough
5. Check for conflicts
6. Schedule task
7. Add break afterward
8. Verify health constraints

---

## Voice Commands

### Enabling Voice Input

1. **In Chat:**
   - Click the microphone icon
   - Start speaking
   - Click stop when done
   - AI transcribes and understands

2. **In Task Creation:**
   - Click "Add Task"
   - Click microphone icon
   - Describe your task
   - AI creates from voice input

3. **Browser Requirements:**
   - Must allow microphone access
   - HTTPS required (for security)
   - Works on modern browsers:
     - Chrome/Chromium 25+
     - Firefox 25+
     - Safari 14.1+
     - Edge 79+

### Voice Command Examples

**Task Creation**
- "Add a 2-hour study session for chemistry tomorrow"
- "Schedule a 30-minute workout every morning at 6"
- "I have a dentist appointment Friday at 3 PM"

**Schedule Modification**
- "Move my math homework to Monday afternoon"
- "Add a break after my 2 PM class"
- "Delete the fitness task from Wednesday"

**Queries**
- "What do I have on Tuesday?"
- "When's my next free time?"
- "Show me my schedule for next week"

**Troubleshooting**
- If transcription fails:
  - Check microphone is connected
  - Reduce background noise
  - Speak clearly and slowly
  - Try again in a quieter environment

---

## Export & Sharing

### Export Formats

#### JSON Export
- **Use Case**: Backup, import into other tools
- **Contains**: Full schedule data
- **File Size**: Small (~1-5 KB)
- **Steps**:
  1. Click "Export Schedule"
  2. Select "Export as JSON"
  3. File downloads to your computer
  4. Can import back later

#### CSV Export
- **Use Case**: Open in Excel/Sheets
- **Contains**: Events with time and category
- **File Size**: Very small
- **Steps**:
  1. Click "Export Schedule"
  2. Select "Export as CSV"
  3. Opens in spreadsheet app
  4. Can edit and re-upload

#### iCalendar (.ics)
- **Use Case**: Import into Google Calendar, Outlook, Apple Calendar
- **Contains**: Events in standard format
- **File Size**: Small
- **Steps**:
  1. Click "Export Schedule"
  2. Select "Export to Calendar"
  3. File downloads
  4. Import into your calendar app
  5. Syncs automatically

#### PDF Print
- **Use Case**: Print or save as PDF
- **Contains**: Formatted schedule table
- **File Size**: Varies (1-5 MB)
- **Steps**:
  1. Click "Export Schedule"
  2. Select "Print as PDF"
  3. Print dialog opens
  4. Select "Save as PDF"
  5. Choose location and save

### Creating Shareable Links

1. Click "Export Schedule"
2. Click "Create Shareable Link"
3. AI generates unique URL
4. Link valid for 30 days
5. Share link with others
6. Recipients view (no login needed)

**Limitations:**
- Read-only access
- No editing by recipients
- Expires after 30 days
- Can revoke anytime

### Copying Schedule

1. Click "Export Schedule"
2. Click "Copy to Clipboard"
3. Paste into email, chat, document
4. Plain text format
5. Human-readable list

---

## Developer Guide

### API Integration

#### Task Management
```javascript
// Create a task
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Study Physics',
    duration: 120,
    deadline: '2024-12-15',
    priority: 'high',
    category: 'school',
    isRecurring: true,
    repeatDays: [1, 3, 5] // Monday, Wednesday, Friday
  })
});
```

#### Schedule Generation
```javascript
// Generate optimal schedule
const response = await fetch('/api/schedule/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tasks: [/* task array */],
    classes: [/* class array */],
    settings: {/* user settings */}
  })
});
```

#### OCR Extraction
```javascript
// Extract schedule from image
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('/api/schedule/extract', {
  method: 'POST',
  body: formData
});
```

#### Voice Transcription
```javascript
// Transcribe audio
const formData = new FormData();
formData.append('audio', audioBlob);

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.text); // Transcribed text
```

### Offline Storage

```javascript
import {
  saveScheduleLocal,
  loadScheduleLocal,
  syncOfflineChanges,
  createBackup
} from '@/lib/localStorageSync';

// Save schedule locally
saveScheduleLocal(schedule);

// Load from cache
const cached = loadScheduleLocal();

// Sync when online
if (navigator.onLine) {
  syncOfflineChanges();
}

// Backup data
const backup = createBackup();
```

### Component Usage

```jsx
import { ScheduleExport } from '@/components/ScheduleExportPanel';

export function MyComponent() {
  const schedule = {
    title: "My Schedule",
    events: [/* events */]
  };

  return (
    <ScheduleExport 
      schedule={schedule}
      title="Weekly Schedule"
      onSuccess={() => alert('Exported!')}
    />
  );
}
```

### Custom Hooks

```javascript
// Use authentication
import { useAuth } from '@/hooks/useAuth';
const { user, isLoggedIn } = useAuth();

// Use tasks query
import { useTasks } from '@/hooks/useTasks';
const { tasks, addTask, updateTask } = useTasks();
```

### Database Schema

#### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT, -- minutes
  deadline DATE,
  priority VARCHAR(20), -- low, medium, high, urgent
  category VARCHAR(50),
  isRecurring BOOLEAN DEFAULT false,
  repeatDays INT[], -- 0-6, Sunday=0
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

#### Scheduled Blocks
```sql
CREATE TABLE scheduledBlocks (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  taskId UUID REFERENCES tasks(id),
  startTime TIMESTAMP NOT NULL,
  endTime TIMESTAMP NOT NULL,
  scheduledDate DATE NOT NULL,
  createdAt TIMESTAMP
);
```

---

## Troubleshooting

### Common Issues

#### Microphone Not Working
**Problem**: Can't record voice input

**Solution**:
1. Check if browser has permission
   - Go to browser settings → Privacy
   - Find SmartSchedule site
   - Set Microphone to "Allow"
2. Restart browser
3. Try different browser
4. Check if microphone is connected
5. Reduce background noise

#### OCR Not Recognizing Schedule
**Problem**: Image upload fails or extracts wrong data

**Solutions**:
1. **Image quality**:
   - Use clear, bright photo
   - Avoid shadows and glare
   - Use landscape orientation
   - Zoom in to fill frame

2. **Image content**:
   - Ensure all days visible
   - Ensure all times visible
   - Text must be readable
   - Clear table structure

3. **File format**:
   - Use JPG or PNG
   - Keep file under 25 MB
   - Try different image source

#### Schedule Conflicts
**Problem**: Tasks overlap or conflict

**Solutions**:
1. Click on conflicting event
2. Choose new time slot
3. Or delete one task
4. Click "Regenerate" to auto-fix
5. Or manually drag to new time

#### Google Calendar Not Syncing
**Problem**: Calendar import fails

**Solutions**:
1. Check Google account is authorized
2. Click "Reconnect" in settings
3. Ensure calendar is shared with account
4. Check internet connection
5. Try importing specific events

#### Schedule Feels Overloaded
**Problem**: Warning about too much work

**Solutions**:
1. Extend task deadlines
2. Reduce task priorities
3. Increase daily work limit in settings
4. Move some tasks to later dates
5. Generate Conservative plan instead

#### Data Lost After Closing Browser
**Problem**: Changes not saved

**Solutions**:
1. Check if synced to account
2. Reload page to check
3. Check browser auto-save settings
4. Enable auto-sync in settings
5. Manually export before closing

---

## Tips & Best Practices

### Scheduling Tips
- Add tasks as soon as you know about them
- Set realistic deadlines
- Use "Urgent" only when necessary
- Group similar tasks together
- Allow buffer time between tasks

### Voice Input Tips
- Speak clearly and at normal pace
- Minimize background noise
- Use complete sentences
- Include time references
- Be specific about dates

### Export Tips
- Backup weekly to cloud storage
- Export before major changes
- Test imported files
- Keep copies in multiple formats
- Share read-only links

### Performance Tips
- Clear old completed tasks monthly
- Archive old schedules
- Disable unused notifications
- Keep browser cache cleared
- Update to latest version

---

## Support & Contact

- **Email**: support@smartschedule.com
- **GitHub Issues**: Report bugs or feature requests
- **Discord**: Community support server
- **Documentation**: Full API docs available

---

**Last Updated**: December 2024
**Version**: 1.0.0
