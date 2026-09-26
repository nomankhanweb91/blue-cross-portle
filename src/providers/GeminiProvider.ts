export interface AIRequestOptions {
  prompt: string;
  toolType: string;
  systemInstruction?: string;
}

export interface AIResponse {
  success: boolean;
  text: string;
  toolType: string;
  error?: string;
  isOfflineFallback?: boolean;
}

export class GeminiProvider {
  /**
   * Calls the server-side AI proxy route (/api/ai/generate).
   * In local/fullstack mode, the server uses @google/genai with 'gemini-3.8-flash'.
   * On static GitHub Pages hosting, it detects if the API is missing and provides a clear notice.
   */
  static async generate(options: AIRequestOptions): Promise<AIResponse> {
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      return {
        success: true,
        text: data.text,
        toolType: options.toolType,
      };
    } catch (err: any) {
      console.warn('GeminiProvider backend request failed, checking static fallback:', err);
      
      // If deployed on static host (e.g. GitHub Pages without server) or key not configured
      return {
        success: false,
        text: '',
        toolType: options.toolType,
        error: err?.message || 'Server AI endpoint unavailable. Please ensure GEMINI_API_KEY is configured in server environment secrets.',
      };
    }
  }

  // Pre-configured helper methods for the 17 AI tools requested
  static async writeArticle(topic: string, tone = 'Professional'): Promise<AIResponse> {
    return this.generate({
      toolType: 'ai-writer',
      prompt: `Write a well-structured, informative article about: "${topic}". Tone: ${tone}. Include key takeaways.`,
      systemInstruction: 'You are an expert editorial writer and researcher for Blue Cross India Super Portal.',
    });
  }

  static async rewrite(text: string, style = 'Clear and concise'): Promise<AIResponse> {
    return this.generate({
      toolType: 'rewriter',
      prompt: `Rewrite the following text with style: "${style}".\n\nText:\n${text}`,
      systemInstruction: 'You are an expert copy editor focusing on clarity, tone, and flow.',
    });
  }

  static async summarize(text: string, format = 'bullet points'): Promise<AIResponse> {
    return this.generate({
      toolType: 'summarizer',
      prompt: `Provide an executive summary of the following text in ${format}:\n\n${text}`,
      systemInstruction: 'You are a precise summarization engine providing high-signal insights without fluff.',
    });
  }

  static async translate(text: string, targetLanguage: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'translator',
      prompt: `Translate the following text accurately into ${targetLanguage}. Maintain cultural nuance and professional register:\n\n${text}`,
      systemInstruction: 'You are a professional multilingual translator specialized in Indian and global languages.',
    });
  }

  static async checkGrammar(text: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'grammar',
      prompt: `Analyze and correct the grammar, spelling, and punctuation of the following text. Provide the corrected version followed by brief explanations of key improvements:\n\n${text}`,
      systemInstruction: 'You are an expert proofreader and grammar specialist.',
    });
  }

  static async paraphrase(text: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'paraphraser',
      prompt: `Paraphrase the following passage with fresh phrasing while preserving the exact meaning and key facts:\n\n${text}`,
      systemInstruction: 'You are a master paraphrasing assistant.',
    });
  }

  static async humanize(text: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'humanizer',
      prompt: `Humanize the following text so it reads naturally, warmly, and authentically like an experienced human writer, removing robotic cliches and repetitive sentence structures:\n\n${text}`,
      systemInstruction: 'You transform overly structured AI drafts into natural, conversational, authentic prose.',
    });
  }

  static async generateTitles(topic: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'title-generator',
      prompt: `Generate 10 compelling, high-CTR, SEO-friendly headlines and titles for: "${topic}". Group them by style (Authoritative, How-To, Curiosity, Listicle).`,
      systemInstruction: 'You are a veteran headline copywriter and SEO strategist.',
    });
  }

  static async generateMetaDescription(pageTopic: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'meta-generator',
      prompt: `Generate 3 high-converting SEO meta descriptions (each strictly between 135 and 155 characters) for a webpage about: "${pageTopic}". Include relevant search terms and an actionable call-to-action.`,
      systemInstruction: 'You are an SEO metadata specialist complying with search engine snippet standards.',
    });
  }

  static async generateBlogOutline(topic: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'blog-outline',
      prompt: `Create a comprehensive, logical, SEO-optimized blog outline for: "${topic}". Include H1, H2 sections, H3 sub-points, and recommended FAQs.`,
      systemInstruction: 'You are a content architect and content strategist.',
    });
  }

  static async generateHashtags(topic: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'hashtag-generator',
      prompt: `Generate 25 high-reach, relevant, and categorized hashtags for social media posts about: "${topic}". Categorize by Broad, Niche, and Trending India.`,
      systemInstruction: 'You are a social media growth strategist.',
    });
  }

  static async generatePrompt(task: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'prompt-generator',
      prompt: `Engineer a production-grade system prompt and user prompt template for the following task: "${task}". Include role, context, constraints, input format, and expected output format.`,
      systemInstruction: 'You are an expert AI prompt engineer.',
    });
  }

  static async writeEmail(purpose: string, recipient = 'Colleague / Client'): Promise<AIResponse> {
    return this.generate({
      toolType: 'email-writer',
      prompt: `Write a polished, professional email for the following purpose: "${purpose}". Recipient: ${recipient}. Include subject line and closing.`,
      systemInstruction: 'You are an executive communications specialist.',
    });
  }

  static async writeResumeBulletPoints(role: string, achievements: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'resume-writer',
      prompt: `Transform these career details into high-impact, ATS-optimized resume bullet points using active action verbs and measurable impact metrics:\nRole: ${role}\nAchievements: ${achievements}`,
      systemInstruction: 'You are a professional executive resume writer and career coach.',
    });
  }

  static async generateJobDescription(jobTitle: string, industry: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'job-description',
      prompt: `Generate a comprehensive, competitive job description for: "${jobTitle}" in the "${industry}" industry. Include Role Overview, Core Responsibilities, Required Qualifications, Nice-to-Haves, and Company Culture section.`,
      systemInstruction: 'You are a senior talent acquisition and HR director.',
    });
  }

  static async generateProductDescription(productName: string, features: string): Promise<AIResponse> {
    return this.generate({
      toolType: 'product-description',
      prompt: `Write an engaging, persuasive e-commerce product description for: "${productName}". Key Features: ${features}. Include an opening hook, bullet points of tangible benefits, specifications, and a compelling call to action.`,
      systemInstruction: 'You are a high-conversion e-commerce copywriter.',
    });
  }
}
