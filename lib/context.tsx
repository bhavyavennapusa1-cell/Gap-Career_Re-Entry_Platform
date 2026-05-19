"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { 
  User, 
  UserProfile, 
  SkillGapAnalysis, 
  AssessmentResult, 
  UpskillingPlan, 
  JobMatch, 
  DashboardStats,
  AppView,
  OnboardingStep
} from './types';

interface AppState {
  user: User | null;
  profile: UserProfile | null;
  skillAnalysis: SkillGapAnalysis | null;
  assessmentResults: AssessmentResult[];
  upskillingPlan: UpskillingPlan | null;
  jobMatches: JobMatch[];
  dashboardStats: DashboardStats | null;
  currentView: AppView;
  onboardingStep: OnboardingStep;
  selectedRole: string | null;
  isAuthenticated: boolean;
}

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSkillAnalysis: (analysis: SkillGapAnalysis | null) => void;
  addAssessmentResult: (result: AssessmentResult) => void;
  setUpskillingPlan: (plan: UpskillingPlan | null) => void;
  setJobMatches: (matches: JobMatch[]) => void;
  setDashboardStats: (stats: DashboardStats | null) => void;
  setCurrentView: (view: AppView) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  setSelectedRole: (role: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  upgradeToPremium: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialDashboardStats: DashboardStats = {
  skillsCompletedPercentage: 45,
  averageTestScore: 72,
  learningStreak: 7,
  confidenceImprovement: 25,
  totalCoursesCompleted: 8,
  totalAssessmentsTaken: 3,
};

const initialJobMatches: JobMatch[] = [
  {
    id: '1',
    title: 'Senior Data Analyst',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    matchScore: 87,
    skillsMatched: ['SQL', 'Python', 'Data Visualization', 'Communication'],
    skillsMissing: ['Tableau', 'Machine Learning'],
    postedDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'New York, NY',
    workType: 'remote',
    matchScore: 74,
    skillsMatched: ['Project Management', 'Communication', 'Strategy'],
    skillsMissing: ['Agile', 'JIRA', 'Technical Writing'],
    postedDate: new Date('2024-01-18'),
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'Austin, TX',
    workType: 'onsite',
    matchScore: 68,
    skillsMatched: ['UI Design', 'Figma', 'User Research'],
    skillsMissing: ['Prototyping', 'A/B Testing'],
    postedDate: new Date('2024-01-20'),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skillAnalysis, setSkillAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [upskillingPlan, setUpskillingPlan] = useState<UpskillingPlan | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>(initialJobMatches);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(initialDashboardStats);
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const newUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        isPremium: false,
        createdAt: new Date(),
      };
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Check if user has completed onboarding
      const hasProfile = false; // In real app, check from backend
      if (hasProfile) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('onboarding');
      }
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const newUser: User = {
        id: '1',
        email,
        name,
        isPremium: false,
        createdAt: new Date(),
      };
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentView('onboarding');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setSkillAnalysis(null);
    setAssessmentResults([]);
    setUpskillingPlan(null);
    setDashboardStats(null);
    setIsAuthenticated(false);
    setCurrentView('login');
    setOnboardingStep('welcome');
    setSelectedRole(null);
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  const addAssessmentResult = (result: AssessmentResult) => {
    setAssessmentResults(prev => [...prev, result]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        skillAnalysis,
        assessmentResults,
        upskillingPlan,
        jobMatches,
        dashboardStats,
        currentView,
        onboardingStep,
        selectedRole,
        isAuthenticated,
        setUser,
        setProfile,
        setSkillAnalysis,
        addAssessmentResult,
        setUpskillingPlan,
        setJobMatches,
        setDashboardStats,
        setCurrentView,
        setOnboardingStep,
        setSelectedRole,
        login,
        signup,
        logout,
        upgradeToPremium,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
