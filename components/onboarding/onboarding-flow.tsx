"use client";

import { useState } from 'react';
import { useApp } from '@/lib/context';
import type { UserProfile, SkillGapAnalysis, Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Target,
  CheckCircle2,
  Zap
} from 'lucide-react';

const TECHNICAL_SKILLS = [
  'JavaScript', 'Python', 'SQL', 'Data Analysis', 'Project Management',
  'UI/UX Design', 'Machine Learning', 'Cloud Computing', 'React', 'Node.js',
  'Excel', 'Tableau', 'Power BI', 'Figma', 'Product Management'
];

const SOFT_SKILLS = [
  'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration',
  'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity',
  'Emotional Intelligence', 'Negotiation', 'Presentation', 'Mentoring'
];

const BREAK_REASONS = [
  'Maternity/Parental Leave',
  'Caregiving Responsibilities',
  'Health Reasons',
  'Relocation',
  'Education/Upskilling',
  'Personal Growth',
  'Other',
  'Prefer not to say'
];

export function OnboardingFlow() {
  const { onboardingStep, setOnboardingStep, setProfile, setSkillAnalysis, setCurrentView, user } = useApp();
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name || '',
    education: '',
    previousRole: '',
    yearsOfExperience: 0,
    careerBreakDuration: 0,
    breakReason: '',
    technicalSkills: [],
    softSkills: [],
    confidenceLevel: 'medium',
    preferredWorkType: 'hybrid',
  });

  const steps = [
    { id: 'welcome', label: 'Welcome', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'preferences', label: 'Preferences', icon: Target },
    { id: 'summary', label: 'Summary', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === onboardingStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === onboardingStep);
    if (currentIndex < steps.length - 1) {
      setOnboardingStep(steps[currentIndex + 1].id as typeof onboardingStep);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === onboardingStep);
    if (currentIndex > 0) {
      setOnboardingStep(steps[currentIndex - 1].id as typeof onboardingStep);
    }
  };

  const toggleSkill = (skill: string, type: 'technical' | 'soft') => {
    const key = type === 'technical' ? 'technicalSkills' : 'softSkills';
    const currentSkills = formData[key] || [];
    
    if (currentSkills.includes(skill)) {
      setFormData({
        ...formData,
        [key]: currentSkills.filter(s => s !== skill),
      });
    } else {
      setFormData({
        ...formData,
        [key]: [...currentSkills, skill],
      });
    }
  };

  const generateSkillAnalysis = (): SkillGapAnalysis => {
    const allSkills = [...(formData.technicalSkills || []), ...(formData.softSkills || [])];
    
    const existingSkills: Skill[] = allSkills.map(name => ({
      name,
      category: TECHNICAL_SKILLS.includes(name) ? 'technical' : 'soft',
      proficiencyLevel: Math.floor(Math.random() * 30) + 60, // 60-90%
      required: true,
    }));

    const skillsToImprove: Skill[] = [
      { name: 'Advanced SQL', category: 'technical', proficiencyLevel: 45, required: true },
      { name: 'Agile Methodology', category: 'technical', proficiencyLevel: 35, required: true },
      { name: 'Public Speaking', category: 'soft', proficiencyLevel: 50, required: false },
    ];

    const missingSkills: Skill[] = [
      { name: 'Cloud Architecture', category: 'technical', proficiencyLevel: 0, required: true },
      { name: 'DevOps', category: 'technical', proficiencyLevel: 0, required: false },
      { name: 'Strategic Planning', category: 'soft', proficiencyLevel: 0, required: true },
    ];

    const totalRequired = existingSkills.length + skillsToImprove.length + missingSkills.length;
    const matchPercentage = Math.round((existingSkills.length / totalRequired) * 100);

    return {
      existingSkills,
      skillsToImprove,
      missingSkills,
      overallMatchPercentage: matchPercentage,
    };
  };

  const handleComplete = () => {
    const profile: UserProfile = {
      name: formData.name || '',
      age: formData.age,
      education: formData.education || '',
      previousRole: formData.previousRole || '',
      yearsOfExperience: formData.yearsOfExperience || 0,
      careerBreakDuration: formData.careerBreakDuration || 0,
      breakReason: formData.breakReason,
      technicalSkills: formData.technicalSkills || [],
      softSkills: formData.softSkills || [],
      confidenceLevel: formData.confidenceLevel || 'medium',
      preferredWorkType: formData.preferredWorkType || 'hybrid',
    };

    setProfile(profile);
    setSkillAnalysis(generateSkillAnalysis());
    setCurrentView('dashboard');
  };

  const getCareerGapSummary = () => {
    const duration = formData.careerBreakDuration || 0;
    const skills = [...(formData.technicalSkills || []), ...(formData.softSkills || [])];
    
    let summary = `You have a ${duration}-year career gap`;
    
    if (skills.length < 5) {
      summary += ' and may need to build up your skill portfolio';
    } else if (skills.length < 10) {
      summary += ' and need to refresh technical + communication skills';
    } else {
      summary += ' with a strong skill foundation to build upon';
    }
    
    return summary;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Gap</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    index <= currentStepIndex
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {currentStepIndex + 1} of {steps.length}
        </p>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {onboardingStep === 'welcome' && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">Welcome to Gap</CardTitle>
              <CardDescription className="text-lg">
                Let&apos;s get you back on your career path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Personalized Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll analyze your skills and identify your strengths
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Custom Learning Path</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a tailored upskilling plan based on your goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Job Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with opportunities that match your profile
                    </p>
                  </div>
                </div>
              </div>
              <Button onClick={handleNext} className="w-full h-12 gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {onboardingStep === 'profile' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Tell us about yourself
              </CardTitle>
              <CardDescription>
                This helps us understand your background better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Age (Optional)</label>
                    <Input
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
                      placeholder="Age"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Education</label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full h-12 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="high_school">High School</option>
                      <option value="bachelors">Bachelor&apos;s Degree</option>
                      <option value="masters">Master&apos;s Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Previous Job Role</label>
                  <Input
                    value={formData.previousRole}
                    onChange={(e) => setFormData({ ...formData, previousRole: e.target.value })}
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Years of Experience</label>
                    <Input
                      type="number"
                      value={formData.yearsOfExperience || ''}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                      placeholder="Years"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Career Break (Years)</label>
                    <Input
                      type="number"
                      value={formData.careerBreakDuration || ''}
                      onChange={(e) => setFormData({ ...formData, careerBreakDuration: parseInt(e.target.value) || 0 })}
                      placeholder="Years"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Reason for Break (Optional)</label>
                  <select
                    value={formData.breakReason}
                    onChange={(e) => setFormData({ ...formData, breakReason: e.target.value })}
                    className="w-full h-12 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Select (optional)</option>
                    {BREAK_REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12 gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 gap-2">
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {onboardingStep === 'skills' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Select your skills
              </CardTitle>
              <CardDescription>
                Choose skills you have experience with
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {TECHNICAL_SKILLS.map(skill => (
                    <Badge
                      key={skill}
                      variant={formData.technicalSkills?.includes(skill) ? 'default' : 'outline'}
                      className="cursor-pointer px-3 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => toggleSkill(skill, 'technical')}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILLS.map(skill => (
                    <Badge
                      key={skill}
                      variant={formData.softSkills?.includes(skill) ? 'default' : 'outline'}
                      className="cursor-pointer px-3 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => toggleSkill(skill, 'soft')}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground">
                  Selected: {(formData.technicalSkills?.length || 0) + (formData.softSkills?.length || 0)} skills
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12 gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 gap-2">
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {onboardingStep === 'preferences' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Your preferences
              </CardTitle>
              <CardDescription>
                Help us match you with the right opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Confidence Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, confidenceLevel: level })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.confidenceLevel === level
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {level === 'low' ? '😊' : level === 'medium' ? '💪' : '🚀'}
                      </div>
                      <div className="font-medium capitalize text-foreground">{level}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Preferred Work Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['remote', 'hybrid', 'onsite'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredWorkType: type })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.preferredWorkType === type
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {type === 'remote' ? '🏠' : type === 'hybrid' ? '🔄' : '🏢'}
                      </div>
                      <div className="font-medium capitalize text-foreground">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12 gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 gap-2">
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {onboardingStep === 'summary' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Career Gap Summary
              </CardTitle>
              <CardDescription>
                Review your profile and analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">Your Analysis</h3>
                    <p className="text-muted-foreground">{getCareerGapSummary()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Career Break</div>
                  <div className="text-2xl font-bold text-foreground">{formData.careerBreakDuration} years</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-sm text-muted-foreground">Skills Selected</div>
                  <div className="text-2xl font-bold text-foreground">
                    {(formData.technicalSkills?.length || 0) + (formData.softSkills?.length || 0)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Profile Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Previous Role</span>
                    <span className="font-medium text-foreground">{formData.previousRole || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium text-foreground">{formData.yearsOfExperience} years</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Work Preference</span>
                    <span className="font-medium capitalize text-foreground">{formData.preferredWorkType}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium capitalize text-foreground">{formData.confidenceLevel}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12 gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
                <Button onClick={handleComplete} className="flex-1 h-12 gap-2">
                  Complete Setup
                  <CheckCircle2 className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
