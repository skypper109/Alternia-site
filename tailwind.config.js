/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#314999',
          50: '#eef1fa',
          100: '#d5dcf2',
          200: '#aab9e5',
          300: '#7f96d8',
          400: '#5473cb',
          500: '#314999',
          600: '#27397a',
          700: '#1e2b5b',
          800: '#141d3c',
          900: '#0a0e1d',
        },
        secondary: {
          DEFAULT: '#40BBCC',
          50: '#ecf9fb',
          100: '#c8eef4',
          200: '#91dde9',
          300: '#5acbde',
          400: '#40BBCC',
          500: '#2d99a8',
          600: '#1a7784',
          700: '#0d5560',
          800: '#07333c',
          900: '#031118',
        },
        accent: {
          DEFAULT: '#F1851F',
          50: '#fef4ea',
          100: '#fcddb9',
          200: '#f9bb73',
          300: '#f59a2d',
          400: '#F1851F',
          500: '#c46a19',
          600: '#975013',
          700: '#6a350d',
          800: '#3d1f07',
          900: '#100802',
        },
        dark: {
          soft: '#1A1A2E',
        },
        gray: {
          light: '#F8F9FB',
          medium: '#6B7280',
        }
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Plus Jakarta Sans', 'Instrument Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scroll': 'partnersScroll 26s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        partnersScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(49, 73, 153, 0.05), 0 4px 16px rgba(49, 73, 153, 0.06)',
        'card-hover': '0 8px 24px rgba(49, 73, 153, 0.12), 0 2px 6px rgba(49, 73, 153, 0.06)',
        'primary-glow': '0 4px 20px -2px rgba(49, 73, 153, 0.35)',
        'accent-glow': '0 4px 20px -2px rgba(241, 133, 31, 0.35)',
      },
    },
  },
  plugins: [],
};
