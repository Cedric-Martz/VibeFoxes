# VibeFoxes - Vibe Coding App

[![CI/CD Pipeline](https://github.com/Cedric-Martz/ai_assignment/actions/workflows/ci.yml/badge.svg)](https://github.com/Cedric-Martz/ai_assignment/actions/workflows/ci.yml)

**Assignment: Advanced Algorithms & AI Search**
**Authors:** JULES FRANCOIS & MARTZ CEDRIC
**Year:** 2025

## Description

VibeFoxes is an AI-powered code generator with a fox-inspired theme.
TThe app allows users to generate code using either OpenAI's GPT models or Puter.ai (if you don't have API key).

### Why Foxes?
Because the devs were inspired by Halloween but didn't want to use pumpkins... and discovered that foxes are orange too!

## Features

- **Multiple AI Models**: GPT-3.5, GPT-4, GPT-4 Turbo, GPT-4o, o3-mini, and Puter.ai
- **Fox-themed UI**: Beautiful orange and brown color scheme with animations
- **localStorage Integration**: Saves API keys and model preferences
- **Auto-run Code**: Automatically executes generated HTML/JavaScript
- **Conversation History**: Keeps track of your interactions
- ⏮**Undo/Redo**: Navigate through code history
- **Drawing Canvas**: Interactive drawing tools
- **Welcome Screen**: Easy setup for first-time users

## Quick Start

### Local Development

1. Clone the repository
```bash
git clone https://github.com/Cedric-Martz/ai_assignment.git
cd ai_assignment
```

2. Open `index.html` in your browser
```bash
open index.html
xdg-open index.html
start index.html
```

3. Enter your OpenAI API key (or use Puter.ai for testing)

### Configuration

- **Local Testing**: Set `PUTER_AVAILABLE = true` in `index.js`
- **Ancient Brain**: Set `PUTER_AVAILABLE = false` in `server.js`

## Files Structure

```
ai_assignment/
├── index.js
├── server.js
├── index.html
├── package.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── .eslintrc.json
└── .gitignore
```

## 🔧 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline that runs on every push and pull request:

### Pipeline Jobs

1. **Lint and Validate**
   - Checks JavaScript syntax
   - Runs ESLint for code quality
   - Validates file sizes

2. **Security Audit**
   - Runs npm audit
   - Checks for hardcoded API keys
   - Security vulnerability scanning

3. **Test Compatibility**
   - Checks ES6+ compatibility
   - Detects security risks (eval usage)

4. **Build Information**
   - Displays project statistics
   - Verifies API integrations
   - Checks configuration

5. **Deployment Ready**
   - Verifies all required files
   - Final readiness check

### Running CI/CD Locally

```bash
npm install
node --check index.js
node --check server.js
npx eslint index.js server.js
npm audit
```

## API Keys

### OpenAI
Get your API key at: https://platform.openai.com/account/api-keys

### Puter.ai
No API key needed. See documentation: https://developer.puter.com/

## Security Notes

- **Never commit API keys** to the repository
- API keys are stored in `localStorage` (browser-side only)
- The `.gitignore` file prevents accidental key commits
- CI/CD pipeline checks for hardcoded secrets

## Theme Colors

- **Fox Orange**: `#ff6b35`
- **Fox Orange Dark**: `#d95d39`
- **Fox Cream**: `#f5e6d3`
- **Fox Brown**: `#6b4423`
- **Fox Tail**: `#ff8c42`

## Known Issues

- `eval()` usage in code execution (security consideration)
- Puter.ai may fail moderation for certain prompts
- Ancient Brain domain restrictions with Puter.ai

## License

Educational project for DCU Advanced Algorithms & AI Search course.

## Acknowledgments

- OpenAI for GPT models
- Puter.ai for free AI testing
- Ancient Brain platform
- Tailwind CSS for styling

Made with 🦊 by Jules & Cedric
