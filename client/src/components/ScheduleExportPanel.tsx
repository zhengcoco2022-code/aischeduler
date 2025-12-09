import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Download, Share2, FileJson, FileText, Calendar, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  exportAsJSON, 
  exportAsCSV, 
  exportAsICalendar, 
  exportAsPDF,
  createShareLink,
  copyScheduleToClipboard,
  type Schedule 
} from "@/lib/scheduleExport";

interface ScheduleExportProps {
  schedule: Schedule;
  title?: string;
  onSuccess?: () => void;
}

export function ScheduleExport({ schedule, title = "My Schedule", onSuccess }: ScheduleExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleExportJSON = async () => {
    try {
      setIsExporting(true);
      exportAsJSON(schedule, title);
      toast({
        title: "Success",
        description: "Schedule exported as JSON file",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export schedule",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      exportAsCSV(schedule, title);
      toast({
        title: "Success",
        description: "Schedule exported as CSV file",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export schedule",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportICalendar = async () => {
    try {
      setIsExporting(true);
      exportAsICalendar(schedule, title);
      toast({
        title: "Success",
        description: "Schedule exported as iCalendar file (.ics)",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export schedule",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      exportAsPDF(schedule, title);
      toast({
        title: "Success",
        description: "Opening print dialog. Select 'Save as PDF' to save.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export schedule",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCreateShareLink = async () => {
    try {
      setIsExporting(true);
      const link = await createShareLink(schedule, title);
      setShareLink(link);
      toast({
        title: "Success",
        description: "Share link created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyShareLink = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      toast({
        title: "Success",
        description: "Share link copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleCopySchedule = async () => {
    try {
      await copyScheduleToClipboard(schedule);
      toast({
        title: "Success",
        description: "Schedule copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy schedule",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Schedule
          </CardTitle>
          <CardDescription>
            Save your schedule in different formats or share with others
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Export Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={handleExportJSON}
              disabled={isExporting}
              variant="outline"
              className="justify-start gap-2"
            >
              <FileJson className="w-4 h-4" />
              Export as JSON
            </Button>

            <Button
              onClick={handleExportCSV}
              disabled={isExporting}
              variant="outline"
              className="justify-start gap-2"
            >
              <FileText className="w-4 h-4" />
              Export as CSV
            </Button>

            <Button
              onClick={handleExportICalendar}
              disabled={isExporting}
              variant="outline"
              className="justify-start gap-2"
            >
              <Calendar className="w-4 h-4" />
              Export to Calendar (.ics)
            </Button>

            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              variant="outline"
              className="justify-start gap-2"
            >
              <Download className="w-4 h-4" />
              Print as PDF
            </Button>
          </div>

          {/* Copy to Clipboard */}
          <div className="pt-4 border-t">
            <Button
              onClick={handleCopySchedule}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Schedule to Clipboard
            </Button>
          </div>

          {/* Share via Link */}
          <div className="pt-4 border-t">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Create Shareable Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Schedule</DialogTitle>
                  <DialogDescription>
                    Create a link that others can use to view your schedule
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {!shareLink ? (
                    <Button
                      onClick={handleCreateShareLink}
                      disabled={isExporting}
                      className="w-full"
                    >
                      {isExporting ? "Creating..." : "Generate Share Link"}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800">Link created successfully!</span>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Share Link:</label>
                        <div className="flex gap-2">
                          <Input
                            value={shareLink}
                            readOnly
                            className="flex-1 font-mono text-xs"
                          />
                          <Button
                            onClick={handleCopyShareLink}
                            size="sm"
                            variant={isCopied ? "default" : "outline"}
                          >
                            {isCopied ? "✓ Copied" : "Copy"}
                          </Button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        This link will expire in 30 days
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
