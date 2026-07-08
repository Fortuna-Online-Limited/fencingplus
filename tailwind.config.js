/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A5C36',
          50: '#f0f9f4',
          100: '#d8f0e5',
          200: '#b1e1cb',
          300: '#7acaa8',
          400: '#3fab80',
          500: '#1e8f62',
          600: '#10724d',
          700: '#0A5C36',
          800: '#08472b',
          900: '#073b24',
        },
        gold: {
          DEFAULT: '#F2A900',
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#ffe585',
          300: '#ffd147',
          400: '#ffc01a',
          500: '#F2A900',
          600: '#d98600',
          700: '#b56400',
        },
      },
      animation: {
        breathe: 'breathe 2.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(242,169,0,0.65), 0 6px 24px rgba(0,0,0,0.25)',
          },
          '50%': {
            boxShadow: '0 0 0 16px rgba(242,169,0,0), 0 6px 24px rgba(0,0,0,0.25)',
          },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
