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
  '450': '28.125rem', // 450px
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
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)',
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
      },
      secondary: {
        100: 'var(--secondary-100)',
        200: 'var(--secondary-200)',
        300: 'var(--secondary-300)',
        400: 'var(--secondary-400)',
        500: 'var(--secondary-500)',
        600: 'var(--secondary-600)',
        700: 'var(--secondary-700)',
        800: 'var(--secondary-800)',
        900: 'var(--secondary-900)',
      },
      success: {
        100: 'var(--success-100)',
        200: 'var(--success-200)',
        300: 'var(--success-300)',
        400: 'var(--success-400)',
        500: 'var(--success-500)',
        600: 'var(--success-600)',
        700: 'var(--success-700)',
        800: 'var(--success-800)',
        900: 'var(--success-900)',
      },
      warning: {
        100: 'var(--warning-100)',
        200: 'var(--warning-200)',
        300: 'var(--warning-300)',
        400: 'var(--warning-400)',
        500: 'var(--warning-500)',
        600: 'var(--warning-600)',
        700: 'var(--warning-700)',
        800: 'var(--warning-800)',
        900: 'var(--warning-900)',
      },
      error: {
        100: 'var(--error-100)',
        200: 'var(--error-200)',
        300: 'var(--error-300)',
        400: 'var(--error-400)',
        500: 'var(--error-500)',
        600: 'var(--error-600)',
        700: 'var(--error-700)',
        800: 'var(--error-800)',
        900: 'var(--error-900)',
      },
      blue: {
        100: 'var(--blue-100)',
        200: 'var(--blue-200)',
        300: 'var(--blue-300)',
        400: 'var(--blue-400)',
        500: 'var(--blue-500)',
        600: 'var(--blue-600)',
        700: 'var(--blue-700)',
        800: 'var(--blue-800)',
        900: 'var(--blue-900)',
      }

    }
    ,
    spacing: values,
    fontSize: values,
    borderRadius: values,
    backgroundImage: {
      'crew': "url('/assets/images/img.png')",
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
        },
        '.gradient1': {
          background: 'linear-gradient(to right, #abbaab, #ffffff)'
        },
        '.text-shadow': {
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
