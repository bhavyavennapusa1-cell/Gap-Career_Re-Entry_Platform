"use client";

import { useApp } from '@/lib/context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  Target,
  Trophy,
  Flame,
  BookOpen,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function MainDashboard() {
  const { user, profile, dashboardStats, skillAnalysis, assessmentResults, setCurrentView } = useApp();
  
  const latestAssessment = assessmentResults[assessmentResults.length - 1];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {profile?.name || user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your progress and continue your career journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {skillAnalysis?.overallMatchPercentage || 0}%
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground">Skill Match</h3>
            <Progress value={skillAnalysis?.overallMatchPercentage || 0} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {dashboardStats?.skillsCompletedPercentage || 0}%
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground">Skills Completed</h3>
            <Progress value={dashboardStats?.skillsCompletedPercentage || 0} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-chart-3" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {latestAssessment?.readinessLevel || 'N/A'}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground">Test Score</h3>
            <p className="text-2xl font-bold text-foreground mt-1">
              {latestAssessment?.score || dashboardStats?.averageTestScore || 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-chart-1/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-chart-1" />
              </div>
              <Badge variant="secondary" className="text-xs">Days</Badge>
            </div>
            <h3 className="font-semibold text-foreground">Learning Streak</h3>
            <p className="text-2xl font-bold text-foreground mt-1">
              {dashboardStats?.learningStreak || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking Dashboard */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Progress Dashboard
            </CardTitle>
            <CardDescription>Your learning journey at a glance</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Completed */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Skills Progress</h4>
              <div className="space-y-3">
                {['Technical Skills', 'Soft Skills', 'Industry Knowledge'].map((skill, index) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{skill}</span>
                      <span className="text-muted-foreground">{[65, 78, 45][index]}%</span>
                    </div>
                    <Progress value={[65, 78, 45][index]} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Performance Indicators</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Courses Done</div>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats?.totalCoursesCompleted || 0}</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Assessments</div>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats?.totalAssessmentsTaken || 0}</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="text-2xl font-bold text-accent">+{dashboardStats?.confidenceImprovement || 0}%</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Readiness</div>
                  <div className="text-2xl font-bold text-primary">
                    {latestAssessment?.readinessLevel || 'Beginner'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card 
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all group"
          onClick={() => setCurrentView('skill-analysis')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Target className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Skill Analysis</h3>
                <p className="text-sm text-muted-foreground">Review your skill gaps</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all group"
          onClick={() => setCurrentView('assessment')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                <FileText className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Take Assessment</h3>
                <p className="text-sm text-muted-foreground">Test your readiness</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all group"
          onClick={() => setCurrentView('upskilling')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center group-hover:bg-chart-3 transition-all">
                <BookOpen className="w-6 h-6 text-chart-3 group-hover:text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Learning Plan</h3>
                <p className="text-sm text-muted-foreground">Continue upskilling</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Gap Summary */}
      {profile && (
        <Card className="border-0 shadow-lg bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Your Career Gap Summary</h3>
                <p className="text-muted-foreground">
                  You have a {profile.careerBreakDuration}-year career gap with {profile.yearsOfExperience} years 
                  of prior experience as {profile.previousRole || 'a professional'}. Your current skill match 
                  is {skillAnalysis?.overallMatchPercentage || 0}% and your readiness level 
                  is {latestAssessment?.readinessLevel || 'being assessed'}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
