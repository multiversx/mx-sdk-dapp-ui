// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,ts,jsx,js,html}'],
  theme: {
    extend: {
      borderRadius: {
        20: '20px',
      },
    },
  },
  plugins: [],
};
