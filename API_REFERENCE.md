# SmartSchedule - API Reference

## Base URL
```
http://localhost:5000  (development)
https://your-app.replit.dev  (production)
```

## Authentication
Most endpoints require user authentication via Replit Auth (OpenID Connect).

---

## Schedule Management APIs

### Upload & Extract Schedule

#### Extract Schedule from Image (OCR)
```http
POST /api/schedule/extract
Content-Type: multipart/form-data

Body:
  image: File (JPEG, PNG, max 25MB)

Response:
{
  "success": true,
  "classes": [
    {
      "name": "Math",
      "days": ["Monday", "Wednesday", "Friday"],
      "startTime": "09:00",
      "endTime": "10:30",
      "location": "Room 101"
    },
    ...
  ]
}
```

### Class Management

#### Get All Classes
```http
GET /api/classes

Response:
[
  {
    "id": "uuid",
    "name": "Biology",
    "days": [1, 3], // 0=Sunday, 1=Monday, etc.
    "startTime": "14:00",
    "endTime": "15:30",
    "location": "Lab A",
    "userId": "uuid",
    "createdAt": "2024-01-01T10:00:00Z"
  },
  ...
]
```

#### Create Class
```http
POST /api/classes
Content-Type: application/json

Body:
{
  "name": "Chemistry",
  "days": [1, 3, 5],
  "startTime": "10:00",
  "endTime": "11:30",
  "location": "Room 205"
}

Response:
{
  "id": "uuid",
  "name": "Chemistry",
  ...
}
```

#### Bulk Create Classes
```http
POST /api/classes/bulk
Content-Type: application/json

Body:
{
  "classes": [
    {
      "name": "Math",
      "days": [1, 3, 5],
      "startTime": "09:00",
      "endTime": "10:30"
    },
    ...
  ]
}

Response:
{
  "success": true,
  "created": 3,
  "classes": [...]
}
```

#### Update Class
```http
PATCH /api/classes/:id
Content-Type: application/json

Body:
{
  "startTime": "10:00",
  "endTime": "11:30"
}

Response:
{ "success": true, "class": {...} }
```

#### Delete Class
```http
DELETE /api/classes/:id

Response:
{ "success": true }
```

---

## Task Management APIs

### CRUD Operations

#### Get All Tasks
```http
GET /api/tasks?status=active&sortBy=deadline

Query Parameters:
  - status: 'active' | 'completed' | 'all'
  - sortBy: 'deadline' | 'priority' | 'created'
  - category: 'school' | 'workout' | 'personal' | 'health' | 'other'

Response:
[
  {
    "id": "uuid",
    "name": "Study for Exam",
    "description": "Chapter 5-7",
    "duration": 120, // minutes
    "deadline": "2024-12-15",
    "priority": "high", // low, medium, high, urgent
    "category": "school",
    "isRecurring": true,
    "repeatDays": [1, 3, 5], // Mon, Wed, Fri
    "status": "active",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-02T10:00:00Z"
  },
  ...
]
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

Body:
{
  "name": "Physics Assignment",
  "description": "Complete problems 1-20",
  "duration": 90,
  "deadline": "2024-12-20",
  "priority": "high",
  "category": "school",
  "isRecurring": false
}

Response:
{
  "id": "uuid",
  "name": "Physics Assignment",
  ...
}
```

#### Get Task Details
```http
GET /api/tasks/:id

Response:
{
  "id": "uuid",
  "name": "Physics Assignment",
  "scheduledBlocks": [
    {
      "id": "uuid",
      "startTime": "2024-12-18T14:00:00Z",
      "endTime": "2024-12-18T15:30:00Z",
      "scheduledDate": "2024-12-18"
    }
  ],
  ...
}
```

#### Update Task
```http
PATCH /api/tasks/:id
Content-Type: application/json

Body:
{
  "priority": "urgent",
  "deadline": "2024-12-18",
  "duration": 120
}

Response:
{ "success": true, "task": {...} }
```

#### Delete Task
```http
DELETE /api/tasks/:id

Response:
{ "success": true }
```

#### Mark Task Complete
```http
PATCH /api/tasks/:id/complete

Response:
{ "success": true, "completedAt": "2024-01-02T15:30:00Z" }
```

---

## Schedule Generation APIs

### Generate Schedule

#### Generate Optimal Schedule
```http
POST /api/schedule/generate
Content-Type: application/json

Body:
{
  "taskIds": ["uuid1", "uuid2", ...],
  "regenerate": false  // true to overwrite existing
}

Response:
{
  "success": true,
  "schedule": {
    "scheduledBlocks": [
      {
        "id": "uuid",
        "taskId": "uuid",
        "startTime": "2024-01-15T14:00:00Z",
        "endTime": "2024-01-15T15:30:00Z",
        "scheduledDate": "2024-01-15"
      },
      ...
    ]
  }
}
```

#### Generate Study Plan Options
```http
POST /api/schedule/study-plan-options
Content-Type: application/json

Body:
{
  "taskIds": ["uuid1", "uuid2", ...]
}

Response:
{
  "success": true,
  "options": [
    {
      "name": "Conservative",
      "description": "Fewer hours, more breaks, less stress",
      "dailyHours": 5,
      "breakMinutes": 20,
      "schedule": [...]
    },
    {
      "name": "Balanced",
      "description": "Moderate workload, reasonable pace",
      "dailyHours": 7,
      "breakMinutes": 15,
      "schedule": [...]
    },
    {
      "name": "Intensive",
      "description": "More work, fewer breaks, faster completion",
      "dailyHours": 9,
      "breakMinutes": 10,
      "schedule": [...]
    }
  ]
}
```

#### Apply Study Plan Option
```http
POST /api/schedule/apply-plan-option
Content-Type: application/json

Body:
{
  "planName": "Balanced"  // "Conservative", "Balanced", or "Intensive"
}

Response:
{
  "success": true,
  "appliedAt": "2024-01-02T16:00:00Z"
}
```

### Schedule Health

#### Check Schedule Health
```http
GET /api/schedule/health

Response:
{
  "healthScore": 75, // 0-100
  "status": "healthy", // healthy, warning, critical
  "warnings": [
    {
      "type": "overload",
      "day": "Monday",
      "message": "8.5 hours of work scheduled"
    }
  ],
  "recommendations": [
    "Consider extending some deadlines",
    "Add more breaks between tasks"
  ]
}
```

### Scheduled Blocks

#### Get Scheduled Blocks
```http
GET /api/scheduled-blocks?startDate=2024-01-01&endDate=2024-01-31

Query Parameters:
  - startDate: ISO date
  - endDate: ISO date
  - taskId: filter by task

Response:
[
  {
    "id": "uuid",
    "taskId": "uuid",
    "taskName": "Study Physics",
    "startTime": "2024-01-15T14:00:00Z",
    "endTime": "2024-01-15T15:30:00Z",
    "scheduledDate": "2024-01-15",
    "duration": 90
  },
  ...
]
```

#### Update Scheduled Block
```http
PATCH /api/scheduled-blocks/:id
Content-Type: application/json

Body:
{
  "startTime": "2024-01-15T15:00:00Z",
  "endTime": "2024-01-15T16:30:00Z"
}

Response:
{ "success": true, "block": {...} }
```

#### Delete Scheduled Block
```http
DELETE /api/scheduled-blocks/:id

Response:
{ "success": true }
```

---

## AI Chat & Voice APIs

### Natural Language Task Creation

#### Chat with AI
```http
POST /api/chat/task
Content-Type: application/json

Body:
{
  "message": "I need to study for 2 hours every evening starting tomorrow"
}

Response:
{
  "success": true,
  "response": "I've created a study task for 2 hours daily...",
  "task": {
    "id": "uuid",
    "name": "Study",
    "duration": 120,
    "isRecurring": true,
    "repeatDays": [1, 2, 3, 4, 5, 6, 0]
  },
  "scheduling": {
    "suggestedTime": "19:00",
    "preferredTimeRange": { "start": "18:00", "end": "21:00" },
    "reasoning": "Evening is ideal for your study tasks based on your schedule"
  }
}
```

### Audio Transcription

#### Transcribe Audio
```http
POST /api/transcribe
Content-Type: multipart/form-data

Body:
  audio: File (WAV, MP3, max 25MB)

Response:
{
  "text": "Add a 30 minute workout every Monday and Friday at 6 AM"
}
```

---

## Export & Sharing APIs

### Export Schedule

#### Export as JSON
```http
POST /api/export/json
Content-Type: application/json

Body:
{
  "schedule": { /* schedule object */ },
  "filename": "my-schedule"
}

Response:
File download (application/json)
```

#### Export as CSV
```http
POST /api/export/csv
Content-Type: application/json

Body:
{
  "events": [ /* events array */ ],
  "filename": "schedule"
}

Response:
File download (text/csv)
```

#### Print as PDF
```http
POST /api/export/pdf
Content-Type: application/json

Body:
{
  "events": [ /* events array */ ],
  "title": "My Schedule",
  "filename": "schedule"
}

Response:
{
  "success": false,
  "message": "PDF export available via Print to PDF in browser"
}
```

### Shareable Links

#### Create Share Link
```http
POST /api/export/share
Content-Type: application/json

Body:
{
  "schedule": { /* schedule object */ },
  "title": "My Weekly Schedule"
}

Response:
{
  "success": true,
  "shareId": "abc123def456",
  "shareLink": "https://smartschedule.com/share/abc123def456",
  "expiresAt": "2024-02-01T16:00:00Z"
}
```

#### Get Shared Schedule
```http
GET /api/share/:shareId

Response:
{
  "title": "My Weekly Schedule",
  "schedule": { /* schedule object */ },
  "createdAt": "2024-01-02T16:00:00Z"
}
```

---

## User Settings APIs

### Get Settings
```http
GET /api/settings

Response:
{
  "sleepStart": "23:00",  // 11 PM
  "sleepEnd": "07:00",    // 7 AM
  "breakDuration": 15,    // minutes
  "maxDailyWork": 8,      // hours
  "lunchTime": "12:00-13:00",
  "dinnerTime": "17:30-19:00",
  "noLateNight": "21:30", // don't schedule after
  "theme": "light",       // light or dark
  "notifications": true
}
```

### Update Settings
```http
PUT /api/settings
Content-Type: application/json

Body:
{
  "sleepStart": "22:30",
  "maxDailyWork": 9,
  "breakDuration": 20
}

Response:
{
  "success": true,
  "settings": { /* updated settings */ }
}
```

---

## Google Calendar Integration APIs

### OAuth Flow

#### Get Google OAuth URL
```http
GET /api/auth/google

Response:
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

#### OAuth Callback
```http
GET /api/auth/google/callback?code=...&state=...

Response:
Redirects to dashboard with stored tokens
```

### Calendar Operations

#### Check Connection Status
```http
GET /api/google-calendar/status

Response:
{
  "connected": true,
  "email": "user@gmail.com",
  "connectedAt": "2024-01-01T10:00:00Z"
}
```

#### List Available Calendars
```http
GET /api/google-calendar/calendars

Response:
{
  "calendars": [
    {
      "id": "primary",
      "name": "Personal",
      "description": "My personal calendar"
    },
    {
      "id": "xyz123",
      "name": "Work",
      "description": "Work calendar"
    }
  ]
}
```

#### Import Events
```http
POST /api/google-calendar/import
Content-Type: application/json

Body:
{
  "calendarId": "primary",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  }
}

Response:
{
  "success": true,
  "imported": 15,
  "events": [...]
}
```

#### Disconnect Calendar
```http
POST /api/google-calendar/disconnect

Response:
{
  "success": true,
  "message": "Google Calendar disconnected"
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400,
  "details": {}
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `INVALID_INPUT` | 400 | Invalid request body |
| `NOT_FOUND` | 404 | Resource not found |
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | Permission denied |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## Rate Limiting

- Standard: 100 requests/minute
- Export: 10 requests/minute  
- OCR: 5 requests/minute
- Chat: 20 requests/minute

Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Pagination

For list endpoints:
```
GET /api/tasks?page=1&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Webhooks (Future)

Coming soon:
- Task completion
- Schedule changes
- Schedule health warnings
- Deadline reminders

---

## Best Practices

1. **Error Handling**: Always check response status
2. **Rate Limiting**: Implement exponential backoff
3. **Caching**: Cache frequently accessed data
4. **Pagination**: Use pagination for large datasets
5. **Authentication**: Include auth token in headers
6. **Validation**: Validate input before sending

---

## Code Examples

### JavaScript/Fetch
```javascript
// Create a task
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Study Physics',
    duration: 120,
    deadline: '2024-12-20',
    priority: 'high',
    category: 'school'
  })
});

const task = await response.json();
console.log('Task created:', task);
```

### React Hook
```jsx
import { useMutation } from '@tanstack/react-query';

function CreateTask() {
  const mutation = useMutation({
    mutationFn: (newTask) =>
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask)
      }).then(r => r.json()),
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'New Task' })}>
      Create Task
    </button>
  );
}
```

---

## Versioning

Current API Version: **1.0.0**

Legacy versions will be supported at `/api/v1/` for backward compatibility.

---

**Last Updated**: December 2024  
**Next Review**: June 2025
