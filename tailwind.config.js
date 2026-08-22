/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#3B82F6',
        },
        brandOrange: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FB923C',
        },
        brandGray: {
          DEFAULT: '#F3F4F6',
          dark: '#E5E7EB',
          darker: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}
