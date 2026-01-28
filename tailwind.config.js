/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './storyblok/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wl-primary': '#2D5F4F',
        'wl-accent': '#7BA68E',
        'wl-surface': '#F7F5F1',
        'wl-text': '#111827',
        'wl-muted': '#4B5563',
        'wl-danger': '#E9423A',
      },
      fontFamily: {
        sans: [
          "'Noto Sans'",
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
