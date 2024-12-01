/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'class-death-knight': '#c41e3a',
        'class-demon-hunter': '#A330C9',
        'class-druid': '#FF7C0A',
        'class-evoker': '#33937F',
        'class-hunter': '#AAD372',
        'class-mage': '#3FC7EB',
        'class-monk': '#00FF98',
        'class-paladin': '#F48CBA',
        'class-priest': '#FFFFFF',
        'class-rogue': '#FFF468',
        'class-shaman': '#0070DD',
        'class-warlock': '#8788EE',
        'class-warrior': '#C69B6D',

        'faction-horde': '#8C1616',
        'faction-alliance': '#0F67EA',
        'faction-neutral': '#333333'
      }
    }
  },
  plugins: []
}
