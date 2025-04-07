export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red', 'text-red', 'accent-red', 'darker-red',
    'bg-green', 'text-green', 'accent-green', 'darker-green',
    'bg-yellow', 'text-yellow', 'accent-yellow', 'darker-yellow',
    'bg-cyan', 'text-cyan', 'accent-cyan', 'darker-cyan',
    'bg-pink', 'text-pink', 'accent-pink', 'darker-pink',
    'bg-dark', 'text-dark', 'accent-dark', 'darker-dark',
    'bg-purple', 'text-purple', 'accent-purple', 'darker-purple',
    'bg-orange', 'text-orange', 'accent-orange', 'darker-orange',
    'bg-brown', 'text-brown', 'accent-brown', 'darker-brown',
    'bg-silver', 'text-silver', 'accent-silver', 'darker-silver',
    'bg-grey', 'text-grey', 'accent-grey', 'darker-grey'
  ],
  theme: {
    extend: {
      colors: {
        'bg-red': 'var(--bg-color-red)',
        'text-red': 'var(--textColorDark-red)',
        'bg-yellow': 'var(--bg-color-yellow)',
        'text-yellow': 'var(--textColorDark-yellow)',
        'bg-green': 'var(--bg-color-green)',
        'text-green': 'var(--textColorDark-green)',
        'bg-dark': 'var(--bg-color-dark)',
        'text-dark': 'var(--textColorDark-dark)',
      }
    },
  },
  plugins: [],
}
