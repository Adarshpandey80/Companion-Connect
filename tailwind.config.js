// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'bounce-slow': 'bounce 2.5s ease-in-out infinite',
        'fadeUp': 'fadeUp 0.9s ease both',
        'fadeDown': 'fadeDown 0.8s ease both',
        'modalIn': 'modalIn 0.35s ease',
        'sway': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-22px) scale(1.04)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(28px)' },
          'to': { opacity: '1', transform: 'none' },
        },
        fadeDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'none' },
        },
        modalIn: {
          'from': { opacity: '0', transform: 'scale(0.92)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}