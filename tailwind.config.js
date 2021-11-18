module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        loadtransition: {
          '0%': {opacity: 0},
          '100%': {opacity: 100},
        },
      },
      animation: {
        loadtransition : 'loadtransition 1s ease-in-out',
      },  
      backgroundImage: {
        'bg': "linear-gradient( 360deg, #ffd89b , #19547b  );",
        'svg': "url('~/img/test.svg')",
      },
      colors: {
        glass: {
          DEFAULT: '#21242d'
        }
      },
    },   
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
