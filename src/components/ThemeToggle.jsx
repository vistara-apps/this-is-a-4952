import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon for light mode */}
        <Sun 
          size={20} 
          className={`absolute inset-0 transition-all duration-300 transform ${
            isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100 text-yellow-500'
          }`}
        />
        {/* Moon icon for dark mode */}
        <Moon 
          size={20} 
          className={`absolute inset-0 transition-all duration-300 transform ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100 text-blue-400' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
