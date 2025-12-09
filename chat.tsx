import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, CheckCircle, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Task } from "@shared/schema";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  task?: Task;
  scheduling?: {
    preferredTimeRange: { start: string; end: string } | null;
    suggestedTime: string;
    reasoning: string;
  };
}

interface ChatResponse {
  success: boolean;
  response: string;
  task?: Task;
  scheduling?: {
    preferredTimeRange: { start: string; end: string } | null;
    suggestedTime: string;
    reasoning: string;
  };
  message?: string;
}

const EXAMPLE_PROMPTS = [
  "Add a task to shower every day between 7-10 PM",
  "I need to work out on weekdays at 6 AM",
  "Schedule lunch breaks every day at noon",
  "Add a study session for 2 hours tomorrow",
  "Remind me to take vitamins every morning",
  "I have a meeting on Friday at 2 PM",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI scheduling assistant. Tell me what tasks you need to add, and I'll create and schedule them for you. Try something like \"Add a daily shower task between 7-10 PM\"",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const chatMutation = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat/task", { message });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        task: data.task,
        scheduling: data.scheduling,
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.success && data.task) {
        queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
        toast({
          title: "Task created!",
          description: `Added "${data.task.name}" to your schedule.`,
        });
      }
    },
    onError: (error: Error) => {
      const errorContent = error.message || "I'm sorry, I had trouble processing that. Could you try rephrasing your request?";
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI scheduling assistant. Tell me what tasks you need to add, and I'll create and schedule them for you. Try something like \"Add a daily shower task between 7-10 PM\"",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">AI Assistant</h1>
          <p className="text-muted-foreground">Create tasks using natural language</p>
        </div>
        <Button 
          variant="outline" 
          onClick={clearChat}
          data-testid="button-clear-chat"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <CardHeader className="border-b py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Chat with AI</CardTitle>
              <CardDescription>Describe tasks in plain language and I'll add them to your schedule</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    data-testid={`message-${message.role}-${message.id}`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.task && (
                      <div className="mt-3 p-3 rounded bg-background/50 border">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{message.task.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">
                            {message.task.duration}min
                          </Badge>
                          <Badge variant="outline">
                            {message.task.category}
                          </Badge>
                          {message.task.isRecurring && message.task.repeatDays && (
                            <Badge variant="outline">
                              {message.task.repeatDays.map(d => 
                                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][parseInt(d)]
                              ).join(", ")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {message.scheduling && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Suggested time: {formatTime(message.scheduling.suggestedTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {chatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {messages.length === 1 && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(prompt)}
                      className="text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg transition-colors text-left"
                      data-testid={`button-example-${idx}`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your task... (e.g., 'I need to study for 2 hours every evening')"
                disabled={chatMutation.isPending}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || chatMutation.isPending}
                data-testid="button-send-message"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
