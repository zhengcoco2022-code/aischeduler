import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Brain, Upload, Sparkles, CheckCircle, BarChart3, Share2, Download, Mic } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">SmartSchedule</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild data-testid="button-login">
            <a href="/api/login">Sign In</a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your AI-Powered Personal Scheduler
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Automatically create personalized, healthy daily and weekly schedules. 
            Upload your class schedule, add tasks, and let AI do the rest.
          </p>
          <Button size="lg" asChild data-testid="button-get-started">
            <a href="/api/login">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
            </a>
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card data-testid="card-feature-ocr">
            <CardHeader>
              <Upload className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart OCR Upload</CardTitle>
              <CardDescription>
                Upload a photo of your class schedule and AI automatically extracts all your classes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card data-testid="card-feature-ai">
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Task Scheduling</CardTitle>
              <CardDescription>
                Tell the AI what you need to do in plain language, and it creates tasks with optimal scheduling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card data-testid="card-feature-calendar">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Interactive Calendar</CardTitle>
              <CardDescription>
                Drag-and-drop your tasks, view daily or weekly, and connect with Google Calendar
              </CardDescription>
            </CardHeader>
          </Card>

          <Card data-testid="card-feature-voice">
            <CardHeader>
              <Mic className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Voice Commands</CardTitle>
              <CardDescription>
                Use voice recording to create tasks, add events, and modify your schedule hands-free
              </CardDescription>
            </CardHeader>
          </Card>

          <Card data-testid="card-feature-export">
            <CardHeader>
              <Download className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Export & Share</CardTitle>
              <CardDescription>
                Download as PDF, create shareable links, or export to calendar applications
              </CardDescription>
            </CardHeader>
          </Card>

          <Card data-testid="card-feature-responsive">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mobile Optimized</CardTitle>
              <CardDescription>
                Fully responsive design works seamlessly on desktop, tablet, and mobile devices
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="bg-card rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload Schedule</h3>
              <p className="text-sm text-muted-foreground">Take a photo of your class schedule or import from Google Calendar</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Add Tasks</h3>
              <p className="text-sm text-muted-foreground">Create tasks manually or chat with AI using natural language</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Generate Plan</h3>
              <p className="text-sm text-muted-foreground">AI creates multiple study plan options respecting your schedule</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Stay Organized</h3>
              <p className="text-sm text-muted-foreground">View your week, drag to reschedule, and track your progress</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Private & Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Each user has their own private schedule. Your data is never shared with other users.
              </p>
              <Button asChild data-testid="button-start-scheduling">
                <a href="/api/login">Start Scheduling Now</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-muted-foreground">
        <p>SmartSchedule - AI-Powered Personal Scheduling</p>
      </footer>
    </div>
  );
}
