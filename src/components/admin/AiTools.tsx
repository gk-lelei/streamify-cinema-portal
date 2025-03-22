
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Play, 
  BarChart, 
  Search, 
  Film, 
  Users, 
  Check, 
  AlertTriangle,
  Loader,
  MessageSquare
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const AiTools = () => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('content-assistant');

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    
    // Simulate AI response based on the active tool
    setTimeout(() => {
      let response = '';
      
      switch (activeTool) {
        case 'content-assistant':
          response = generateContentAssistantResponse(aiPrompt);
          break;
        case 'content-moderation':
          response = generateModerationResponse(aiPrompt);
          break;
        case 'audience-insights':
          response = generateAudienceInsightsResponse(aiPrompt);
          break;
        case 'metadata-generator':
          response = generateMetadataResponse(aiPrompt);
          break;
        default:
          response = `Analysis for "${aiPrompt}":\n\nThe requested content seems to align with our platform's guidelines. Based on our current library and user preferences, this would likely receive a 78% engagement rate. Consider featuring this prominently for users in the 25-34 demographic. Recommendation: Approve for production.`;
      }
      
      setAiResponse(response);
      setIsAiLoading(false);
      
      toast({
        title: "AI Analysis Complete",
        description: "The AI has finished analyzing your request.",
      });
    }, 2000);
  };

  const generateContentAssistantResponse = (prompt: string) => {
    if (prompt.toLowerCase().includes('recommendation') || prompt.toLowerCase().includes('suggest')) {
      return `Content Recommendations Based on Your Query:

Based on your request for "${prompt}", here are content recommendations:

1. "The Quantum Conspiracy" - A sci-fi thriller that would appeal to your current audience segment
2. "Echoes of Tomorrow" - Similar thematic elements to your existing popular content
3. "The Last Pioneer" - High engagement potential based on current trends

Audience match score: 87%
Predicted engagement rate: 73%
Content gap opportunity: HIGH

I also recommend targeting the 25-34 demographic with these selections, as they show the highest interest in similar content.`;
    } else if (prompt.toLowerCase().includes('script') || prompt.toLowerCase().includes('review')) {
      return `Script Analysis Report:

I've analyzed the script/content described in "${prompt}".

Strengths:
• Strong character development in the first and third acts
• Engaging dialogue with natural conversational flow
• Innovative plot structure that maintains tension

Areas for improvement:
• Second act pacing issues - consider condensing by 5-7 minutes
• Supporting character motivations need clarification
• Consider strengthening the climactic sequence

Audience appeal: Strong for 18-35 demographic
Similar successful content: "The Meridian Project", "Nightfall Sequence"
Recommendation: Approve with minor revisions`;
    } else {
      return `Content Strategy Analysis:

Based on your input "${prompt}", I've developed the following strategic recommendations:

Content Opportunities:
• Documentary series on technology pioneers (High engagement potential)
• Comedy specials focusing on workplace humor (Addressing content gap)
• Short-form sci-fi anthology series (Trending with key demographics)

Platform Positioning:
This content strategy would differentiate your platform by targeting underserved audience segments while maintaining appeal to your core viewers.

Implementation Timeline:
• Phase 1: Launch 2 documentary episodes and 1 comedy special (Q3)
• Phase 2: Expand to sci-fi anthology with weekly releases (Q4)
• Phase 3: Evaluate performance and adjust strategy (Q1 next year)

Expected impact: 12-15% increase in viewer retention and 8% growth in new subscriptions.`;
    }
  };

  const generateModerationResponse = (prompt: string) => {
    return `Content Moderation Analysis:

I've reviewed the content described in "${prompt}" against platform guidelines and standards.

Content Rating: PG-13

Policy Compliance:
✅ Violence: Moderate, within acceptable limits
✅ Language: Minor profanity, appropriate for rating
✅ Themes: Complex but appropriate for target audience
⚠️ Substance use: Depicts alcohol consumption (flagged for review)

The content meets all essential platform guidelines, though there is one area flagged for manual review by the moderation team.

Recommendation: APPROVE WITH NOTICE
Additional action: Add content warning regarding substance use`;
  };

  const generateAudienceInsightsResponse = (prompt: string) => {
    return `Audience Analysis for "${prompt}":

Target Demographic Breakdown:
• Primary: Adults 25-34 (42% of projected audience)
• Secondary: Adults 35-44 (27% of projected audience)
• Additional: Adults 18-24 (18% of projected audience)

Geographic Hotspots:
• Urban centers (63%)
• Suburban areas (31%)
• Rural areas (6%)

Viewing Patterns:
• Peak viewing: Weekends, 8-11pm
• Binge probability: High (72%)
• Social sharing potential: Very High

Comparison to Platform Averages:
This content is projected to perform 23% above average for total views and 17% above average for completion rate.

Recommendation: Schedule release for Friday to maximize weekend viewing potential.`;
  };

  const generateMetadataResponse = (prompt: string) => {
    return `Metadata Optimization for "${prompt}":

Title Recommendations:
• Primary: "${prompt}" (Original)
• SEO Alternative: "${prompt}: A New Beginning"
• International: "${prompt} - The Journey Begins"

Description:
I've generated an optimized description that balances emotional appeal with SEO value:

"In a world where nothing is as it seems, ${prompt} takes viewers on an unforgettable journey through time and space. When a mysterious event changes everything, unlikely heroes must rise to face challenges beyond imagination. From the acclaimed creators of [Similar Content], comes a story that will redefine the genre."

Tags: adventure, mystery, science fiction, drama, thriller, [genre-specific]

Thumbnail Recommendations:
• Feature protagonist in dramatic pose with moody lighting
• Include high-contrast title overlay
• Use blue/orange color scheme for maximum psychological impact

A/B testing recommended for final thumbnail selection.`;
  };

  const aiTools = [
    {
      id: 'content-assistant',
      name: 'Content Assistant',
      icon: <Bot />,
      description: 'Get recommendations and analysis for new content'
    },
    {
      id: 'content-moderation',
      name: 'Content Moderation',
      icon: <Check />,
      description: 'Automatically check content against platform guidelines'
    },
    {
      id: 'audience-insights',
      name: 'Audience Insights',
      icon: <BarChart />,
      description: 'Analyze potential audience and engagement for content'
    },
    {
      id: 'metadata-generator',
      name: 'Metadata Generator',
      icon: <Sparkles />,
      description: 'Generate optimized titles, descriptions and tags'
    }
  ];

  const getSamplePrompts = () => {
    switch (activeTool) {
      case 'content-assistant':
        return [
          "Recommend content similar to 'Inception'",
          "Review this script idea about time travel",
          "Suggest new sci-fi series concepts"
        ];
      case 'content-moderation':
        return [
          "Check this drama about addiction for appropriate content rating",
          "Review this comedy special for policy violations",
          "Evaluate this action sequence for violence rating"
        ];
      case 'audience-insights':
        return [
          "Analyze audience for a documentary about climate change",
          "Predict viewer demographics for a cooking competition show",
          "Estimate engagement for a new superhero franchise"
        ];
      case 'metadata-generator':
        return [
          "Generate metadata for a mystery thriller set in Paris",
          "Create optimized title and description for sci-fi comedy",
          "Develop tags for a historical drama series"
        ];
      default:
        return [
          "Suggest similar content to Inception",
          "Check this script for inappropriate content",
          "Predict viewer demographics for this trailer"
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">AI Content Tools</h2>
        <p className="text-muted-foreground">
          Leverage artificial intelligence to optimize content strategy, automate moderation, 
          and gain audience insights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiTools.map((tool) => (
          <button
            key={tool.id}
            className={`p-6 rounded-lg border ${
              activeTool === tool.id
                ? 'border-primary bg-primary/10'
                : 'border-white/10 hover:border-white/20'
            } transition-colors duration-200 text-left`}
            onClick={() => setActiveTool(tool.id)}
          >
            <div className="flex flex-col items-start space-y-2">
              <div className={`p-2 rounded-full ${
                activeTool === tool.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-background text-muted-foreground'
              }`}>
                {tool.icon}
              </div>
              <h3 className="font-medium">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            <span>{aiTools.find(t => t.id === activeTool)?.name || 'AI Tool'}</span>
          </h3>
          
          <form onSubmit={handleAiSubmit} className="space-y-4">
            <div>
              <label htmlFor="ai-prompt" className="block text-sm font-medium mb-2">
                What would you like to analyze?
              </label>
              <Textarea
                id="ai-prompt"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={`e.g., ${getSamplePrompts()[0]}`}
                className="h-32 bg-background border-white/20"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isAiLoading || !aiPrompt.trim()}
            >
              {isAiLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Sample prompts:</h4>
              <div className="flex flex-wrap gap-2">
                {getSamplePrompts().map((prompt, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAiPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
            <span>AI Response</span>
          </h3>
          
          <div className="p-4 h-[380px] bg-background/50 border border-white/10 rounded-md overflow-y-auto">
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader className="h-10 w-10 animate-spin text-primary" />
                <div className="text-center">
                  <p className="text-lg font-medium">Processing your request</p>
                  <p className="text-sm text-muted-foreground">The AI is analyzing your content...</p>
                </div>
              </div>
            ) : aiResponse ? (
              <pre className="whitespace-pre-wrap text-sm font-sans">{aiResponse}</pre>
            ) : (
              <div className="text-muted-foreground text-center h-full flex items-center justify-center">
                <div>
                  <Bot className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg">AI responses will appear here</p>
                  <p className="text-sm">Submit a prompt to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-500">AI Tool Usage Guidelines</h4>
            <p className="text-sm text-muted-foreground mt-1">
              AI suggestions should be reviewed by a human before implementation. The AI assistant is
              designed to provide recommendations, but final decisions should always include human oversight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
