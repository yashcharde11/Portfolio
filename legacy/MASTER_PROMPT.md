# MASTER PROMPT — Yash Charde Portfolio
# Use this in Google AI Studio (Gemini) to regenerate or customise the portfolio

---

## SYSTEM CONTEXT

You are an expert frontend engineer and UI designer. Your task is to build a complete, single-file professional portfolio website for Yash Charde — an AI/ML engineer. The output must be a single, self-contained HTML file with embedded CSS and no external dependencies except Google Fonts. The site must be deployable directly on Vercel as a static site.

---

## DESIGN DIRECTION

**Aesthetic**: Dark, editorial, professional — like a senior engineer's portfolio, NOT a flashy creative agency site.
- Background: Near-black (#0f0f0f)
- Surface: Dark grey (#161616)
- Accent: Warm gold (#c8b97e) — used sparingly for highlights, labels, tags
- Text: Off-white (#e8e4dc)
- Muted text: #666
- Borders: #222

**Typography** (via Google Fonts):
- Display / Headings: `DM Serif Display` (serif, elegant)
- Body: `DM Sans` (clean, weight 300/400/500)
- Code / Labels / Tags / Meta: `DM Mono` (monospace)

**Layout philosophy**:
- Max content width: 1100px, centred
- Generous whitespace — sections breathe
- Grid-based layouts with 1px border hairlines creating clean structure
- No shadows except subtle depth; rely on borders and background contrast

---

## STRUCTURE — SECTIONS (in order)

### 1. Fixed Navigation Bar
- Logo: "Yash Charde" (DM Serif Display, gold)
- Links: Projects · Experience · Skills · Education · Certs (scroll anchors)
- CTA button (top right): "Hire Me" → mailto:yashraj.charde@gmail.com
- Background: semi-transparent dark with backdrop-filter blur
- Border-bottom: 1px solid #222

### 2. Hero Section (full viewport height)
Two-column grid:
**Left column:**
- Badge: "● Available for Full-Time Roles" (green, monospace, small tag style)
- H1: `Building Intelligent AI Systems` (DM Serif Display, ~4rem, "Intelligent" in italic gold)
- Paragraph: Short intro (AI/LLM/RAG focus, production-ready systems)
- CTA row: [View Projects ↓] [LinkedIn ↗] [GitHub ↗]

**Right column (4 stat cards, staggered fade-in animation):**
- Current Role: AI/ML Intern · Orion Innovation, Pune
- Degree: B.Tech Artificial Intelligence · 8.77 / 10
- Core Stack: Python · LangChain · LangGraph · FastAPI · RAG
- Location: Maharashtra, India · Open to Remote

### 3. Projects Section ← MOST IMPORTANT — showcase this prominently
Section label: `// Featured Work`
Heading: "Projects"
Intro paragraph explaining these are production-grade, problem-solving AI projects.

**Project Grid** (CSS grid, auto-fill, min 320px per card, 1px border gaps):
Each project card has:
- Project number (01, 02…) in monospace
- Optional "★ Featured" badge in gold
- Project title (DM Serif Display)
- Description paragraph (explain the technical complexity clearly)
- Tag pills (monospace, small, bordered)
- Arrow icon ↗ on hover (top-right, animated)
- Hover: slightly lighter background

**Projects to include:**

**01 — Hotel Management AI Chatbot** [FEATURED]
URL: https://tinyurl.com/yash111003
Description: Multi-agent AI system built with LangChain + Groq Llama 3.3. Implements Role-Based Access Control (RBAC) for automated guest services. Relational DB schema via SQLAlchemy ORM. Automated reporting distributed via SMTP and APScheduler.
Tags: LangChain, Multi-Agent, Llama 3.3, RBAC, SQLAlchemy, APScheduler

**02 — Large-Scale City Partitioning** [FEATURED]
URL: https://tinyurl.com/7f8ybhve
Description: Processed a 6 GB city-scale dataset using Mini-Batch K-Means with incremental partial-fit. Segments geographic regions without loading full dataset into memory — memory-efficient unsupervised ML at scale.
Tags: Unsupervised ML, Mini-Batch K-Means, 6 GB Dataset, Python, Scikit-learn

**03 — Cricket Player Performance Dashboard**
URL: https://tinyurl.com/cricket4321
Description: Power BI analytics dashboard transforming 5,000+ raw data points from Excel into automated KPIs (Strike Rate, Average, Boundary Frequency) via Power Query ETL pipeline.
Tags: Power BI, ETL, Power Query, Data Analytics, 5K+ Data Points

**04 — RAG-Based Conversational AI System** (Research badge: VNIT Nagpur)
No external link (research project)
Description: Fully offline RAG pipeline using LangChain, Ollama, and ChromaDB. Accurate context-aware Q&A over institutional PDF documents with zero cloud dependency.
Tags: RAG, LangChain, Ollama, ChromaDB, Offline LLM

### 4. Experience Section
Section label: `// Work History`
Layout: Two-column grid (200px left meta | 1fr right content) per row, separated by 1px borders

**Orion Innovation, Pune — AI/ML Intern (Jan 2026 – Present)**
- Engineered stateful multi-step AI workflows using LangGraph (conditional branching, persistent memory). Reduced task completion time by 35%.
- Orchestrated 10+ agent collaboration for adversarial red-teaming. Improved vulnerability detection coverage by 45% via automated prompt injection / jailbreak simulation.

**VNIT Nagpur — Research Intern (Jun 2025 – Jul 2025)**
- Designed and deployed offline RAG-based conversational AI (LangChain + Ollama + ChromaDB) for institutional PDF Q&A.

Highlight key metrics (35%, 45%, 10+ agents) in brighter text.

### 5. Skills Section
Section label: `// Technical Skills`
Grid of skill group cards (auto-fill, min 260px), 1px border gaps

Groups:
- AI / LLM: LangChain, LangGraph, RAG Pipelines, Prompt Engineering, Red-teaming, Anthropic Claude API, MCP, Microsoft Agent Framework
- ML / NLP: Machine Learning, Scikit-learn, NLTK, Transformers
- Languages: Python, SQL
- Data & Analytics: Pandas, NumPy, Matplotlib, Power BI, Tableau, Excel
- Databases: PostgreSQL, MySQL, ChromaDB, Vector Databases
- Backend & Tools: FastAPI, Flask, Streamlit, REST APIs, Git, Claude Code

Each skill as a small bordered pill.

### 6. Education Section
Section label: `// Academic Background`
Stacked list with 1px border separators. Each row: degree name + school (left) | score + year (right)

- B.Tech Artificial Intelligence — St. Vincent Pallotti College of Engineering and Technology | CGPA 8.77/10 | 2022–2026
- HSC — Macro Vision Academy, Madhya Pradesh | 89.2% | 2021
- SSC — RD Public School | 93.6% | 2019

### 7. Certificates Section
Section label: `// Certifications`
Grid of certificate cards (auto-fill, min 280px). Each card: emoji icon + cert name + issuer/date. Hover: gold border.

Certificates:
- Natural Language Processing — NPTEL · IIT Kharagpur · 2024
- Business Intelligence & Analytics — NPTEL · IIT Madras · 2024
- Claude — Introduction to Claude — Anthropic
- Claude Code — Introduction — Anthropic
- Get Started with Generative AI — Intel Unnati · 2025

### 8. Footer / Contact
Split layout: left (headline + tagline) | right (contact link buttons)
- Headline: "Let's build something."
- Tagline: "Open to full-time AI/ML engineering roles — India or remote."
- Buttons: ✉ Email | ↗ LinkedIn | ↗ GitHub | 📞 Call
- Copyright bar at very bottom

Contact details:
- Email: yashraj.charde@gmail.com
- Phone: +91-9479686130
- LinkedIn: linkedin.com/in/yash-charde-935976254
- GitHub: github.com/yashcharde11

---

## ANIMATION REQUIREMENTS
- Hero stat cards: staggered slide-in from right (opacity 0 → 1, translateX 20px → 0), delays 0.2s / 0.35s / 0.5s / 0.65s
- Project cards: hover background lightens, arrow icon fades in and shifts (+2px, -2px)
- Certificate cards: hover changes border to gold
- All transitions: 0.2s ease

---

## VERCEL DEPLOYMENT
Include a companion `vercel.json` file:
```json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/$1" }]
}
```
To deploy: Run `vercel` in the folder containing `index.html` and `vercel.json`.

---

## OUTPUT FORMAT
Return the complete, working HTML in a single code block. No explanation needed. The file should be self-contained and render correctly when opened as a local HTML file or deployed to Vercel.

---

## CUSTOMISATION HINTS (for future prompts)
- To add a new project: add a `.project-card` block inside `.projects-grid` with the same structure.
- To change accent color: update `--accent` CSS variable at the top.
- To add a resume download: add `<a href="resume.pdf" download>` button in the hero CTA row.
- To add a profile photo: add an `<img>` inside `.hero-left` or as an overlay on the hero background.
