module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
