/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'backdrop': 'rgba(250, 246, 240, 1)',
      },
      boxShadow: {
        'dark-glow': '0 2px 4px 0 rgba(128, 88, 204, 0.3), 0 5px 15px 0 rgba(76, 29, 101, 0.25)',
      },
      colors: {
        'light-purple': '#d080ed',
        'dark-purple': '#9c6ef0',
      }
    },
  }
}

