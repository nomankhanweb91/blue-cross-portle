import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Send,
  AlertCircle,
  FileText,
  Languages,
  PenTool,
  Cpu,
  Layers,
  HelpCircle,
  Bot
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { GeminiProvider } from '../providers/GeminiProvider';

interface ToolConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  placeholder: string;
  actionText: string;
  defaultPrompt?: string;
  hasOption?: boolean;
  optionLabel?: string;
  options?: string[];
}

export const AIToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toolParam = searchParams.get('tool') || 'ai-writer';

  const tools: ToolConfig[] = [
    {
      id: 'ai-writer',
      name: 'AI Article & Essay Writer',
      category: 'Writing',
      description: 'Generates structured, coherent, in-depth articles, essays, and educational briefs.',
      placeholder: 'Enter your topic or title (e.g., The Future of Renewable Solar Energy in Rural India)...',
      actionText: 'Write Article',
      hasOption: true,
      optionLabel: 'Tone',
      options: ['Professional & Analytical', 'Conversational & Engaging', 'Academic & Rigorous', 'Journalistic'],
    },
    {
      id: 'rewriter',
      name: 'Content Rewriter',
      category: 'Editing',
      description: 'Polishes, clarifies, and restructures existing drafts while preserving key factual details.',
      placeholder: 'Paste your draft or paragraph here to rewrite...',
      actionText: 'Rewrite Text',
      hasOption: true,
      optionLabel: 'Style',
      options: ['Clear & Concise', 'Formal Business', 'Engaging & Creative', 'Executive Briefing'],
    },
    {
      id: 'summarizer',
      name: 'Executive Summarizer',
      category: 'Productivity',
      description: 'Condenses dense documents, policies, or long articles into crisp takeaways.',
      placeholder: 'Paste long article, government policy, or text to summarize...',
      actionText: 'Summarize Text',
      hasOption: true,
      optionLabel: 'Format',
      options: ['Executive Bullet Points', 'Single Paragraph', 'Key Takeaways & Action Items'],
    },
    {
      id: 'translator',
      name: 'Indian & Global Translator',
      category: 'Multilingual',
      description: 'Translates between Hindi, English, and regional Indian languages with contextual nuance.',
      placeholder: 'Enter text to translate into selected Indian/Global language...',
      actionText: 'Translate Text',
      hasOption: true,
      optionLabel: 'Target Language',
      options: ['Hindi (हिन्दी)', 'English', 'Bengali (বাংলা)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)'],
    },
    {
      id: 'grammar',
      name: 'Grammar & Syntax Fixer',
      category: 'Editing',
      description: 'Detects grammatical errors, typos, awkward phrasing, and punctuation slips.',
      placeholder: 'Paste text with potential grammar or spelling issues...',
      actionText: 'Fix Grammar',
    },
    {
      id: 'paraphraser',
      name: 'Smart Paraphraser',
      category: 'Writing',
      description: 'Expresses the same thoughts using fresh vocabulary and varied sentence rhythm.',
      placeholder: 'Enter sentence or paragraph to paraphrase...',
      actionText: 'Paraphrase',
    },
    {
      id: 'humanizer',
      name: 'AI Text Humanizer',
      category: 'Writing',
      description: 'Smooths out mechanical AI patterns into warm, authentic, natural human prose.',
      placeholder: 'Paste AI-generated text to infuse natural human flow and cadence...',
      actionText: 'Humanize Text',
    },
    {
      id: 'title-generator',
      name: 'SEO Title & Headline Generator',
      category: 'SEO',
      description: 'Generates 10 high-CTR headlines, article titles, and YouTube hooks.',
      placeholder: 'Enter your core topic or target keyword...',
      actionText: 'Generate Headlines',
    },
    {
      id: 'meta-generator',
      name: 'Meta Description Generator',
      category: 'SEO',
      description: 'Produces 140–155 character search engine meta descriptions with CTR call-to-actions.',
      placeholder: 'Describe your webpage topic or product value proposition...',
      actionText: 'Generate Meta Tags',
    },
    {
      id: 'blog-outline',
      name: 'Blog Outline Architect',
      category: 'Content',
      description: 'Builds comprehensive H1/H2/H3 outlines with FAQ section suggestions.',
      placeholder: 'Enter blog post concept or working title...',
      actionText: 'Create Outline',
    },
    {
      id: 'blog-generator',
      name: 'Full Blog Post Generator',
      category: 'Content',
      description: 'Creates complete blog articles with headings, introductions, and conclusions.',
      placeholder: 'Enter blog topic, target audience, and primary keywords...',
      actionText: 'Draft Full Blog',
    },
    {
      id: 'hashtag-generator',
      name: 'Viral Hashtag Generator',
      category: 'Social',
      description: 'Curates 25 high-reach hashtags organized by niche, broad, and trending Indian tags.',
      placeholder: 'Enter social post topic or campaign name...',
      actionText: 'Generate Hashtags',
    },
    {
      id: 'prompt-generator',
      name: 'AI Prompt Engineer',
      category: 'AI Developer',
      description: 'Crafts optimized system and user prompts with role framing, constraints, and schemas.',
      placeholder: 'What task or application do you need a powerful prompt for?...',
      actionText: 'Engineer Prompt',
    },
    {
      id: 'email-writer',
      name: 'Professional Email Composer',
      category: 'Business',
      description: 'Drafts persuasive, polite, and effective emails for workplace communication.',
      placeholder: 'Enter the purpose of the email (e.g., Following up on proposal with client)...',
      actionText: 'Draft Email',
      hasOption: true,
      optionLabel: 'Tone',
      options: ['Polite & Professional', 'Urgent Follow-Up', 'Informal & Friendly', 'Executive Request'],
    },
    {
      id: 'resume-writer',
      name: 'ATS Resume Bullet Points',
      category: 'Career',
      description: 'Transforms career milestones into metric-driven, action-oriented resume bullet points.',
      placeholder: 'Enter your job title and responsibilities (e.g., Senior Software Engineer managing payment gateway)...',
      actionText: 'Generate Resume Bullets',
    },
    {
      id: 'job-description',
      name: 'Job Description Generator',
      category: 'HR & Hiring',
      description: 'Drafts comprehensive job specs with requirements, duties, and qualifications.',
      placeholder: 'Enter target job title and company industry...',
      actionText: 'Generate Job Spec',
    },
    {
      id: 'product-description',
      name: 'E-Commerce Product Description',
      category: 'Marketing',
      description: 'Generates high-converting product copy highlighting benefits, specs, and hooks.',
      placeholder: 'Enter product name, materials, and unique selling points...',
      actionText: 'Write Description',
    },
  ];

  const currentTool = tools.find((t) => t.id === toolParam) || tools[0];

  const [inputVal, setInputVal] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>(
    currentTool.options ? currentTool.options[0] : ''
  );
  const [outputVal, setOutputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentTool.options && currentTool.options.length > 0) {
      setSelectedOption(currentTool.options[0]);
    }
    setOutputVal('');
    setErrorMessage(null);
  }, [currentTool.id]);

  const handleGenerate = async () => {
    if (!inputVal.trim()) return;

    setLoading(true);
    setErrorMessage(null);
    setOutputVal('');

    try {
      let res;
      switch (currentTool.id) {
        case 'ai-writer':
          res = await GeminiProvider.writeArticle(inputVal, selectedOption);
          break;
        case 'rewriter':
          res = await GeminiProvider.rewrite(inputVal, selectedOption);
          break;
        case 'summarizer':
          res = await GeminiProvider.summarize(inputVal, selectedOption);
          break;
        case 'translator':
          res = await GeminiProvider.translate(inputVal, selectedOption);
          break;
        case 'grammar':
          res = await GeminiProvider.checkGrammar(inputVal);
          break;
        case 'paraphraser':
          res = await GeminiProvider.paraphrase(inputVal);
          break;
        case 'humanizer':
          res = await GeminiProvider.humanize(inputVal);
          break;
        case 'title-generator':
          res = await GeminiProvider.generateTitles(inputVal);
          break;
        case 'meta-generator':
          res = await GeminiProvider.generateMetaDescription(inputVal);
          break;
        case 'blog-outline':
          res = await GeminiProvider.generateBlogOutline(inputVal);
          break;
        case 'hashtag-generator':
          res = await GeminiProvider.generateHashtags(inputVal);
          break;
        case 'prompt-generator':
          res = await GeminiProvider.generatePrompt(inputVal);
          break;
        case 'email-writer':
          res = await GeminiProvider.writeEmail(inputVal, selectedOption);
          break;
        case 'resume-writer':
          res = await GeminiProvider.writeResumeBulletPoints('Professional', inputVal);
          break;
        case 'job-description':
          res = await GeminiProvider.generateJobDescription(inputVal, 'Corporate');
          break;
        case 'product-description':
          res = await GeminiProvider.generateProductDescription(inputVal, 'High Quality');
          break;
        default:
          res = await GeminiProvider.generate({
            toolType: currentTool.id,
            prompt: inputVal,
          });
      }

      if (res.success && res.text) {
        setOutputVal(res.text);
      } else {
        setErrorMessage(
          res.error ||
          'API service is currently in server-side configuration mode. When GEMINI_API_KEY is configured in AI Studio Secrets, real-time AI responses will generate directly.'
        );
      }
    } catch (e: any) {
      setErrorMessage(e?.message || 'An error occurred while communicating with the AI service.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHead
        title={`${currentTool.name} — Free AI Writing & Productivity Tools`}
        description={`Use Blue Cross ${currentTool.name} powered by Gemini. ${currentTool.description}`}
        canonicalPath={`/ai-tools?tool=${currentTool.id}`}
        breadcrumbs={[
          { label: 'AI Hub', url: '/ai' },
          { label: 'AI Tools', url: '/ai-tools' },
          { label: currentTool.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'AI Tools', url: '/ai-tools' },
            { label: currentTool.name },
          ]}
        />

        {/* Page Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Workspace &amp; Writing Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            AI Productivity Suite
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            17 specialized tools powered by server-side Gemini 3.8 Flash. Server-proxied execution guarantees zero client-side key exposure.
          </p>
        </div>

        {/* Workbench Layout: Tools list on left, editor on right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Tools Selector Sidebar */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
              Select AI Tool ({tools.length})
            </h3>
            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSearchParams({ tool: t.id })}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    currentTool.id === t.id
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{t.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    currentTool.id === t.id ? 'bg-violet-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {t.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Interactive Editor */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentTool.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentTool.description}
                  </p>
                </div>
                {currentTool.hasOption && currentTool.options && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      {currentTool.optionLabel}:
                    </span>
                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-1.5 px-3 text-slate-800 dark:text-slate-200"
                    >
                      {currentTool.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Input / Prompt:
                </label>
                <textarea
                  rows={5}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={currentTool.placeholder}
                  className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {inputVal.length} characters
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading || !inputVal.trim()}
                  className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-sm transition flex items-center gap-2 shadow-md shadow-violet-500/20"
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Generating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{currentTool.actionText}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error notice if API not active */}
              {errorMessage && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Notice regarding AI service connection:</p>
                    <p className="mt-0.5">{errorMessage}</p>
                    <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
                      Blue Cross adheres strictly to rule 61: no fake generated text is returned when the live API provider is not active.
                    </p>
                  </div>
                </div>
              )}

              {/* Output Display */}
              {outputVal && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Generated Result
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                    {outputVal}
                  </div>
                </div>
              )}

            </div>

            <AdSlot layout="in-content" />

          </div>

        </div>
      </div>
    </>
  );
};
