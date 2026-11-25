# Inkadence

**Write in cadence.** Inkadence is a web application that helps writers build steady writing habits and improve their skills, across creative, academic and poetry projects.

> 🚧 **Work in progress.** Inkadence is being developed as a TFG in Grado de Ingeniería Informática at the University of Oviedo (EII).

## What it does

Inkadence focuses on the writer, not just the text. It combines two things:

- **Habit building.** Set a deadline and how much time you want to write. Inkadence plans your writing sessions, tracks whether you keep them and shows your progress on each project.
- **Non-intrusive feedback.** Your text is analysed in the background, never while you type. Results appear in a separate feedback tab:
  - detection of repetitive grammatical structures, using classic natural language processing (NLP) rather than a trained AI model;
  - personalised tips based on the spelling and grammar mistakes you make most often.

Each type of project has its own structure and tools.
Text analysis runs on the project's own server, without sending what you write to third-party services.
The first version supports Spanish.

## Tech stack

| Part | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| API | NestJS, TypeScript, Prisma (planned) |
| Analysis | Python, FastAPI, spaCy (`es_core_news_md`) |
| Database | PostgreSQL 17 |
| Tooling | pnpm workspaces, Oxlint, Prettier, Vitest, Docker Compose |

## Repository structure

```
Inkadence/
├── web/                 Frontend (React + Vite + Tailwind)
├── api/                 Backend API (NestJS)
├── analysis/            Text analysis service (FastAPI + spaCy)
│   ├── app/main.py
│   └── requirements.txt
├── docker-compose.yml   PostgreSQL for local development
├── pnpm-workspace.yaml  Monorepo definition
└── package.json
```

## Getting started

### Prerequisites

- Node.js 24 LTS and pnpm 10 or later
- Python 3.13
- Docker Desktop
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR-USER/Inkadence.git
cd Inkadence

# Install the Node.js dependencies for web and api
pnpm install

# Set up the analysis service
cd analysis
py -3.13 -m venv .venv                # macOS/Linux: python3 -m venv .venv
.venv\Scripts\activate                # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download es_core_news_md
cd ..
```

### Running in development

Start the database, then each part in its own terminal:

```bash
# Database (from the repository root)
docker compose up -d

# Frontend → http://localhost:5173
cd web && pnpm dev

# API → http://localhost:3000
cd api && pnpm start:dev

# Analysis service → http://localhost:8000/docs
cd analysis
.venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000
```

## Author

Lucas Gisbert López.
