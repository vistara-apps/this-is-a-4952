/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro-futuristic crypto Twitter color scheme
        bg: 'hsl(240, 15%, 8%)',           // Deep space black
        text: 'hsl(180, 100%, 85%)',       // Bright cyan text
        accent: 'hsl(300, 100%, 70%)',     // Electric magenta
        primary: 'hsl(280, 100%, 60%)',    // Neon purple
        surface: 'hsl(240, 20%, 12%)',     // Dark surface with slight blue tint
        secondary: 'hsl(60, 100%, 50%)',   // Electric yellow
        success: 'hsl(120, 100%, 50%)',    // Matrix green
        warning: 'hsl(30, 100%, 60%)',     // Cyber orange
        error: 'hsl(0, 100%, 65%)',        // Neon red
        // Gradient colors for special effects
        gradient: {
          from: 'hsl(280, 100%, 60%)',     // Purple
          via: 'hsl(300, 100%, 70%)',      // Magenta
          to: 'hsl(180, 100%, 50%)',       // Cyan
        },
        dark: {
          bg: 'hsl(240, 15%, 5%)',         // Even darker space
          surface: 'hsl(240, 20%, 8%)',    // Darker surface
          text: 'hsl(180, 100%, 90%)',     // Brighter cyan
          border: 'hsl(280, 50%, 25%)',    // Purple border
          accent: 'hsl(300, 100%, 80%)',   // Brighter magenta
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
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'cyber-glow': 'cyberGlow 3s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
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
        neonPulse: {
          '0%': { 
            boxShadow: '0 0 20px hsla(300, 100%, 70%, 0.5), 0 0 40px hsla(280, 100%, 60%, 0.3)',
            filter: 'brightness(1)'
          },
          '100%': { 
            boxShadow: '0 0 30px hsla(300, 100%, 70%, 0.8), 0 0 60px hsla(280, 100%, 60%, 0.5)',
            filter: 'brightness(1.2)'
          },
        },
        cyberGlow: {
          '0%, 100%': { 
            textShadow: '0 0 10px hsla(180, 100%, 85%, 0.8), 0 0 20px hsla(300, 100%, 70%, 0.6)'
          },
          '50%': { 
            textShadow: '0 0 20px hsla(180, 100%, 85%, 1), 0 0 30px hsla(300, 100%, 70%, 0.8)'
          },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        hologram: {
          '0%, 100%': { 
            opacity: '0.8',
            filter: 'hue-rotate(0deg)'
          },
          '25%': { 
            opacity: '0.9',
            filter: 'hue-rotate(90deg)'
          },
          '50%': { 
            opacity: '1',
            filter: 'hue-rotate(180deg)'
          },
          '75%': { 
            opacity: '0.9',
            filter: 'hue-rotate(270deg)'
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
