"use client";

import { useApp } from '@/lib/context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const JOB_ROLES = [
  { id: 'software-engineer', title: 'Software Engineer', minExp: 2 },
  { id: 'data-analyst', title: 'Data Analyst', minExp: 1 },
  { id: 'product-manager', title: 'Product Manager', minExp: 3 },
  { id: 'ux-designer', title: 'UX Designer', minExp: 2 },
  { id: 'project-manager', title: 'Project Manager', minExp: 2 },
  { id: 'marketing-manager', title: 'Marketing Manager', minExp: 3 },
];

export function SkillAnalysis() {
  const { skillAnalysis, profile, selectedRole, setSelectedRole, setCurrentView } = useApp();

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const selectedRoleData = JOB_ROLES.find(r => r.id === selectedRole);
  const needsWarning = selectedRoleData && profile && 
    selectedRoleData.minExp > profile.yearsOfExperience;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Compare your skills with target job requirements
        </p>
      </div>

      {/* Overall Match */}
      {skillAnalysis && (
        <Card className="border-0 shadow-lg bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 text-foreground">Overall Match Score</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Based on your current skills and target role requirements
                </p>
                <div className="flex items-center gap-4">
                  <Progress value={skillAnalysis.overallMatchPercentage} className="flex-1 h-4" />
                  <span className="text-2xl font-bold text-primary">
                    {skillAnalysis.overallMatchPercentage}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">
                  {skillAnalysis.overallMatchPercentage >= 70 ? 'Strong Match' : 
                   skillAnalysis.overallMatchPercentage >= 50 ? 'Good Potential' : 
                   'Needs Development'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Existing Skills */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Skills You Have</CardTitle>
                <CardDescription>{skillAnalysis?.existingSkills.length || 0} skills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {skillAnalysis?.existingSkills.slice(0, 6).map(skill => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.proficiencyLevel}%</span>
                </div>
                <Progress value={skill.proficiencyLevel} className="h-2" />
              </div>
            ))}
            {(skillAnalysis?.existingSkills.length || 0) > 6 && (
              <p className="text-sm text-muted-foreground text-center pt-2">
                +{(skillAnalysis?.existingSkills.length || 0) - 6} more skills
              </p>
            )}
          </CardContent>
        </Card>

        {/* Skills to Improve */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Needs Improvement</CardTitle>
                <CardDescription>{skillAnalysis?.skillsToImprove.length || 0} skills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {skillAnalysis?.skillsToImprove.map(skill => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.proficiencyLevel}%</span>
                </div>
                <Progress value={skill.proficiencyLevel} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Missing Skills</CardTitle>
                <CardDescription>{skillAnalysis?.missingSkills.length || 0} skills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {skillAnalysis?.missingSkills.map(skill => (
              <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                <span className="text-sm text-foreground">{skill.name}</span>
                <Badge variant={skill.required ? 'destructive' : 'secondary'} className="text-xs">
                  {skill.required ? 'Required' : 'Optional'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Role Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Select Target Role</CardTitle>
              <CardDescription>Choose the role you want to pursue</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {JOB_ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-foreground">{role.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Min. {role.minExp} years experience
                </div>
              </button>
            ))}
          </div>

          {needsWarning && (
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Additional Preparation Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    This role typically requires {selectedRoleData?.minExp} years of experience. 
                    You have {profile?.yearsOfExperience} years. We recommend completing an assessment 
                    to better understand your readiness level.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedRole && (
            <Button onClick={handleStartAssessment} className="gap-2">
              Start Assessment Test
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
