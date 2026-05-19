"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import type { AssessmentQuestion, AssessmentResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Trophy,
  Target
} from 'lucide-react';

// Comprehensive questions database - 10 questions per role across difficulty levels
const QUESTIONS: AssessmentQuestion[] = [
  // ==================== SOFTWARE ENGINEER ====================
  // Easy
  { id: 'se1', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Mode Language'], correctAnswer: 0, difficulty: 'easy', roleId: 'software-engineer' },
  { id: 'se2', question: 'Which of the following is a JavaScript framework?', options: ['React', 'MySQL', 'Apache', 'Linux'], correctAnswer: 0, difficulty: 'easy', roleId: 'software-engineer' },
  { id: 'se3', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Syntax', 'Creative Style System', 'Coded Style Sheets'], correctAnswer: 0, difficulty: 'easy', roleId: 'software-engineer' },
  { id: 'se4', question: 'Which symbol is used for single-line comments in JavaScript?', options: ['//', '/* */', '#', '--'], correctAnswer: 0, difficulty: 'easy', roleId: 'software-engineer' },
  // Medium
  { id: 'se5', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, difficulty: 'medium', roleId: 'software-engineer' },
  { id: 'se6', question: 'What is a closure in JavaScript?', options: ['A function with access to outer scope variables', 'A way to close a program', 'A type of loop', 'A database query'], correctAnswer: 0, difficulty: 'medium', roleId: 'software-engineer' },
  { id: 'se7', question: 'What does REST stand for in API development?', options: ['Representational State Transfer', 'Remote Execution Service Technology', 'Reliable Exchange Standard Transfer', 'Request State Transfer'], correctAnswer: 0, difficulty: 'medium', roleId: 'software-engineer' },
  { id: 'se8', question: 'What is the purpose of Git branching?', options: ['To work on features without affecting main code', 'To delete code', 'To compile code faster', 'To encrypt files'], correctAnswer: 0, difficulty: 'medium', roleId: 'software-engineer' },
  // Hard
  { id: 'se9', question: 'Which design pattern is used to ensure only one instance of a class exists?', options: ['Factory', 'Observer', 'Singleton', 'Decorator'], correctAnswer: 2, difficulty: 'hard', roleId: 'software-engineer' },
  { id: 'se10', question: 'What is the difference between SQL and NoSQL databases?', options: ['SQL is relational with fixed schema, NoSQL is flexible', 'They are identical', 'NoSQL only stores numbers', 'SQL cannot handle large data'], correctAnswer: 0, difficulty: 'hard', roleId: 'software-engineer' },

  // ==================== DATA ANALYST ====================
  // Easy
  { id: 'da1', question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Standard Query Logic', 'System Query Language'], correctAnswer: 0, difficulty: 'easy', roleId: 'data-analyst' },
  { id: 'da2', question: 'Which tool is commonly used for data visualization?', options: ['Tableau', 'Photoshop', 'Word', 'Notepad'], correctAnswer: 0, difficulty: 'easy', roleId: 'data-analyst' },
  { id: 'da3', question: 'What is a spreadsheet commonly used for?', options: ['Organizing and analyzing data', 'Writing essays', 'Creating videos', 'Sending emails'], correctAnswer: 0, difficulty: 'easy', roleId: 'data-analyst' },
  { id: 'da4', question: 'What does CSV stand for?', options: ['Comma Separated Values', 'Computer System Values', 'Calculated Sum Values', 'Column Sorted Values'], correctAnswer: 0, difficulty: 'easy', roleId: 'data-analyst' },
  // Medium
  { id: 'da5', question: 'What is the purpose of a JOIN in SQL?', options: ['To combine rows from two tables', 'To delete rows', 'To create a new table', 'To index data'], correctAnswer: 0, difficulty: 'medium', roleId: 'data-analyst' },
  { id: 'da6', question: 'What is the difference between mean and median?', options: ['Mean is average, median is middle value', 'They are the same', 'Median is average, mean is middle value', 'Both are mode'], correctAnswer: 0, difficulty: 'medium', roleId: 'data-analyst' },
  { id: 'da7', question: 'What is data normalization?', options: ['Organizing data to reduce redundancy', 'Deleting all data', 'Converting data to uppercase', 'Printing data'], correctAnswer: 0, difficulty: 'medium', roleId: 'data-analyst' },
  { id: 'da8', question: 'Which SQL clause is used to filter results?', options: ['WHERE', 'SELECT', 'FROM', 'ORDER BY'], correctAnswer: 0, difficulty: 'medium', roleId: 'data-analyst' },
  // Hard
  { id: 'da9', question: 'What is a p-value in statistical analysis?', options: ['Probability of results given null hypothesis is true', 'Percentage of data', 'Processing value', 'Primary value'], correctAnswer: 0, difficulty: 'hard', roleId: 'data-analyst' },
  { id: 'da10', question: 'What is the difference between correlation and causation?', options: ['Correlation shows relationship, causation proves one causes the other', 'They mean the same thing', 'Causation is weaker than correlation', 'Neither is useful in analysis'], correctAnswer: 0, difficulty: 'hard', roleId: 'data-analyst' },

  // ==================== PRODUCT MANAGER ====================
  // Easy
  { id: 'pm1', question: 'What does MVP stand for in product development?', options: ['Minimum Viable Product', 'Maximum Value Product', 'Most Valuable Product', 'Managed Value Process'], correctAnswer: 0, difficulty: 'easy', roleId: 'product-manager' },
  { id: 'pm2', question: 'What is a user story?', options: ['A description of a feature from user perspective', 'A marketing campaign', 'A financial report', 'A team meeting'], correctAnswer: 0, difficulty: 'easy', roleId: 'product-manager' },
  { id: 'pm3', question: 'What is a product roadmap?', options: ['A strategic plan showing product evolution over time', 'A physical map of offices', 'A list of competitors', 'A bug tracking system'], correctAnswer: 0, difficulty: 'easy', roleId: 'product-manager' },
  { id: 'pm4', question: 'What does KPI stand for?', options: ['Key Performance Indicator', 'Knowledge Process Integration', 'Key Product Information', 'Kept Priority Items'], correctAnswer: 0, difficulty: 'easy', roleId: 'product-manager' },
  // Medium
  { id: 'pm5', question: 'What is the purpose of A/B testing?', options: ['Compare two versions to see which performs better', 'Test alphabet recognition', 'Audit and budget testing', 'Automated backup testing'], correctAnswer: 0, difficulty: 'medium', roleId: 'product-manager' },
  { id: 'pm6', question: 'What framework is used to prioritize features based on reach, impact, confidence, and effort?', options: ['RICE', 'SMART', 'SWOT', 'PEST'], correctAnswer: 0, difficulty: 'medium', roleId: 'product-manager' },
  { id: 'pm7', question: 'What is customer segmentation?', options: ['Dividing customers into groups based on shared characteristics', 'Removing customers from a list', 'Counting total customers', 'Hiring new customers'], correctAnswer: 0, difficulty: 'medium', roleId: 'product-manager' },
  { id: 'pm8', question: 'What is a sprint in Agile methodology?', options: ['A fixed time period to complete specific work', 'A running competition', 'A type of meeting', 'A reporting tool'], correctAnswer: 0, difficulty: 'medium', roleId: 'product-manager' },
  // Hard
  { id: 'pm9', question: 'In the Kano model, what are "delighters"?', options: ['Features that unexpectedly please users', 'Basic expected features', 'Performance features', 'Technical debt'], correctAnswer: 0, difficulty: 'hard', roleId: 'product-manager' },
  { id: 'pm10', question: 'What is the Jobs-to-be-Done framework?', options: ['Understanding why customers hire products to get jobs done', 'A recruitment strategy', 'A task management system', 'An employee evaluation method'], correctAnswer: 0, difficulty: 'hard', roleId: 'product-manager' },

  // ==================== PROJECT MANAGER ====================
  // Easy
  { id: 'pj1', question: 'What is the primary purpose of project management?', options: ['Planning and executing projects effectively', 'Writing code', 'Designing interfaces', 'Marketing products'], correctAnswer: 0, difficulty: 'easy', roleId: 'project-manager' },
  { id: 'pj2', question: 'What is a Gantt chart used for?', options: ['Visualizing project timeline and tasks', 'Creating financial reports', 'Designing logos', 'Writing documentation'], correctAnswer: 0, difficulty: 'easy', roleId: 'project-manager' },
  { id: 'pj3', question: 'What does deadline mean in project management?', options: ['The final date by which a task must be completed', 'The start of a project', 'A type of meeting', 'A budget limit'], correctAnswer: 0, difficulty: 'easy', roleId: 'project-manager' },
  { id: 'pj4', question: 'What is a stakeholder?', options: ['Anyone with interest in the project outcome', 'Only the CEO', 'The project manager only', 'External vendors only'], correctAnswer: 0, difficulty: 'easy', roleId: 'project-manager' },
  // Medium
  { id: 'pj5', question: 'What is the critical path in project management?', options: ['The longest sequence of dependent tasks', 'The shortest task', 'The most expensive task', 'The first task'], correctAnswer: 0, difficulty: 'medium', roleId: 'project-manager' },
  { id: 'pj6', question: 'What does scope creep refer to?', options: ['Uncontrolled expansion of project scope', 'A type of insect', 'Project cancellation', 'Budget reduction'], correctAnswer: 0, difficulty: 'medium', roleId: 'project-manager' },
  { id: 'pj7', question: 'What is a risk register?', options: ['A document listing potential project risks', 'A cash register', 'A team attendance sheet', 'A code repository'], correctAnswer: 0, difficulty: 'medium', roleId: 'project-manager' },
  { id: 'pj8', question: 'What is the purpose of a retrospective meeting?', options: ['Review what worked and what can improve', 'Plan future projects', 'Fire team members', 'Celebrate birthdays'], correctAnswer: 0, difficulty: 'medium', roleId: 'project-manager' },
  // Hard
  { id: 'pj9', question: 'What is Earned Value Management (EVM)?', options: ['A technique to measure project performance against scope, time, and cost', 'A salary calculation method', 'A stock trading strategy', 'A marketing metric'], correctAnswer: 0, difficulty: 'hard', roleId: 'project-manager' },
  { id: 'pj10', question: 'What is the difference between Waterfall and Agile methodologies?', options: ['Waterfall is sequential, Agile is iterative and flexible', 'They are the same', 'Agile is only for software', 'Waterfall is faster'], correctAnswer: 0, difficulty: 'hard', roleId: 'project-manager' },

  // ==================== UX DESIGNER ====================
  // Easy
  { id: 'ux1', question: 'What does UX stand for?', options: ['User Experience', 'Universal Exchange', 'Unified Extension', 'User Extension'], correctAnswer: 0, difficulty: 'easy', roleId: 'ux-designer' },
  { id: 'ux2', question: 'What is a wireframe?', options: ['A basic visual guide for a page layout', 'A type of fence', 'A coding framework', 'A database structure'], correctAnswer: 0, difficulty: 'easy', roleId: 'ux-designer' },
  { id: 'ux3', question: 'What is the purpose of user research?', options: ['Understanding user needs and behaviors', 'Spying on competitors', 'Testing server speed', 'Writing code'], correctAnswer: 0, difficulty: 'easy', roleId: 'ux-designer' },
  { id: 'ux4', question: 'What is a prototype?', options: ['An early sample or model of a product', 'The final product', 'A type of font', 'A color scheme'], correctAnswer: 0, difficulty: 'easy', roleId: 'ux-designer' },
  // Medium
  { id: 'ux5', question: 'What is a user persona?', options: ['A fictional character representing a user type', 'A login screen', 'A color palette', 'A font style'], correctAnswer: 0, difficulty: 'medium', roleId: 'ux-designer' },
  { id: 'ux6', question: 'What is usability testing?', options: ['Evaluating a product by testing it with real users', 'Testing code functionality', 'Checking server uptime', 'Verifying payment systems'], correctAnswer: 0, difficulty: 'medium', roleId: 'ux-designer' },
  { id: 'ux7', question: 'What is information architecture?', options: ['Organizing and structuring content effectively', 'Building physical structures', 'Network configuration', 'Database design only'], correctAnswer: 0, difficulty: 'medium', roleId: 'ux-designer' },
  { id: 'ux8', question: 'What is a user journey map?', options: ['A visualization of user experience over time', 'A physical map', 'A code flowchart', 'A marketing plan'], correctAnswer: 0, difficulty: 'medium', roleId: 'ux-designer' },
  // Hard
  { id: 'ux9', question: 'What is cognitive load in UX design?', options: ['The mental effort required to use a product', 'The weight of a device', 'Server processing power', 'Number of features'], correctAnswer: 0, difficulty: 'hard', roleId: 'ux-designer' },
  { id: 'ux10', question: 'What is Fitts Law?', options: ['Time to reach a target depends on distance and size', 'A copyright law', 'A coding standard', 'A color theory principle'], correctAnswer: 0, difficulty: 'hard', roleId: 'ux-designer' },

  // ==================== MARKETING MANAGER ====================
  // Easy
  { id: 'mm1', question: 'What is a marketing funnel?', options: ['Customer journey from awareness to purchase', 'A kitchen tool', 'A type of chart', 'Email filtering'], correctAnswer: 0, difficulty: 'easy', roleId: 'marketing-manager' },
  { id: 'mm2', question: 'What does SEO stand for?', options: ['Search Engine Optimization', 'Social Engagement Online', 'Sales Enhancement Operations', 'System Error Output'], correctAnswer: 0, difficulty: 'easy', roleId: 'marketing-manager' },
  { id: 'mm3', question: 'What is a call-to-action (CTA)?', options: ['A prompt encouraging users to take a specific action', 'A phone call script', 'A legal requirement', 'A type of advertisement'], correctAnswer: 0, difficulty: 'easy', roleId: 'marketing-manager' },
  { id: 'mm4', question: 'What is brand awareness?', options: ['How familiar consumers are with a brand', 'The cost of branding', 'A type of logo', 'Employee training'], correctAnswer: 0, difficulty: 'easy', roleId: 'marketing-manager' },
  // Medium
  { id: 'mm5', question: 'What is the difference between B2B and B2C marketing?', options: ['B2B targets businesses, B2C targets consumers', 'They are the same', 'B2C is only online', 'B2B is only offline'], correctAnswer: 0, difficulty: 'medium', roleId: 'marketing-manager' },
  { id: 'mm6', question: 'What is content marketing?', options: ['Creating valuable content to attract and engage audience', 'Paying for ads', 'Cold calling', 'Sending spam emails'], correctAnswer: 0, difficulty: 'medium', roleId: 'marketing-manager' },
  { id: 'mm7', question: 'What is conversion rate?', options: ['Percentage of visitors who complete a desired action', 'Currency exchange rate', 'Employee turnover rate', 'Page loading speed'], correctAnswer: 0, difficulty: 'medium', roleId: 'marketing-manager' },
  { id: 'mm8', question: 'What is a target audience?', options: ['A specific group of people most likely to buy your product', 'Everyone in the world', 'Only existing customers', 'Competitors'], correctAnswer: 0, difficulty: 'medium', roleId: 'marketing-manager' },
  // Hard
  { id: 'mm9', question: 'What is Customer Lifetime Value (CLV)?', options: ['Total revenue expected from a customer over their relationship', 'Customer age', 'Number of purchases', 'Time spent on website'], correctAnswer: 0, difficulty: 'hard', roleId: 'marketing-manager' },
  { id: 'mm10', question: 'What is attribution modeling?', options: ['Assigning credit to marketing touchpoints for conversions', 'Creating logos', 'Writing product descriptions', 'Managing inventory'], correctAnswer: 0, difficulty: 'hard', roleId: 'marketing-manager' },
];

export function Assessment() {
  const { selectedRole, profile, addAssessmentResult, assessmentResults, setCurrentView } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // Will be set when test starts

  // Get questions for selected role with adaptive difficulty (5-10 questions)
  const getQuestions = (): AssessmentQuestion[] => {
    const roleQuestions = QUESTIONS.filter(q => q.roleId === selectedRole);
    
    // If not enough role-specific questions, supplement with software engineer questions
    if (roleQuestions.length < 5) {
      const genericQuestions = QUESTIONS.filter(q => 
        q.roleId === 'software-engineer' || q.roleId === 'data-analyst'
      );
      return [...roleQuestions, ...genericQuestions].slice(0, 7);
    }

    // Adaptive difficulty distribution based on experience
    // More experienced users get harder questions and more total questions
    const experience = profile?.yearsOfExperience || 0;
    const confidence = profile?.confidenceLevel || 'medium';
    
    let distribution: { easy: number; medium: number; hard: number };
    
    if (experience < 2 || confidence === 'low') {
      // Beginners: 5 questions total (3 easy, 2 medium, 0 hard)
      distribution = { easy: 3, medium: 2, hard: 0 };
    } else if (experience < 4) {
      // Intermediate: 7 questions total (2 easy, 3 medium, 2 hard)
      distribution = { easy: 2, medium: 3, hard: 2 };
    } else if (experience < 7) {
      // Experienced: 8 questions total (2 easy, 3 medium, 3 hard)
      distribution = { easy: 2, medium: 3, hard: 3 };
    } else {
      // Expert: 10 questions total (2 easy, 4 medium, 4 hard)
      distribution = { easy: 2, medium: 4, hard: 4 };
    }

    const selected: AssessmentQuestion[] = [];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    
    // Shuffle questions within each difficulty for variety
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    difficulties.forEach(diff => {
      const diffQuestions = shuffleArray(roleQuestions.filter(q => q.difficulty === diff));
      const count = distribution[diff];
      selected.push(...diffQuestions.slice(0, count));
    });

    // Shuffle final selection to mix difficulties
    return shuffleArray(selected);
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (!hasStarted || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleComplete(newAnswers);
    }
  };

  const handleComplete = (finalAnswers: number[] = answers) => {
    const correctCount = finalAnswers.reduce((count, answer, index) => {
      return count + (questions[index]?.correctAnswer === answer ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / questions.length) * 100);
    let readinessLevel: AssessmentResult['readinessLevel'];
    
    if (score >= 80) {
      readinessLevel = 'Job Ready';
    } else if (score >= 50) {
      readinessLevel = 'Intermediate';
    } else {
      readinessLevel = 'Beginner';
    }

    const assessmentResult: AssessmentResult = {
      roleId: selectedRole || '',
      score,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      readinessLevel,
      completedAt: new Date(),
    };

    setResult(assessmentResult);
    addAssessmentResult(assessmentResult);
    setIsComplete(true);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setIsComplete(false);
    setResult(null);
    setTimeRemaining(0);
    setHasStarted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Check for existing results
  const existingResult = assessmentResults.find(r => r.roleId === selectedRole);

  if (!selectedRole) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg text-center py-12">
          <CardContent>
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">No Role Selected</h2>
            <p className="text-muted-foreground mb-6">
              Please select a target role in the Skill Analysis section first.
            </p>
            <Button onClick={() => setCurrentView('skill-analysis')}>
              Go to Skill Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show existing result or option to retake
  if (!hasStarted && existingResult && !isComplete) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assessment Results</h1>
          <p className="text-muted-foreground mt-1">Your previous assessment for this role</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              existingResult.readinessLevel === 'Job Ready' ? 'bg-green-100' :
              existingResult.readinessLevel === 'Intermediate' ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <Trophy className={`w-12 h-12 ${
                existingResult.readinessLevel === 'Job Ready' ? 'text-green-600' :
                existingResult.readinessLevel === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>

            <h2 className="text-4xl font-bold mb-2 text-foreground">{existingResult.score}%</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Readiness Level: <span className="font-semibold text-foreground">{existingResult.readinessLevel}</span>
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleRetake} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Retake Assessment
              </Button>
              <Button onClick={() => setCurrentView('upskilling')} className="gap-2">
                View Upskilling Plan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment start screen
  if (!hasStarted) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Role Assessment</h1>
          <p className="text-muted-foreground mt-1">Test your readiness for your target role</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              Complete this assessment to gauge your readiness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-foreground">{questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-foreground">{questions.length} min</div>
                <div className="text-sm text-muted-foreground">Time Limit</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-foreground">Adaptive</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-medium mb-2 text-foreground">What to expect:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Multiple choice questions based on your selected role</li>
                <li>Difficulty adapts to your experience level</li>
                <li>Results will show your readiness level</li>
                <li>You can retake the assessment anytime</li>
              </ul>
            </div>

            <Button onClick={() => {
              setTimeRemaining(questions.length * 60); // 1 minute per question
              setHasStarted(true);
            }} className="w-full h-12 gap-2">
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results screen
  if (isComplete && result) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assessment Complete!</h1>
          <p className="text-muted-foreground mt-1">Here are your results</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              result.readinessLevel === 'Job Ready' ? 'bg-green-100' :
              result.readinessLevel === 'Intermediate' ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {result.readinessLevel === 'Job Ready' ? (
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              ) : result.readinessLevel === 'Intermediate' ? (
                <Target className="w-12 h-12 text-yellow-600" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-red-600" />
              )}
            </div>

            <h2 className="text-4xl font-bold mb-2 text-foreground">{result.score}%</h2>
            <p className="text-xl text-muted-foreground mb-2">
              {result.correctAnswers} of {result.totalQuestions} correct
            </p>
            <p className="text-lg mb-6">
              Readiness Level: <span className={`font-bold ${
                result.readinessLevel === 'Job Ready' ? 'text-green-600' :
                result.readinessLevel === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
              }`}>{result.readinessLevel}</span>
            </p>

            <div className="p-4 rounded-xl bg-secondary/50 mb-6 text-left">
              <h4 className="font-medium mb-2 text-foreground">Recommendations:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {result.readinessLevel === 'Job Ready' ? (
                  <>
                    <li>You are ready to apply for jobs in this role</li>
                    <li>Continue practicing to maintain your skills</li>
                    <li>Consider pursuing advanced certifications</li>
                  </>
                ) : result.readinessLevel === 'Intermediate' ? (
                  <>
                    <li>Focus on areas where you scored lower</li>
                    <li>Complete the recommended upskilling plan</li>
                    <li>Retake the assessment after studying</li>
                  </>
                ) : (
                  <>
                    <li>Start with foundational courses</li>
                    <li>Build a strong base in core concepts</li>
                    <li>Practice regularly and track progress</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" onClick={handleRetake} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Retake Assessment
              </Button>
              <Button onClick={() => setCurrentView('upskilling')} className="gap-2">
                View Upskilling Plan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment in progress
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header with timer */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question {currentQuestionIndex + 1} of {questions.length}</h1>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 mt-2 w-48" />
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          timeRemaining < 60 ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-foreground'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Question */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              currentQuestion?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentQuestion?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentQuestion?.difficulty.charAt(0).toUpperCase() + currentQuestion?.difficulty.slice(1)}
            </span>
          </div>
          <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedAnswer === index
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={selectedAnswer === null}
          className="gap-2"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
