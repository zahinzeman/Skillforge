export const MOCK_COURSES = [
  {
    id: "course-1",
    title: "React 19 & Next.js 15: The Complete Guide",
    category: "Web Development",
    tier: "free",
    price: 0,
    rating: 4.9,
    reviewsCount: 1240,
    studentsCount: 18400,
    duration: "14h 30m",
    lessonsCount: 38,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Alex Rivera",
      role: "Senior Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    description: "Master Modern React 19, Server Components, Hooks, Context API, Next.js App Router, and production deployments with practical real-world projects.",
    overview: "This comprehensive course takes you from React fundamentals to building full-stack web applications with Next.js 15. You will build 3 complete projects including a social dashboard and an interactive web application.",
    modules: [
      {
        id: "m1",
        title: "Module 1: React 19 Fundamentals & Hooks",
        lessons: [
          {
            id: "l1",
            title: "1. Introduction to React 19 Features",
            duration: "12m",
            videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
            freePreview: true,
            quiz: {
              question: "What is a key benefit of React 19 Server Components?",
              options: [
                "Runs JS only in browser",
                "Renders components on server reducing client bundle size",
                "Replaces CSS completely",
                "Removes useState hook"
              ],
              correctAnswer: 1
            }
          },
          {
            id: "l2",
            title: "2. State Management with useState & useReducer",
            duration: "25m",
            videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
            freePreview: true,
            quiz: {
              question: "When should you prefer useReducer over useState?",
              options: [
                "For simple boolean toggles",
                "When state logic is complex with multiple sub-values",
                "Never, useState is always better",
                "Only for fetching data from APIs"
              ],
              correctAnswer: 1
            }
          },
          {
            id: "l3",
            title: "3. Master the Context API & Custom Hooks",
            duration: "30m",
            videoUrl: "https://www.youtube.com/embed/35lXWvCuM8o",
            freePreview: true
          }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Next.js 15 App Router & Server Actions",
        lessons: [
          {
            id: "l4",
            title: "4. Building Routes & Layouts in Next.js 15",
            duration: "22m",
            videoUrl: "https://www.youtube.com/embed/wm5gMKuwfyk",
            freePreview: true
          },
          {
            id: "l5",
            title: "5. Mutations with Server Actions & Optimistic UI",
            duration: "35m",
            videoUrl: "https://www.youtube.com/embed/d5x00sIeZGw",
            freePreview: true
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Generative AI & LLM Engineering Masterclass",
    category: "AI & Data Science",
    tier: "premium",
    price: 49,
    rating: 4.95,
    reviewsCount: 890,
    studentsCount: 9200,
    duration: "22h 15m",
    lessonsCount: 52,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Dr. Elena Rostova",
      role: "AI Research Scientist & Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    description: "Build production AI agents, RAG systems, fine-tune open-weights models, and integrate Google Gemini API into enterprise web apps.",
    overview: "Unlock the power of Generative AI. Learn vector databases, embeddings, LangChain/LlamaIndex architecture, prompt engineering, structured output, and real-time streaming with Gemini models.",
    modules: [
      {
        id: "m1",
        title: "Module 1: Foundations of LLMs & Prompt Architecture",
        lessons: [
          {
            id: "l1",
            title: "1. How LLMs Work: Tokens, Vectors & Attention",
            duration: "18m",
            videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
            freePreview: true,
            quiz: {
              question: "What is the primary function of self-attention mechanisms?",
              options: [
                "Compress image files",
                "Calculate context relevance between token sequences",
                "Encrypt API credentials",
                "Convert code into bytecode"
              ],
              correctAnswer: 1
            }
          },
          {
            id: "l2",
            title: "2. Prompt Engineering & System Instructions",
            duration: "28m",
            videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM",
            freePreview: true
          }
        ]
      },
      {
        id: "m2",
        title: "Module 2: RAG Architecture & Vector Databases (Premium)",
        lessons: [
          {
            id: "l3",
            title: "3. Building Retrieval Augmented Generation (RAG)",
            duration: "45m",
            videoUrl: "https://www.youtube.com/embed/tcqEUSNcn8I",
            freePreview: false,
            quiz: {
              question: "Why is Chunking important in RAG pipelines?",
              options: [
                "To speed up CSS compilation",
                "To fit documents into vector embeddings and context limits",
                "To store files on local hard drives",
                "To prevent CORS errors"
              ],
              correctAnswer: 1
            }
          },
          {
            id: "l4",
            title: "4. Autonomous AI Agents & Function Calling",
            duration: "50m",
            videoUrl: "https://www.youtube.com/embed/bzq8fS8t9pE",
            freePreview: false
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "UI/UX Design Systems & Figma Prototyping",
    category: "Design",
    tier: "free",
    price: 0,
    rating: 4.8,
    reviewsCount: 620,
    studentsCount: 14200,
    duration: "9h 45m",
    lessonsCount: 26,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Marcus Vance",
      role: "Principal Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    description: "Design stunning dark interfaces, component libraries, design tokens, micro-interactions, and responsive web systems in Figma.",
    overview: "Learn modern UI principles, color theory, typography scales, glassmorphism, accessibility (WCAG), and auto-layout features in Figma to craft high-conversion interfaces.",
    modules: [
      {
        id: "m1",
        title: "Module 1: Figma Auto-Layout & Design Tokens",
        lessons: [
          {
            id: "l1",
            title: "1. Mastering Auto Layout 5.0",
            duration: "20m",
            videoUrl: "https://www.youtube.com/embed/N6j8_E-T1_0",
            freePreview: true
          },
          {
            id: "l2",
            title: "2. Color Systems, Contrast & Glassmorphism",
            duration: "25m",
            videoUrl: "https://www.youtube.com/embed/eZJZeHjNqms",
            freePreview: true
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Full-Stack Cloud Architecture on AWS & Docker",
    category: "Cloud & DevOps",
    tier: "premium",
    price: 69,
    rating: 4.9,
    reviewsCount: 410,
    studentsCount: 5400,
    duration: "18h 00m",
    lessonsCount: 44,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Sarah Chen",
      role: "Lead DevOps Architect",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    },
    description: "Deploy scalable cloud microservices, Docker containers, Kubernetes clusters, CI/CD pipelines, and serverless AWS infrastructure.",
    overview: "A hands-on cloud engineering blueprint. Build automated GitHub Actions CI/CD workflows, manage infrastructure with Terraform, and configure SSL, auto-scaling, and monitoring.",
    modules: [
      {
        id: "m1",
        title: "Module 1: Containerization with Docker & Compose",
        lessons: [
          {
            id: "l1",
            title: "1. Docker Core Essentials & Multi-Stage Builds",
            duration: "28m",
            videoUrl: "https://www.youtube.com/embed/fqMOX6JJhGo",
            freePreview: true
          },
          {
            id: "l2",
            title: "2. Orchestration with Kubernetes (Premium)",
            duration: "40m",
            videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
            freePreview: false
          }
        ]
      }
    ]
  },
  {
    id: "course-5",
    title: "Python for Data Science & Machine Learning",
    category: "AI & Data Science",
    tier: "free",
    price: 0,
    rating: 4.85,
    reviewsCount: 1540,
    studentsCount: 22000,
    duration: "11h 20m",
    lessonsCount: 30,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "David K. Vance",
      role: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    description: "Learn Python data analysis, Pandas, NumPy, Data Visualization with Seaborn, and introductory machine learning algorithms.",
    overview: "Master Python programming for data analysis. Clean messy datasets, plot dynamic charts, and build predictive models with Scikit-Learn.",
    modules: [
      {
        id: "m1",
        title: "Module 1: Python & Pandas Foundations",
        lessons: [
          {
            id: "l1",
            title: "1. Data Manipulation with Pandas & DataFrames",
            duration: "30m",
            videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
            freePreview: true
          }
        ]
      }
    ]
  },
  {
    id: "course-6",
    title: "Product Management & Agile SaaS Growth Strategy",
    category: "Business",
    tier: "premium",
    price: 39,
    rating: 4.75,
    reviewsCount: 310,
    studentsCount: 4100,
    duration: "8h 45m",
    lessonsCount: 22,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Jessica Taylor",
      role: "VP of Product",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    description: "Lead high-impact product teams, define roadmaps, validate MVPs, optimize product metrics (CAC, LTV, Retention), and scale SaaS platforms.",
    overview: "From concept to market expansion. Master OKRs, user interviews, feature prioritization matrix, and growth loops designed for modern tech companies.",
    modules: [
      {
        id: "m1",
        title: "Module 1: Product Strategy & Market Validation",
        lessons: [
          {
            id: "l1",
            title: "1. Finding Product-Market Fit (PMF)",
            duration: "25m",
            videoUrl: "https://www.youtube.com/embed/0LNQxT9LvM0",
            freePreview: true
          }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  "All Courses",
  "Web Development",
  "AI & Data Science",
  "Design",
  "Cloud & DevOps",
  "Business"
];
