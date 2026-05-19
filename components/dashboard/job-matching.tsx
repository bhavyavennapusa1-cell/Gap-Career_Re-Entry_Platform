"use client";

import { useApp } from '@/lib/context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  Building2,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

export function JobMatching() {
  const { user, jobMatches, profile, skillAnalysis } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobMatches.filter(job => {
    if (selectedFilter !== 'all' && job.workType !== selectedFilter) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Job Matches</h1>
        <p className="text-muted-foreground mt-1">
          Find opportunities that match your profile
        </p>
      </div>

      {/* Performance Indicators */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Match Relevance Score</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                {skillAnalysis?.overallMatchPercentage || 72}%
              </span>
              <Progress value={skillAnalysis?.overallMatchPercentage || 72} className="flex-1 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Skill Improvement</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-accent">+25%</span>
              <Progress value={25} className="flex-1 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Readiness Indicator</div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-primary">Intermediate</span>
              <Badge variant="secondary">Growing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2">
                {['all', 'remote', 'hybrid', 'onsite'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job List */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <Card key={job.id} className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Job Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {job.workType}
                        </Badge>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-center ${getMatchColor(job.matchScore)}`}>
                      <div className="text-2xl font-bold">{job.matchScore}%</div>
                      <div className="text-xs">Match</div>
                    </div>
                  </div>

                  {/* Skills Match */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-foreground">Skills Matched</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsMatched.map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-green-100 text-green-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-foreground">Skills to Develop</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsMissing.map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-red-100 text-red-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Apply Section */}
                <div className="lg:w-64 p-6 bg-secondary/30 flex flex-col justify-center items-center gap-4">
                  <Button className="w-full gap-2">
                    <Briefcase className="w-4 h-4" />
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
