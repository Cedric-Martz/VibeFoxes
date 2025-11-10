/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.js",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#1a1410',
        'editor-panel': '#2a1f1a',
        'editor-toolbar': '#3a2820',
        'editor-input': '#4a3528',
        'editor-border': '#5a4030',
        'editor-text': '#f5e6d3',
        'editor-accent': '#ff6b35',
        'fox-orange': '#ff6b35',
        'fox-orange-dark': '#d95d39',
        'fox-orange-hover': '#ff8555',
        'fox-cream': '#f5e6d3',
        'fox-brown': '#6b4423',
        'fox-dark': '#1a1410',
        'editor-message-user': '#4a3528',
      }
    }
  },
  plugins: [],
}
