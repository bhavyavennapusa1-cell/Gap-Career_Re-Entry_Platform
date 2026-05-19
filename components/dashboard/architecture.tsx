"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Server, 
  Database, 
  Brain, 
  Cloud, 
  Shield,
  Zap,
  ArrowRight,
  ArrowDown,
  Layers,
  Code,
  Cpu,
  HardDrive,
  Globe
} from 'lucide-react';

const architectureLayers = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: 'bg-blue-500',
    technologies: [
      { name: 'React / Next.js', description: 'Modern UI framework with SSR' },
      { name: 'Flutter', description: 'Cross-platform mobile development' },
      { name: 'Tailwind CSS', description: 'Utility-first styling' },
      { name: 'TypeScript', description: 'Type-safe development' },
    ],
    description: 'Responsive web and mobile applications with modern UI/UX'
  },
  {
    title: 'Backend Services',
    icon: Server,
    color: 'bg-green-500',
    technologies: [
      { name: 'Node.js / Express', description: 'API server and routing' },
      { name: 'Django / FastAPI', description: 'Python backend alternative' },
      { name: 'GraphQL', description: 'Flexible data querying' },
      { name: 'REST APIs', description: 'Standard HTTP endpoints' },
    ],
    description: 'Scalable microservices handling business logic'
  },
  {
    title: 'Database Layer',
    icon: Database,
    color: 'bg-purple-500',
    technologies: [
      { name: 'PostgreSQL', description: 'Primary relational database' },
      { name: 'MongoDB', description: 'NoSQL for flexible schemas' },
      { name: 'Redis', description: 'Caching and session storage' },
      { name: 'Elasticsearch', description: 'Full-text search engine' },
    ],
    description: 'Hybrid database architecture for optimal performance'
  },
  {
    title: 'AI/ML Module',
    icon: Brain,
    color: 'bg-pink-500',
    technologies: [
      { name: 'Python', description: 'ML model development' },
      { name: 'TensorFlow / PyTorch', description: 'Deep learning frameworks' },
      { name: 'Scikit-learn', description: 'Traditional ML algorithms' },
      { name: 'OpenAI API', description: 'LLM integration' },
    ],
    description: 'AI-powered skill analysis and job matching'
  },
  {
    title: 'Cloud Infrastructure',
    icon: Cloud,
    color: 'bg-orange-500',
    technologies: [
      { name: 'AWS / GCP', description: 'Primary cloud providers' },
      { name: 'Load Balancer', description: 'Traffic distribution' },
      { name: 'Auto-scaling', description: 'Dynamic resource allocation' },
      { name: 'CDN', description: 'Global content delivery' },
    ],
    description: 'Scalable cloud infrastructure with high availability'
  },
];

const dataFlow = [
  { from: 'User', to: 'Load Balancer', label: 'HTTPS Request' },
  { from: 'Load Balancer', to: 'API Gateway', label: 'Route Traffic' },
  { from: 'API Gateway', to: 'Microservices', label: 'Process Request' },
  { from: 'Microservices', to: 'AI Module', label: 'Skill Analysis' },
  { from: 'AI Module', to: 'Database', label: 'Store Results' },
];

export function Architecture() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Architecture</h1>
        <p className="text-muted-foreground mt-1">
          Scalable infrastructure powering the Gap platform
        </p>
      </div>

      {/* Architecture Overview */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Architecture Overview
          </CardTitle>
          <CardDescription>
            Modern microservices architecture with AI capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Visual Diagram */}
          <div className="relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-rows-5 relative">
              {architectureLayers.map((layer, index) => (
                <div 
                  key={layer.title}
                  className={`relative ${index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'}`}
                >
                  {/* Connector Arrow (Desktop) */}
                  {index < architectureLayers.length - 1 && (
                    <div className="hidden lg:flex absolute left-1/2 top-full -translate-x-1/2 z-10 h-8 items-center justify-center">
                      <ArrowDown className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  
                  <Card className={`border-2 border-transparent hover:border-primary/20 transition-all`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${layer.color} flex items-center justify-center shrink-0`}>
                          <layer.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-1 text-foreground">{layer.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {layer.technologies.map(tech => (
                              <div 
                                key={tech.name}
                                className="group relative"
                              >
                                <Badge variant="secondary" className="cursor-help">
                                  {tech.name}
                                </Badge>
                                <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg whitespace-nowrap z-20">
                                  {tech.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Data Flow
          </CardTitle>
          <CardDescription>How data moves through the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4">
            {dataFlow.map((flow, index) => (
              <div key={index} className="flex items-center gap-2 lg:gap-4">
                <div className="px-4 py-2 rounded-xl bg-secondary">
                  <span className="text-sm font-medium text-foreground">{flow.from}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">{flow.label}</span>
                </div>
                {index === dataFlow.length - 1 && (
                  <div className="px-4 py-2 rounded-xl bg-secondary">
                    <span className="text-sm font-medium text-foreground">{flow.to}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Global CDN</h3>
            <p className="text-sm text-muted-foreground">
              Content delivery network ensures fast loading times worldwide with edge caching.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Security First</h3>
            <p className="text-sm text-muted-foreground">
              End-to-end encryption, OAuth 2.0, and GDPR compliant data handling.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Auto-scaling</h3>
            <p className="text-sm text-muted-foreground">
              Automatic resource scaling based on demand with Kubernetes orchestration.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <HardDrive className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Data Redundancy</h3>
            <p className="text-sm text-muted-foreground">
              Multi-region database replication ensures 99.99% data availability.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">AI Microservice</h3>
            <p className="text-sm text-muted-foreground">
              Dedicated Python-based AI service for skill analysis and job matching.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">CI/CD Pipeline</h3>
            <p className="text-sm text-muted-foreground">
              Automated testing and deployment with GitHub Actions and containerization.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Technology Stack Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Frontend</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  React / Next.js
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Flutter (Mobile)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  TypeScript
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Backend</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Node.js / Express
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Django / FastAPI
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  GraphQL
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  REST APIs
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Database</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  PostgreSQL
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  MongoDB
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Redis
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Elasticsearch
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Infrastructure</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  AWS / GCP
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Kubernetes
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Docker
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Terraform
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
