export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  leftLabel: string;
  rightLabel: string;
  description: string;
  fullDescription: string;
  achievements: string[];
  technologies: string[];
  roles: string[];
  date: string;
  links?: {
    label: string;
    url: string;
  }[];
  collaborateUrl?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: 0,
    slug: "tabcura",
    title: "Tabcura",
    category: "AI Health Tech",
    image: "/projects/tabcura.png",
    leftLabel: "Health",
    rightLabel: "AI",
    description: "AI-powered prescription reader and health management system",
    fullDescription: `Tabcura is a real-time AI-powered prescription reader developed during the Reckon 6.0 Hackathon. The system leverages advanced OCR technology and Google's Gemini API to extract medicine data from handwritten prescriptions with remarkable accuracy, while providing comprehensive health report tracking and personalized wellness recommendations.`,
    achievements: [
      "Developed a real-time AI-powered prescription reader using Gemini API and OCR, achieving 60–80% accuracy in extracting medicine data from handwritten prescriptions",
      "Engineered a structured medical storage system, categorizing records by hospital, disease, and doctor, improving retrieval efficiency by 60%",
      "Enabled AI-driven health report tracking by analyzing patient vitals and prescriptions, generating personalized dietary plans and powering a 1-tap medicine ordering system, improving treatment adherence by 3x",
    ],
    technologies: ["GitHub Copilot", "MongoDB", "React", "Gemini API", "OCR"],
    roles: ["Creative Developer", "Full Stack Developer"],
    date: "February 2025",
    links: [
      { label: "GitHub Repository", url: "https://github.com/prateek200445/Tabcura_updated" }
    ],
    collaborateUrl: "https://github.com/prateek200445/Tabcura_updated",
    gallery: ["/projects/tabcura.png"],
  },
  {
    id: 1,
    slug: "ai-mcp-orchestrator",
    title: "AI MCP Orchestrator",
    category: "LLM Agent Platform",
    image: "/projects/last.jpg",
    leftLabel: "LLM",
    rightLabel: "Agents",
    description: "Orchestration platform for managing multiple AI agents and language models",
    fullDescription: `A comprehensive platform for orchestrating and managing multiple LLM agents, enabling complex multi-agent workflows and coordinated AI interactions.`,
    achievements: [
      "Platform for orchestrating multiple AI agents",
      "Supports complex agent workflows",
      "Enables coordinated AI interactions",
    ],
    technologies: ["LLM", "TypeScript", "Node.js"],
    roles: ["Full Stack Developer"],
    date: "Coming Soon",
    links: [],
    collaborateUrl: "/contact",
    gallery: ["/projects/last.jpg"],
  },
  {
    id: 2,
    slug: "arth-inventory",
    title: "ArthInventory",
    category: "Financial AI",
    image: "/projects/inventory.png",
    leftLabel: "Finance",
    rightLabel: "AI",
    description: "AI-powered inventory management with financial analytics",
    fullDescription: `An intelligent inventory management system enhanced with AI-driven financial analytics and predictive insights.`,
    achievements: [
      "AI-powered inventory tracking",
      "Financial analytics integration",
      "Predictive inventory optimization",
    ],
    technologies: ["AI", "Finance APIs", "React", "Python"],
    roles: ["Full Stack Developer"],
    date: "Coming Soon",
    links: [
      { label: "GitHub Repository", url: "https://github.com/prateek200445/ArthInventory" }
    ],
    collaborateUrl: "https://github.com/prateek200445/ArthInventory",
    gallery: ["/projects/inventory.png"],
  },
  {
    id: 3,
    slug: "journey-quest",
    title: "JourneyQuest",
    category: "AI Text Adventure",
    image: "/projects/game.png",
    leftLabel: "Gaming",
    rightLabel: "Narrative",
    description: "Interactive text adventure powered by AI storytelling",
    fullDescription: `An immersive text-based adventure game that uses AI to generate dynamic narratives and create unique player experiences.`,
    achievements: [
      "Dynamic narrative generation",
      "Interactive story branching",
      "AI-driven world building",
    ],
    technologies: ["AI/LLM", "React", "Node.js"],
    roles: ["Creative Developer", "Full Stack Developer"],
    date: "Coming Soon",
    links: [],
    collaborateUrl: "/contact",
    gallery: ["/projects/game.png"],
  },
  {
    id: 4,
    slug: "veda-ai",
    title: "Vedatech",
    category: "Ayurvedic RAG Platform",
    image: "/projects/veda.png",
    leftLabel: "Ayurveda",
    rightLabel: "RAG",
    description: "Ayurvedic intelligence platform with RAG, mapped care access, and government scheme guidance",
    fullDescription: `Vedatech is an Ayurvedic tax and intelligence platform powered by Retrieval-Augmented Generation (RAG). It uses trusted content from ancient Ayurvedic books, embeds it into a vector database, and serves grounded responses through optimized LLM query pipelines. The platform also supports queue-based processing for reliable request handling and helps users discover relevant government schemes, nearby hospitals, and prakritik test facilities to make Ayurveda more accessible and practical.`,
    achievements: [
      "Built a domain-focused RAG pipeline on embedded knowledge from ancient Ayurvedic texts",
      "Implemented vector database retrieval with optimized LLM query orchestration for grounded responses",
      "Designed queue-backed processing to improve reliability, throughput, and response consistency under load",
      "Integrated user utility flows for finding government schemes, nearby hospitals, and prakritik test support",
    ],
    technologies: ["RAG", "Vector Database", "LLM", "Queueing", "Maps/Geo", "React"],
    roles: ["Full Stack Developer", "Data Scientist"],
    date: "Coming Soon",
    links: [],
    collaborateUrl: "/contact",
    gallery: ["/projects/veda.png"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
