# Design Guidelines: AI-Powered Personal Scheduling Application

## Design Approach

**Selected Approach:** Design System Hybrid (Material Design + Linear-inspired minimalism)

This productivity application requires clear information hierarchy, efficient workflows, and functional elegance. Drawing from Linear's minimalist aesthetic for navigation and Material Design principles for data-dense components like calendars and task lists.

**Core Design Principles:**
- Information clarity over decoration
- Efficient workflows with minimal cognitive load
- Purposeful whitespace for focus
- Consistent patterns for predictability

## Typography

**Font System:** Inter (Google Fonts)
- Headers: 600 weight, sizes from text-3xl (hero) down to text-lg (section headers)
- Body text: 400 weight, text-base for primary content
- Labels/metadata: 500 weight, text-sm for form labels, task metadata
- Timestamps/auxiliary: 400 weight, text-xs for calendar time markers

**Hierarchy:**
- Page titles: text-2xl to text-3xl, font-semibold
- Section headers: text-xl, font-semibold
- Card titles: text-lg, font-medium
- Body/inputs: text-base, font-normal
- Metadata: text-sm, font-medium

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section margins: mb-8 to mb-12
- Grid gaps: gap-4 to gap-6
- Form field spacing: space-y-4

**Grid Structure:**
- Main application: Sidebar navigation (w-64) + Main content area (flex-1)
- Calendar view: 7-column grid for weekly view
- Task panels: Single column with max-w-2xl for forms
- Dashboard cards: 2-3 column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

## Component Library

### Navigation
**Sidebar Navigation (Left, Fixed):**
- Width: w-64
- Padding: p-6
- Navigation items with icon + label, rounded-lg hover states
- Active state: distinct treatment with subtle indicator
- Sections: Dashboard, Schedule, Tasks, Settings

### Core Application Components

**Upload Component:**
- Drag-and-drop zone with dashed border
- Center-aligned icon (upload icon from Heroicons) with descriptive text
- File preview thumbnail after upload
- Padding: p-8, rounded-xl border

**Task Creation Panel:**
- Modal/drawer interface, max-w-lg
- Form fields with consistent spacing (space-y-4)
- Input fields: rounded-lg, px-4 py-3
- Select dropdowns for category and priority
- Date picker for deadlines
- Duration input with increment/decrement buttons

**Weekly Calendar View:**
- 7-column grid with time slots on Y-axis
- Time markers: text-xs on left axis (6am-12am in 1-hour increments)
- Day headers: text-sm font-medium, centered
- Time blocks: rounded-md, padding p-2
- Visual distinction between classes (extracted) and AI-placed tasks
- Drag handles on task blocks (cursor-move)

**Task Cards (in calendar):**
- Compact: rounded-md, p-2
- Task name: text-sm font-medium, truncate if needed
- Time range: text-xs
- Category badge: text-xs rounded-full px-2 py-0.5

**Dashboard Summary Cards:**
- Grid layout: grid-cols-1 md:grid-cols-3 gap-6
- Card structure: rounded-xl, p-6
- Icon at top (Heroicons)
- Metric: text-3xl font-bold
- Label: text-sm

**Task List View:**
- Checkbox + task name + metadata (inline)
- Hover state: subtle background change
- Strikethrough for completed tasks
- Grouped by category with headers

### Action Components

**Primary Actions:**
- "Regenerate Schedule" button: rounded-lg, px-6 py-3, font-medium
- "Upload Schedule" button: similar treatment
- Positioned prominently in relevant sections

**Secondary Actions:**
- Icon buttons: rounded-lg p-2 (edit, delete, etc.)
- Text links: text-sm font-medium with underline on hover

**Modals/Overlays:**
- Centered, max-w-lg to max-w-2xl
- Backdrop with opacity
- rounded-2xl with p-6
- Header with close button (X icon)

### Forms & Inputs

**Input Fields:**
- Base: rounded-lg border px-4 py-3
- Focus: ring treatment
- Labels: text-sm font-medium mb-2

**Select Dropdowns:**
- Match input styling
- Custom arrow icon (Heroicons chevron-down)

**Priority Selector:**
- Segmented control or radio group
- Inline options: Low, Medium, High, Urgent

**Category Selector:**
- Dropdown with icons per category
- Options: School, Workout, Personal, Health, Other

### Status & Feedback

**Warning Indicators:**
- Alert component: rounded-lg p-4
- Icon (Heroicons exclamation-triangle) + message
- Used for schedule overload warnings

**Break Indicators:**
- Subtle visual treatment in calendar
- Icon (coffee cup from Heroicons)
- Text: "Break" with duration

**Loading States:**
- Skeleton screens for calendar loading
- Spinner for AI processing
- Progress indicator for OCR

## Icons

**Library:** Heroicons (via CDN)
- Navigation: home, calendar, list, settings
- Actions: upload, refresh, download, edit, trash
- Status: check, clock, exclamation-triangle
- Categories: academic-cap, fire, heart, user

## Animations

**Minimal Motion:**
- Drag-and-drop: smooth transform during drag
- Modal entrance: subtle fade + scale from 0.95
- Button interactions: inherit from component system
- Avoid distracting scrolling or complex transitions

## Special Features Layout

**Pomodoro Timer:**
- Floating card or sidebar widget
- Circular progress indicator
- Start/pause button, time remaining

**OCR Processing View:**
- Full-screen overlay during processing
- Progress indicator
- Preview of extracted data before confirmation

**PDF Export Preview:**
- Modal with schedule preview
- Download button prominent

## Responsive Behavior

- Mobile: Single column, collapsible sidebar (hamburger menu)
- Tablet: Maintain 2-column layouts, calendar scrolls horizontally if needed
- Desktop: Full multi-column experience with fixed sidebar

## Images

**No hero images** - This is a web application, not a marketing site. All visual content is functional (uploaded schedules, calendar interfaces, task data).