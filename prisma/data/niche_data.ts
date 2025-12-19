
// Curated "Senior Content Strategist" Data
// Focus: Faceless, High-End, Specific, Actionable without fluff.

export interface ExpertNiche {
    name: string;
    category: string;
    description: string;
    detailedExplanation: string;
    whyItWorks: string;
    contentStyle: string;
    monetizationStrategy: string;
    revenueEstimate: string; // Used for Card Display ($X - $Y)
    estimatedRevenue?: string; // Optional detailed field
    cpmEstimate?: string;
    difficulty?: string;
    equipmentNeeded: string;
    videoIdeas: { title: string; type: string }[];
    growthTips: string;
    trendScore?: number;
    isTrending?: boolean;
    tags?: string[];
}

export const expertNiches: ExpertNiche[] = [
    // ----------------------
    // TECH & AI
    // ----------------------
    {
        name: 'AI Tool Tutorials',
        category: 'Tech & AI',
        trendScore: 98,
        isTrending: true,
        revenueEstimate: '$5,000 - $25,000/mo',
        cpmEstimate: '$15 - $35',
        description: 'A high-demand niche focusing on "How-to" guides for the exploding AI software market. Perfect for faceless screen-recording content.',
        detailedExplanation: `The **AI Tool Tutorials** niche is currently the "Gold Rush" of YouTube. Every day, new AI tools are released, and millions of people search for how to use them. You don't need a camera—just a screen recorder and a decent microphone. 
        
        The key differentiation here is **speed** and **clarity**. If you can release a 5-minute tutorial on a new tool within 48 hours of its launch, you will capture the initial search wave.`,
        whyItWorks: `• **High Intent:** Viewers are looking to solve a specific problem, not just be entertained.\n• **Affiliate Potential:** Almost every AI tool has a recurring commission affiliate program.\n• **Low Production Cost:** No expensive camera or B-roll needed, just your screen.`,
        contentStyle: `clean, distinct screen recording (1080p+). Zoom in on buttons/actions. Fast-paced. No "Hey guys, welcome back" fluff—start the tutorial immediately.`,
        monetizationStrategy: `**Affiliate Marketing** (Jasper, Midjourney, hosting, VPNs). **Sponsorships** from new AI SaaS companies. **AdSense** (High CPM due to tech keywords).`,
        difficulty: 'Easy',
        equipmentNeeded: `OBS Studio (Free), High-quality Mic (Blue Yeti/Shure), Editing Software (Davinci Resolve).`,
        videoIdeas: [
            { title: 'Midjourney v6 vs DALL-E 3: Which is Better?', type: 'Comparison' },
            { title: 'How to Build a Website with AI in 10 Minutes', type: 'Tutorial' },
            { title: 'Top 5 Free AI Tools for Productivity', type: 'Listicle' },
            { title: 'ChatGPT Prompts for Making Money', type: 'Guide' },
            { title: 'Is AI Replacing Programmers?', type: 'Commentary' }
        ],
        growthTips: `Target long-tail keywords ("How to use X for Y"). Create "vs" comparison videos to hijack traffic from two popular tools.`,
        tags: ["AI", "TechTutorial", "ArtificialIntelligence", "ChatGPT", "Midjourney", "software review", "tech tips", "productivity"]
    },

    // ----------------------
    // CRIME
    // ----------------------
    {
        name: 'True Crime Documentaries',
        category: 'History & Mystery',
        trendScore: 95,
        isTrending: true,
        revenueEstimate: '$10,000 - $50,000/mo',
        cpmEstimate: '$8 - $18',
        description: 'Deep-dive storytelling about solved and unsolved cases. High retention, binge-worthy content.',
        detailedExplanation: 'True Crime is the "Netflix" of YouTube. Viewers come for 30-60 minute deep dives. The "Faceless" aspect works perfectly because the visual focus is on evidence, maps, and archival footage, not the narrator.',
        whyItWorks: '• **Storytelling:** Humans are wired for stories.\n• **Binge Factor:** Once someone finds your channel, they watch 10 videos in a row.\n• **Community:** massive online sleuthing community engages in comments.',
        contentStyle: 'Dark, moody atmosphere. Slow pacing. Ken Burns effect on photos. sombre music. Voiceover must be serious and respectful.',
        monetizationStrategy: 'AdSense (Volume is huge). Sponsorships (VPNs, Games like Hunt a Killer). Merchandise (Hoodies).',
        difficulty: 'Hard',
        equipmentNeeded: 'Professional Scriptwriter (or high skill), Good Narrator, Access to archives (Newspapers.com), Advanced Editing.',
        videoIdeas: [
            { title: 'The Disappearance of Flight 370: New Evidence', type: 'Deep Dive' },
            { title: 'Who Was the Zodiac Killer? (Solved?)', type: 'Theory' },
            { title: 'The Dark Truth Behind [Famous Event]', type: 'Expose' },
            { title: 'Cold Case Files: The Boy in the Box', type: 'Documentary' },
            { title: 'Interrogation Analysis: Guilty or Innocent?', type: 'Psychology' }
        ],
        growthTips: `Focus on "Unsolved" mysteries to drive comment engagement. Use "jigsaw puzzle" thumbnails that create curiosity.`,
        tags: ["TrueCrime", "Documentary", "UnsolvedMysteries", "CrimeStories", "Mystery", "storytelling", "suspense", "dark history"]
    },

    // ----------------------
    // HEALTH
    // ----------------------
    {
        name: 'Mindfulness & Meditation',
        category: 'Health & Wellness',
        trendScore: 92,
        isTrending: true,
        revenueEstimate: '$2,000 - $8,000/mo',
        cpmEstimate: '$4 - $10',
        description: 'Audio-first niche focusing on sleep, relaxation, and guided meditation.',
        detailedExplanation: 'In a high-stress world, this niche provides a sanctuary. It is unique because it is an "utility" channel—people use it to fall asleep every single night. This guarantees returning viewers.',
        whyItWorks: '• **Re-watchability:** High.\n• **Passive:** Once uploaded, it earns forever.\n• **Universal:** No language barrier if focusing on music/sounds.',
        contentStyle: `High quality 4k loops. 528Hz frequency music. Soft spoken guided voiceovers.`,
        monetizationStrategy: `**AdSense** (Volume). **Affiliates** (BetterHelp, Calm App). **Selling MP3s** or long versions.`,
        difficulty: 'Easy',
        equipmentNeeded: `Logic Pro / FL Studio for audio mixing. Stock video subscription.`,
        videoIdeas: [
            { title: '10 Minute Morning Meditation for Positive Energy', type: 'Guided Meditation' },
            { title: 'Rain Sounds for Deep Sleep (Black Screen)', type: 'Soundscape' },
            { title: 'Remove Negative Energy: 432Hz Frequency', type: 'Sound Therapy' },
            { title: 'Guided Meditation for Anxiety Relief', type: 'Guided Meditation' },
            { title: 'Study Music: Lofi Hip Hop Mix', type: 'Music Mix' }
        ],
        growthTips: `SEO title stuffing is standard here (e.g., "Sleep, Relax, Insomnia, Calm"). Make thumbnails simple and peaceful.`,
        tags: ["Meditation", "Mindfulness", "Wellness", "Relaxation", "Sleep", "guided meditation", "sound therapy", "stress relief"]
    },

    // ----------------------
    // PSYCHOLOGY
    // ----------------------
    {
        name: "Stoicism & Philosophy",
        category: "Psychology & Self-Improvement",
        trendScore: 91,
        isTrending: true,
        revenueEstimate: '$6,000 - $18,000/mo',
        cpmEstimate: '$8 - $20',
        description: 'Ancient wisdom for modern problems. Highly trending with young men looking for purpose.',
        detailedExplanation: 'Stoicism has exploded in popularity. Channels repurpose quotes from Marcus Aurelius/Seneca and apply them to modern dating, business, and mental health. It acts as a "digital father figure".',
        whyItWorks: '• **Strong Identity:** Viewers identify as "Stoics".\n• **Simple Production:** Often just statues and text overlays.\n• **High Shareability:** Quotes get shared on social media.',
        contentStyle: 'Slow pans of classical statues (Greek/Roman). Deep, masculine voiceover. Dark background with white text. Minimalist music.',
        monetizationStrategy: 'AdSense. Merchandise (T-shirts/Posters with quotes). Private "Brotherhood" communities (Discord/Skool).',
        difficulty: 'Easy',
        equipmentNeeded: 'Midjourney (for generating statue art), Basic Editor, Deep voice actor (or ElevenLabs).',
        tags: ["Stoicism", "Philosophy", "SelfImprovement", "Mindset", "Wisdom", "Marcus Aurelius", "mental strength", "life lessons"],
        videoIdeas: [
            { title: "7 Stoic Rules That Will Change Your Life", type: "Listicle" },
            { title: "Marcus Aurelius: How To Build Mental Fortitude", type: "Biography" },
            { title: "Why Modern Men Are Unhappy (And How To Fix It)", type: "Commentary" },
            { title: "The Art of Not Caring: A Stoic Guide", type: "Guide" },
            { title: "Seneca’s Advice on Wasting Time", type: "Analysis" }
        ],
        growthTips: 'Focus on "Lists" (7 rules, 10 lessons). Use thumbnails with a dark, moody statue and bold yellow/white text. Keep videos 8-12 minutes.'
    },

    // ----------------------
    // LUXURY
    // ----------------------
    {
        name: 'Luxury Cars & Jets',
        category: 'Luxury & Lifestyle',
        trendScore: 88,
        isTrending: true,
        revenueEstimate: '$4,000 - $12,000/mo',
        cpmEstimate: '$10 - $25',
        description: 'Visual "wealth porn" showcasing the lifestyles of billionaires. High retention if edited well.',
        detailedExplanation: 'This niche taps into aspiration. Videos are compilations of expensive things: "Inside the $100M Yacht", "Most Expensive Car Collections". It requires good stock footage sourcing.',
        whyItWorks: '• **Aspiration:** Viewers want to fantasize about being rich.\n• **Broad Appeal:** Everyone wants to be rich.\n• **Evergreen:** A video about a Bugatti is relevant for years.',
        contentStyle: 'Cinematic stock footage (Pexels/Storyblocks). Upbeat, luxurious music. Fast cuts. Voiceover focused on specs and price tags.',
        monetizationStrategy: 'AdSense. Affiliate links for "Millionaire Mindset" books or courses.',
        difficulty: 'Medium',
        equipmentNeeded: 'Stock footage subscription is mandatory. Good color grading skills.',
        tags: ["Luxury", "Billionaire", "Lifestyle", "Wealth", "Aspiration", "expensive", "rich life", "money porn"],
        videoIdeas: [
            { title: 'Inside the $2 Billion Antilia Home', type: 'Tour' },
            { title: 'The Watch Collection of Sultan of Brunei', type: 'Showcase' },
            { title: 'Most Expensive Private Jets 2025', type: 'Listicle' },
            { title: 'A Day in the Life of Elon Musk', type: 'Biography' },
            { title: 'Why Rolex is a Non-Profit Company', type: 'Analysis' }
        ],
        growthTips: 'Thumbnails must scream wealth (Gold, massive numbers). Combine "Education" with "Luxury" (e.g., "The Tax Loophole of the Rich").'
    },

    // ----------------------
    // FINANCIAL
    // ----------------------
    {
        name: 'Billionaire Lifestyle',
        category: 'Luxury & Lifestyle',
        trendScore: 85,
        isTrending: false,
        revenueEstimate: '$8,000 - $25,000/mo',
        cpmEstimate: '$15 - $30',
        description: 'Financial escapism. Showcasing the most expensive things in the world.',
        detailedExplanation: 'Money porn. People love to see mansions, yachts, and watches they can\'t afford. It is aspirational content. The tone is sophisticated and awestruck.',
        whyItWorks: '• **Visual Eye Candy:** Very easy to watch.\n• **High Affiliate Ticket:** If you sell a luxury watch course or credit card, it pays well.\n• **Broad Appeal:** Everyone wants to be rich.',
        contentStyle: 'High-res footage of mansions/cars. Smooth transitions. Hip-hop instrumental or Lounge music. Voiceover listing features and prices.',
        monetizationStrategy: 'AdSense. Affiliate links for "How to get rich" courses (careful with vetting). Luxury accessory affiliates.',
        difficulty: 'Medium',
        equipmentNeeded: 'Stock footage subscription is mandatory. Good color grading skills.',
        videoIdeas: [
            { title: 'Inside the $2 Billion Antilia Home', type: 'Tour' },
            { title: 'The Watch Collection of Sultan of Brunei', type: 'Showcase' },
            { title: 'Most Expensive Private Jets 2025', type: 'Listicle' },
            { title: 'A Day in the Life of Elon Musk', type: 'Biography' },
            { title: 'Why Rolex is a Non-Profit Company', type: 'Analysis' }
        ],
        growthTips: 'Thumbnails must scream wealth (Gold, massive numbers). Combine "Education" with "Luxury" (e.g., "The Tax Loophole of the Rich").',
        tags: ["Luxury", "Billionaire", "Lifestyle", "Wealth", "Aspiration", "expensive", "rich life", "money porn"]
    },

    // ----------------------
    // GAMING
    // ----------------------
    {
        name: 'Minecraft Building Tutorials',
        category: 'Gaming & Entertainment',
        trendScore: 78,
        isTrending: false,
        revenueEstimate: '$5,000 - $15,000/mo',
        cpmEstimate: '$3 - $8',
        description: 'Relaxing, aesthetic building guides for the world\'s most popular game.',
        detailedExplanation: 'This is barely gaming; it is digital architecture. Viewers want to build beautiful houses in their worlds. No commentary is often preferred—just ASMR block placing and music.',
        whyItWorks: '• **Evergreen:** A "Modern House Tutorial" works forever.\n• **No Language Barrier:** visual-only guides reach the whole world.\n• **Relaxing:** Doubles as ASMR.',
        contentStyle: 'Replay Mod (Cinematic camera). Shaders (High-end graphics). Soft Lofi music. On-screen resource list.',
        monetizationStrategy: 'AdSense. Patreon (Download the world/blueprint). Server hosting affiliates (Apex Hosting).',
        difficulty: 'Medium',
        equipmentNeeded: 'High-end PC (for Shaders), Minecraft Account, Replay Mod, OBS.',
        videoIdeas: [
            { title: 'Survival Starter Base (Easy)', type: 'Tutorial' },
            { title: 'Underground Secret Base Build', type: 'Tutorial' },
            { title: 'Japanese Temple in Minecraft', type: 'Showcase' },
            { title: '50 Build Hacks You Didn\'t Know', type: 'Listicle' }
        ],
        growthTips: 'Thumbnails needs to look incredibly aesthetic (use Shaders + Photoshop). "No Talking" in title attracts international audiences.',
        tags: ["Minecraft", "Gaming", "Building", "Tutorial", "Relaxing", "minecraft build", "aesthetic gaming", "creative mode"]
    },

    // ----------------------
    // SMART HOME
    // ----------------------
    {
        name: "Smart Home Automation",
        category: "Tech & AI",
        trendScore: 82,
        isTrending: false,
        revenueEstimate: '$5,000 - $50,000/mo', // Renamed from estimatedRevenue
        cpmEstimate: '$20 - $45',
        videoIdeas: [
            { title: "5 Smart Home Gadgets You Didn't Know Existed", type: "Listicle" },
            { title: "I Automated My Entire House with $500", type: "Case Study" },
            { title: "Amazon Echo vs Google Nest: The Truth", type: "Review" },
            { title: "The Ultimate Desk Setup for Productivity 2025", type: "Setup" },
            { title: "Why Your Smart Home is Unsecure", type: "Warning" }
        ],
        growthTips: "Focus on 'Problem -> Solution' hooks. 'Tired of waking up groggy? Here's my automated morning routine.' Visuals must be crisp; getting review units from brands becomes easier after 1k subs.",
        whyItWorks: "High CPM because advertisers are tech companies. People searching for this are ready to buy, meaning affiliate conversion rates are astronomical.",
        description: "Channels focusing on the latest smart gadgets, home setups, and automation workflows. Highly searchable content with massive affiliate potential.",
        contentStyle: "Fast-paced editing, B-Roll of products (can be stock or manufacturer provided if faceless), and clean on-screen text overlays.",
        monetizationStrategy: "Amazon Associates (Primary), Tech sponsorships (VPNs, Smart devices), Brand deals.",
        difficulty: "Medium",
        equipmentNeeded: "Stock footage of tech (Storyblocks), or basic camera if doing hands-on (without face). Good microphone is essential for tech narration.",
        detailedExplanation: "This niche is an affiliate marketing goldmine. You create videos that answer specific questions ('Best Smart Lock 2025') or solve problems. Because the viewers have 'high purchase intent', a small channel can earn a full-time income just from Amazon commissions.",
        tags: ["SmartHome", "TechReview", "HomeAutomation", "Gadgets", "IoT", "tech tips", "setup guide", "future home"]
    },

    // ----------------------
    // QUIZ / TRIVIA
    // ----------------------
    {
        name: "Quiz & Trivia Channels",
        category: "Entertainment",
        trendScore: 90,
        isTrending: false,
        revenueEstimate: '$1,000 - $10,000/mo',
        cpmEstimate: '$2 - $5',
        videoIdeas: [
            { title: "Can You Name These 50 Countries By Shape?", type: "Quiz" },
            { title: "General Knowledge Quiz #42 (99% Fail)", type: "Challenge" },
            { title: "Guess The Movie By The Emoji", type: "Emoji Game" },
            { title: "100 Questions in 10 Minutes: Speed Run", type: "Speed Quiz" },
            { title: "Would You Rather? (Impossible Edition)", type: "Interactive" }
        ],
        growthTips: "Shorts are king here. 'Guess the Flag' shorts can get 10M views easily. Funnel those viewers to 8-minute compilation quizzes for monetization.",
        whyItWorks: "Highest retention/engagement. Viewers 'play along' which keeps them watching until the end. Comments explode with people sharing their scores.",
        description: "Interactive video quizzes. Guess the flag, find the odd one out, or general knowledge trivia. Extremely viral potential with lower CPM.",
        contentStyle: "On-screen timer, multiple choice graphics, sound effects for correct/wrong answers. Upbeat background music.",
        monetizationStrategy: "AdSense (Volume based), Mobile Game sponsorships, Merchandise (Quiz books).",
        estimatedRevenue: "$1,000 - $10,000/mo (Volume Based)",
        difficulty: "Easy",
        equipmentNeeded: "Canva or After Effects for templates. No advanced audio needed, just sound effects.",
        detailedExplanation: "The easiest niche to produce. Once you have a template (timer + question + answer reveal), you can churn out 3 videos a day. The key is volume. Individual video CPM is low, but getting 1M views is easier than in potential finance or tech.",
        tags: ["Quiz", "Trivia", "GeneralKnowledge", "FunFacts", "Challenge", "brain teaser", "game", "test your knowledge"]
    }
];
