/** @type {import('tailwindcss').Config} */
// Design tokens from DESIGN.md §2–3 (M3 design-done).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#26233A', // ink — header, buttons, focus rings
          accent: '#FF6B35',  // signal orange — highlights, primary action
        },
        surface: {
          page: '#F6F3EC',    // warm paper
          card: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1C1917', // text-primary
          muted: '#78716C',   // text-muted
        },
        // M6 tag-style
        feature: '#0F9D8A',
        bug: '#E0245E',
        // M8 due-tint
        due: {
          safe: '#3F9B5C',
          warning: '#E8A317',
          overdue: '#D64045',
          neutral: '#A8A29E',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        fadein: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: { fadein: 'fadein 200ms ease-out' },
    },
  },
  plugins: [],
};
