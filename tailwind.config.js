/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 20%, 95%)',
        text: 'hsl(220, 20%, 20%)',
        accent: 'hsl(130, 80%, 50%)',
        primary: 'hsl(210, 70%, 55%)',
        surface: 'hsl(0, 0%, 100%)',
        dark: {
          bg: 'hsl(220, 20%, 8%)',
          surface: 'hsl(220, 20%, 12%)',
          text: 'hsl(220, 20%, 90%)',
          border: 'hsl(220, 20%, 20%)',
        }
      },
      borderRadius: {
        lg: '1rem',
        md: '0.625rem',
        sm: '0.375rem',
      },
      spacing: {
        lg: '1.25rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 20%, 20%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}