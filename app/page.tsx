"use client";

import { useApp } from '@/lib/context';
import { LoginScreen } from '@/components/auth/login-screen';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { MainDashboard } from '@/components/dashboard/main-dashboard';
import { SkillAnalysis } from '@/components/dashboard/skill-analysis';
import { Assessment } from '@/components/dashboard/assessment';
import { UpskillingPlanComponent } from '@/components/dashboard/upskilling-plan';
import { JobMatching } from '@/components/dashboard/job-matching';
import { Architecture } from '@/components/dashboard/architecture';

export default function Home() {
  const { currentView, isAuthenticated } = useApp();

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Onboarding flow
  if (currentView === 'onboarding') {
    return <OnboardingFlow />;
  }

  // Dashboard views
  const renderDashboardContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <MainDashboard />;
      case 'skill-analysis':
        return <SkillAnalysis />;
      case 'assessment':
        return <Assessment />;
      case 'upskilling':
        return <UpskillingPlanComponent />;
      case 'jobs':
        return <JobMatching />;
      case 'architecture':
        return <Architecture />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboardContent()}
    </DashboardLayout>
  );
}
