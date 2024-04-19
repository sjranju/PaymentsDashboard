/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      animation: {
        'animateNewPayment': 'animateNewPayment 0.3s ease-in-out',
        'animateNewPaymentWithBg': 'animateNewPaymentWithBgColor 5s ease-in-out'
      },
      keyframes: theme => ({
        'animateNewPayment': {
          '0%': { transform: 'translateY(-4%)' },
          '100%': { transform: 'translateY(0%)' }
        },
        'animateNewPaymentWithBgColor': {
          '0%': { backgroundColor: theme('colors.blue.300') },
          '60%': { backgroundColor: theme('colors.blue.200') },
          '80%': { backgroundColor: theme('colors.blue.100') },
          '100%': { backgroundColor: theme('colors.blue.50') },
        }
      })
    },
  },
  plugins: [],
}

