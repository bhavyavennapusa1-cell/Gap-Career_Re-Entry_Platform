"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import type { Course, UpskillingPlan } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Clock, 
  Calendar,
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Settings,
  Zap,
  Target
} from 'lucide-react';

// Mock courses database
const COURSES: Course[] = [
  { id: '1', title: 'Advanced SQL for Data Analysis', description: 'Master complex queries, window functions, and optimization', duration: '4 hours', skill: 'SQL', priority: 'high', url: '#', completed: false },
  { id: '2', title: 'Python for Data Science', description: 'Learn pandas, numpy, and data manipulation', duration: '8 hours', skill: 'Python', priority: 'high', url: '#', completed: false },
  { id: '3', title: 'Statistical Analysis Fundamentals', description: 'Understand hypothesis testing and statistical methods', duration: '6 hours', skill: 'Statistics', priority: 'medium', url: '#', completed: true },
  { id: '4', title: 'Data Visualization with Tableau', description: 'Create compelling dashboards and visualizations', duration: '5 hours', skill: 'Tableau', priority: 'medium', url: '#', completed: false },
  { id: '5', title: 'Machine Learning Basics', description: 'Introduction to ML concepts and algorithms', duration: '10 hours', skill: 'Machine Learning', priority: 'low', url: '#', completed: false },
  { id: '6', title: 'Business Communication Skills', description: 'Present data insights effectively to stakeholders', duration: '3 hours', skill: 'Communication', priority: 'high', url: '#', completed: true },
  { id: '7', title: 'Agile Project Management', description: 'Learn Scrum and agile methodologies', duration: '4 hours', skill: 'Agile', priority: 'medium', url: '#', completed: false },
  { id: '8', title: 'Cloud Computing Fundamentals', description: 'AWS and GCP basics for data professionals', duration: '6 hours', skill: 'Cloud Computing', priority: 'low', url: '#', completed: false },
];

const ROLE_SKILLS: Record<string, string[]> = {
  'software-engineer': ['JavaScript', 'React', 'Node.js', 'SQL', 'System Design', 'Git'],
  'data-analyst': ['SQL', 'Python', 'Statistics', 'Tableau', 'Excel', 'Communication'],
  'product-manager': ['Communication', 'Agile', 'Data Analysis', 'User Research', 'Strategy'],
  'ux-designer': ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Communication'],
  'project-manager': ['Agile', 'Communication', 'Risk Management', 'Stakeholder Management'],
  'marketing-manager': ['Analytics', 'Communication', 'Strategy', 'Content Marketing', 'SEO'],
};

export function UpskillingPlanComponent() {
  const { selectedRole, profile, upskillingPlan, setUpskillingPlan, skillAnalysis, setCurrentView } = useApp();
  const [dailyHours, setDailyHours] = useState(2);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [showSettings, setShowSettings] = useState(false);

  // Generate plan based on selected role and skill analysis
  useEffect(() => {
    if (selectedRole && !upskillingPlan) {
      const skillsToLearn = ROLE_SKILLS[selectedRole] || ROLE_SKILLS['data-analyst'];
      const relevantCourses = courses.filter(c => 
        skillsToLearn.some(s => c.skill.toLowerCase().includes(s.toLowerCase()))
      );

      const totalHours = relevantCourses.reduce((sum, c) => sum + parseInt(c.duration), 0);
      const totalDays = Math.ceil(totalHours / dailyHours);
      const bufferDays = Math.ceil(totalDays * 0.2); // 20% buffer

      const plan: UpskillingPlan = {
        id: '1',
        userId: '1',
        targetRole: selectedRole,
        courses: relevantCourses,
        skillsToLearn,
        dailyHours,
        totalDays,
        bufferDays,
        startDate: new Date(),
        completedModules: relevantCourses.filter(c => c.completed).length,
        totalModules: relevantCourses.length,
      };

      setUpskillingPlan(plan);
    }
  }, [selectedRole, dailyHours]);

  const updateDailyHours = (hours: number) => {
    setDailyHours(hours);
    if (upskillingPlan) {
      const totalHours = upskillingPlan.courses.reduce((sum, c) => sum + parseInt(c.duration), 0);
      const totalDays = Math.ceil(totalHours / hours);
      const bufferDays = Math.ceil(totalDays * 0.2);

      setUpskillingPlan({
        ...upskillingPlan,
        dailyHours: hours,
        totalDays,
        bufferDays,
      });
    }
  };

  const toggleCourseComplete = (courseId: string) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, completed: !c.completed } : c
    ));

    if (upskillingPlan) {
      const updatedCourses = upskillingPlan.courses.map(c =>
        c.id === courseId ? { ...c, completed: !c.completed } : c
      );
      setUpskillingPlan({
        ...upskillingPlan,
        courses: updatedCourses,
        completedModules: updatedCourses.filter(c => c.completed).length,
      });
    }
  };

  if (!selectedRole) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg text-center py-12">
          <CardContent>
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">No Role Selected</h2>
            <p className="text-muted-foreground mb-6">
              Please select a target role to generate your personalized upskilling plan.
            </p>
            <Button onClick={() => setCurrentView('skill-analysis')}>
              Go to Skill Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedPercentage = upskillingPlan 
    ? Math.round((upskillingPlan.completedModules / upskillingPlan.totalModules) * 100)
    : 0;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upskilling Plan</h1>
          <p className="text-muted-foreground mt-1">
            Your personalized learning path to {selectedRole?.replace('-', ' ')}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowSettings(!showSettings)}
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Customize Plan
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Customize Your Learning Pace</CardTitle>
            <CardDescription>Adjust how much time you can dedicate daily</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Daily Learning Time</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map(hours => (
                    <button
                      key={hours}
                      onClick={() => updateDailyHours(hours)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        dailyHours === hours
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      {hours} hr/day
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground">
                  With {dailyHours} hour(s) per day, you can complete your plan in approximately{' '}
                  <span className="font-semibold text-foreground">{upskillingPlan?.totalDays} days</span>
                  {' '}(including {upskillingPlan?.bufferDays} buffer days for flexibility).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold text-foreground">{upskillingPlan?.totalModules || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{upskillingPlan?.completedModules || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days to Complete</p>
                <p className="text-2xl font-bold text-foreground">{upskillingPlan?.totalDays || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Buffer Days</p>
                <p className="text-2xl font-bold text-foreground">{upskillingPlan?.bufferDays || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Overall Progress</h3>
            <span className="text-2xl font-bold text-primary">{completedPercentage}%</span>
          </div>
          <Progress value={completedPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {upskillingPlan?.completedModules} of {upskillingPlan?.totalModules} courses completed
          </p>
        </CardContent>
      </Card>

      {/* Skills to Learn */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Skills to Learn
          </CardTitle>
          <CardDescription>Priority-ordered skills for your target role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {upskillingPlan?.skillsToLearn.map((skill, index) => (
              <Badge 
                key={skill} 
                variant={index < 2 ? 'default' : 'secondary'}
                className="px-3 py-1"
              >
                {index < 2 && <Zap className="w-3 h-3 mr-1" />}
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">Recommended Courses</h2>
        <div className="space-y-4">
          {upskillingPlan?.courses.map((course, index) => (
            <Card key={course.id} className={`border-0 shadow-lg transition-all ${
              course.completed ? 'bg-accent/5' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleCourseComplete(course.id)}
                    className={`mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      course.completed
                        ? 'bg-accent border-accent text-accent-foreground'
                        : 'border-muted-foreground hover:border-primary'
                    }`}
                  >
                    {course.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4 opacity-0" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className={`font-semibold ${course.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {index + 1}. {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      </div>
                      <Badge variant={
                        course.priority === 'high' ? 'default' :
                        course.priority === 'medium' ? 'secondary' : 'outline'
                      }>
                        {course.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">{course.skill}</Badge>
                      {!course.completed && (
                        <Button variant="ghost" size="sm" className="ml-auto gap-1">
                          <Play className="w-4 h-4" />
                          Start
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily/Weekly Schedule */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Suggested Weekly Schedule</CardTitle>
          <CardDescription>Based on {dailyHours} hour(s) per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div
                key={day}
                className={`p-3 rounded-xl text-center ${
                  index < 5 ? 'bg-primary/10' : 'bg-secondary'
                }`}
              >
                <div className="text-xs text-muted-foreground mb-1">{day}</div>
                <div className={`text-sm font-semibold ${index < 5 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {index < 5 ? `${dailyHours}h` : 'Rest'}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Weekends are buffer days for catching up or rest. Adjust based on your schedule.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
