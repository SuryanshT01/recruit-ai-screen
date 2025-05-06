
import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileUp, 
  FileText, 
  Trash2,
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockJobs = [
  { 
    id: 1, 
    title: "Senior Software Engineer", 
    company: "TechCorp", 
    location: "San Francisco, CA", 
    created: "2023-04-15", 
    candidates: 24,
    requirements: ["5+ years in React", "Node.js", "Cloud platforms"],
    responsibilities: ["Lead development team", "Architect solutions", "Code reviews"]
  },
  { 
    id: 2, 
    title: "Product Manager", 
    company: "InnovateTech", 
    location: "Remote", 
    created: "2023-04-10", 
    candidates: 18,
    requirements: ["3+ years in product management", "Agile methodology", "User research"],
    responsibilities: ["Product roadmap", "Market analysis", "Feature prioritization"]
  },
  { 
    id: 3, 
    title: "UX Designer", 
    company: "DesignHub", 
    location: "New York, NY", 
    created: "2023-04-05", 
    candidates: 15,
    requirements: ["3+ years in UX design", "Figma", "User testing"],
    responsibilities: ["Create wireframes", "User research", "Design systems"]
  }
];

const JobDescriptions = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [jobTextContent, setJobTextContent] = useState("");
  const [newJobData, setNewJobData] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real app, you would send this file to the API
      toast({
        title: "Job Description Uploaded",
        description: `${file.name} has been uploaded and is being processed.`,
      });
      setIsUploadDialogOpen(false);
    }
  };

  const handleCreateJob = () => {
    // In a real app, you would send the job data to the API
    toast({
      title: "Job Description Created",
      description: `${newJobData.title} has been created successfully.`,
    });
    
    // Add to local state for demo purpose
    setJobs([...jobs, {
      id: jobs.length + 1,
      title: newJobData.title,
      company: newJobData.company,
      location: newJobData.location,
      created: new Date().toISOString().split('T')[0],
      candidates: 0,
      requirements: [],
      responsibilities: []
    }]);
    
    setIsCreateDialogOpen(false);
    setNewJobData({
      title: "",
      company: "",
      location: "",
      description: ""
    });
  };

  const handleParseJobText = () => {
    if (jobTextContent.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter job description text to parse.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this text to the API for parsing
    toast({
      title: "Job Description Parsing",
      description: "Text is being processed by AI. This may take a moment.",
    });
    
    // Simulate parsing success after delay
    setTimeout(() => {
      toast({
        title: "Parsing Complete",
        description: "Job description has been successfully parsed.",
      });
      setJobTextContent("");
    }, 2000);
  };

  const deleteJob = (id: number) => {
    // In a real app, you would call the API to delete the job
    setJobs(jobs.filter(job => job.id !== id));
    
    toast({
      title: "Job Description Deleted",
      description: "The job description has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
          <p className="text-muted-foreground">
            Manage and analyze your job positions with AI assistance.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Job Description</DialogTitle>
                <DialogDescription>
                  Upload a job description file (PDF, DOCX) to parse with AI.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-file">Job Description File</Label>
                  <Input id="job-file" type="file" onChange={handleFileUpload} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload & Process</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Job Description</DialogTitle>
                <DialogDescription>
                  Enter job details or paste a job description for AI parsing.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="form">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="form">Enter Details</TabsTrigger>
                  <TabsTrigger value="text">Parse Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form" className="space-y-4">
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        value={newJobData.title}
                        onChange={(e) => setNewJobData({...newJobData, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={newJobData.company}
                        onChange={(e) => setNewJobData({...newJobData, company: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={newJobData.location}
                        onChange={(e) => setNewJobData({...newJobData, location: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea 
                        id="description" 
                        rows={5}
                        value={newJobData.description}
                        onChange={(e) => setNewJobData({...newJobData, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateJob}>Create Job</Button>
                  </DialogFooter>
                </TabsContent>
                
                <TabsContent value="text" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="job-text">Paste Job Description Text</Label>
                    <Textarea 
                      id="job-text" 
                      placeholder="Paste the full job description here..." 
                      rows={10}
                      value={jobTextContent}
                      onChange={(e) => setJobTextContent(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Our AI will parse the text and extract key details.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleParseJobText}>Parse with AI</Button>
                  </DialogFooter>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search job descriptions..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {jobs.length === 0 ? (
        <EmptyState
          title="No Job Descriptions"
          description="Create or upload a job description to get started with AI-powered candidate matching."
          icon={<FileText className="h-10 w-10 text-muted-foreground" />}
          action={{
            label: "Create Job Description",
            onClick: () => setIsCreateDialogOpen(true)
          }}
          className="mt-10"
        />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="No Results Found"
          description={`No job descriptions match "${searchQuery}". Try a different search term.`}
          icon={<Search className="h-10 w-10 text-muted-foreground" />}
          className="mt-10"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="card-hover">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company} • {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created: {job.created}</span>
                    <span>{job.candidates} candidates</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => deleteJob(job.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button variant="ghost" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDescriptions;
