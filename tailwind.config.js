/** @type {{}|{}} */
const config = require('./icons-read');
const icons = config.icons;
console.log(icons)
const values = {
  '0': '0',  // 0px
  '1': '0.0625rem',  // 1px
  '2': '0.125rem',  // 2px
  '4': '0.125rem',  // 4px
  '6': '0.375rem',  // 6px
  '8': '0.5rem',    // 8px
  '10': '0.625rem', // 10px
  '12': '0.75rem',  // 12px
  '14': '0.875rem', // 14px
  '16': '1rem',     // 16px
  '18': '1.125rem', // 18px
  '20': '1.25rem',  // 20px
  '22': '1.375rem',  // 22px
  '24': '1.5rem',   // 24px
  '28': '1.75rem',   // 28px
  '30': '1.875rem', // 30px
  '32': '2rem',     // 32px
  '40': '2.5rem',   // 40px
  '44': '2.75rem',  // 44px
  '48': '3rem',     // 48px
  '50': '3.125rem', // 50px
  '52': '3.25rem',  // 52px
  '60': '3.75rem',  // 60px
  '64': '4rem',     // 64px
  '80': '5rem',     // 80px
  '96': '6rem',     // 96px
  '112': '7rem',    // 112px
  '128': '8rem',    // 128px
  '160': '10rem',   // 160px
  '210': '13.125rem', // 210px
  '240': '15rem', // 240px
  '256': '16rem', // 256px
  '300': '18.75rem', // 300px
  '350': '21.875rem', // 350px
  '400': '25rem', // 400px
  '800': '50rem', // 800px
};

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primary: {
        50: 'var(--primary-50)',
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)', // Primary color
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
        A100: 'var(--primary-A100)',
        A200: 'var(--primary-A200)',
        A400: 'var(--primary-A400)',
        A700: 'var(--primary-A700)',
      },
      accent: {
        50: 'var(--accent-50)',
        100: 'var(--accent-100)',
        200: 'var(--accent-200)',
        300: 'var(--accent-300)',
        400: 'var(--accent-400)',
        500: 'var(--accent-500)', // Accent color
        600: 'var(--accent-600)',
        700: 'var(--accent-700)',
        800: 'var(--accent-800)',
        900: 'var(--accent-900)',
        A100: 'var(--accent-A100)',
        A200: 'var(--accent-A200)',
        A400: 'var(--accent-A400)',
        A700: 'var(--accent-A700)',
      },
      warn: {
        50: 'var(--warn-50)',
        100: 'var(--warn-100)',
        200: 'var(--warn-200)',
        300: 'var(--warn-300)',
        400: 'var(--warn-400)',
        500: 'var(--warn-500)', // Warning color
        600: 'var(--warn-600)',
        700: 'var(--warn-700)',
        800: 'var(--warn-800)',
        900: 'var(--warn-900)',
        A100: 'var(--warn-A100)',
        A200: 'var(--warn-A200)',
        A400: 'var(--warn-A400)',
        A700: 'var(--warn-A700)',
      },
      'primary-contrast': {
        50: 'var(--primary-contrast-50)',
        100: 'var(--primary-contrast-100)',
        200: 'var(--primary-contrast-200)',
        300: 'var(--primary-contrast-300)',
        400: 'var(--primary-contrast-400)',
        500: 'var(--primary-contrast-500)',
        600: 'var(--primary-contrast-600)',
        700: 'var(--primary-contrast-700)',
        800: 'var(--primary-contrast-800)',
        900: 'var(--primary-contrast-900)',
        A100: 'var(--primary-contrast-A100)',
        A200: 'var(--primary-contrast-A200)',
        A400: 'var(--primary-contrast-A400)',
        A700: 'var(--primary-contrast-A700)',
      },
      'accent-contrast': {
        50: 'var(--accent-contrast-50)',
        100: 'var(--accent-contrast-100)',
        200: 'var(--accent-contrast-200)',
        300: 'var(--accent-contrast-300)',
        400: 'var(--accent-contrast-400)',
        500: 'var(--accent-contrast-500)',
        600: 'var(--accent-contrast-600)',
        700: 'var(--accent-contrast-700)',
        800: 'var(--accent-contrast-800)',
        900: 'var(--accent-contrast-900)',
        A100: 'var(--accent-contrast-A100)',
        A200: 'var(--accent-contrast-A200)',
        A400: 'var(--accent-contrast-A400)',
        A700: 'var(--accent-contrast-A700)',
      },
      'warn-contrast': {
        50: 'var(--warn-contrast-50)',
        100: 'var(--warn-contrast-100)',
        200: 'var(--warn-contrast-200)',
        300: 'var(--warn-contrast-300)',
        400: 'var(--warn-contrast-400)',
        500: 'var(--warn-contrast-500)',
        600: 'var(--warn-contrast-600)',
        700: 'var(--warn-contrast-700)',
        800: 'var(--warn-contrast-800)',
        900: 'var(--warn-contrast-900)',
        A100: 'var(--warn-contrast-A100)',
        A200: 'var(--warn-contrast-A200)',
        A400: 'var(--warn-contrast-A400)',
        A700: 'var(--warn-contrast-A700)',
      },
    },
    spacing: values,
    fontSize: values,
    borderRadius: values,
    backgroundImage: {
      'test': "url('https://icons-for-free.com/iff/png/512/case+job+work+icon-1320185594726714045.png')",
      ...icons
    },
    background: {
      'gradient': 'linear-gradient(45deg, #121212, #555555)'
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '60%': '60% !important',
      '70%': '70% !important',
      '120%': '120% !important',
      ...values
    },
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
      ...values
    },
    boxShadow: {
      'custom': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'
    },
    screens: {
      'xs': '475px',    // Custom breakpoint for extra small screens
      'sm': '640px',    // Default small screen (can be modified)
      'md': '769px',    // Default medium screen
      'lg': '1025px',   // Default large screen
      'xl': '1280px',   // Default extra-large screen
      '2xl': '1536px',  // Default 2xl screen
      '3xl': '1920px',  // Custom breakpoint for larger screens
      '4xl': '2560px',  // Custom breakpoint for very large screens
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        '.custom-bg-cover': {
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        },
        '.custom-bg-contain': {
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
