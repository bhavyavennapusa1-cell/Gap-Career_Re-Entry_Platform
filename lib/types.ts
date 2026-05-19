export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface UserProfile {
  name: string;
  age?: number;
  education: string;
  previousRole: string;
  yearsOfExperience: number;
  careerBreakDuration: number;
  breakReason?: string;
  technicalSkills: string[];
  softSkills: string[];
  confidenceLevel: 'low' | 'medium' | 'high';
  preferredWorkType: 'remote' | 'hybrid' | 'onsite';
}

export interface SkillGapAnalysis {
  existingSkills: Skill[];
  skillsToImprove: Skill[];
  missingSkills: Skill[];
  overallMatchPercentage: number;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft';
  proficiencyLevel: number; // 0-100
  required: boolean;
}

export interface JobRole {
  id: string;
  title: string;
  description: string;
  requiredSkills: Skill[];
  minExperience: number;
  category: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  roleId: string;
}

export interface AssessmentResult {
  roleId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  readinessLevel: 'Beginner' | 'Intermediate' | 'Job Ready';
  completedAt: Date;
}

export interface UpskillingPlan {
  id: string;
  userId: string;
  targetRole: string;
  courses: Course[];
  skillsToLearn: string[];
  dailyHours: number;
  totalDays: number;
  bufferDays: number;
  startDate: Date;
  completedModules: number;
  totalModules: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  skill: string;
  priority: 'high' | 'medium' | 'low';
  url: string;
  completed: boolean;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  matchScore: number;
  skillsMatched: string[];
  skillsMissing: string[];
  postedDate: Date;
}

export interface DashboardStats {
  skillsCompletedPercentage: number;
  averageTestScore: number;
  learningStreak: number;
  confidenceImprovement: number;
  totalCoursesCompleted: number;
  totalAssessmentsTaken: number;
}

export type OnboardingStep = 
  | 'welcome' 
  | 'profile' 
  | 'skills' 
  | 'preferences' 
  | 'summary';

export type AppView = 
  | 'login' 
  | 'onboarding' 
  | 'dashboard' 
  | 'skill-analysis' 
  | 'assessment' 
  | 'upskilling' 
  | 'jobs'
  | 'architecture';
