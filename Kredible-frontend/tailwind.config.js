/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'grey-icon': 'rgba(20, 20, 25, 0.3);',
        'white-icon': 'rgba(255, 255, 255, 0.1)'
      }, backgroundImage: {
        'hero-pattern': "linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.08) );",
      },
    },
  },
  plugins: [],
}
