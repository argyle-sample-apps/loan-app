const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['CircularXX', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        title: ['40px', '46px'],
        heading: ['30px', '36px'],
        subheading: ['26px', '32px'],
        paragraph: ['18px', '25px'],
        footnote: ['13px', '18px'],
        label: ['12px', '15px'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
        transparent: 'transparent',
        gray: {
          light: '#D9D9D9',
          pastel: '#808080',
          DEFAULT: '#94959A',
          dark: '#4C4F56',
          darkest: '#313439',
          /*  transparent */
          T04: 'rgba(0, 0, 0, 0.04)',
          T08: 'rgba(0, 0, 0, 0.08)',
          T10: 'rgba(0, 0, 0, 0.1)',
          T12: 'rgba(0, 0, 0, 0.12)',
          T16: 'rgba(0, 0, 0, 0.16)',
          T20: 'rgba(0, 0, 0, 0.2)',
          T30: 'rgba(0, 0, 0, 0.3)',
          T40: 'rgba(0, 0, 0, 0.4)',
          T50: 'rgba(0, 0, 0, 0.5)',
          T60: 'rgba(0, 0, 0, 0.6)',
          T70: 'rgba(0, 0, 0, 0.7)',
          T80: 'rgba(0, 0, 0, 0.8)',
          T90: 'rgba(0, 0, 0, 0.9)',
        },
        yellow: {
          light: '#FEE4AE',
        },
        orange: {
          light: '#FFEFD0',
          pastel: '#FED88A',
          DEFAULT: '#FFA437',
        },
        green: {
          light: '#D5EDDC',
          DEFAULT: '#40AC74',
        },
        red: {
          light: '#FAD0D5',
          DEFAULT: '#FF3737',
        },
      },
      spacing: {
        4: '4px',
        5: '5px',
        8: '8px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        22: '22px',
        24: '24px',
        28: '28px',
        30: '30px',
        32: '32px',
        40: '40px',
        46: '46px',
        48: '48px',
        60: '60px',
      },
      gridTemplateColumns: {
        toggle: '38px 1fr 51px',
        rates: '1fr 64px',
        schedule: '60px 68px 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
