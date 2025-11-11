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
- **Undo/Redo**: Navigate through code history
- **Drawing Canvas**: Interactive drawing tools
- **Welcome Screen**: Easy setup for first-time users

## Quick Start

### Local Development

1. Clone the repository
```bash
git clone https://github.com/Cedric-Martz/ai_assignment.git
cd ai_assignment
```

2. Start project
```bash
npm start
```

3. Enter your OpenAI API key (or use Puter.ai for testing)

## API Keys

### OpenAI
Get your API key at: https://platform.openai.com/account/api-keys

### Puter.ai
No API key needed. See documentation: https://developer.puter.com/

## Security Notes

- **Never commit API keys** here
- API keys are stored in `localStorage` (browser-side only)

## Theme Colors

- **Fox Orange**: `#ff6b35`
- **Fox Orange Dark**: `#d95d39`
- **Fox Cream**: `#f5e6d3`
- **Fox Brown**: `#6b4423`
- **Fox Tail**: `#ff8c42`

## Known Issues

- `eval()` usage in code execution (security consideration)
- Puter.ai may fail moderation for certain prompts
- Sometimes, Puter.ai returns 404. If it happens, please refresh the page and try again.

## License

See ![LICENSE](./LICENSE) file for more information.

## Contribution

If you want to create a pull request with changes to the project, feel free to do so. We will review the pending changes ASAP.

## Acknowledgments

- OpenAI for GPT models
- Puter.ai for free AI testing
- Tailwind CSS for styling
