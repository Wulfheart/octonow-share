const {
  colors
} = require('./src/assets/styles/colors')
module.exports = {
  theme: {
    colors: colors,
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'screen': '100vh'
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    // gradients: colors => ({
    //   // Array definition (defaults to linear gradients).
    //   'topaz': ['30deg', colors['wi-accent-yellow']['500'], colors['wi-accent-red']['300']],
    //   'green': ['30deg', colors['wi-accent-green']['500'], themecolors['wi-accent-teal']['500']],
    //   'red': ['30deg', colors['wi-accent-yellow']['700'], colors['wi-accent-red']['900']],

    // }),
    extend: {
      colors: {
        primary: {
          'main': colors["wi-accent-teal"]["500"],
          'hover': colors["wi-accent-teal"]["900"],
          'disabled': colors["wi-accent-teal"]["100"]
        },
        success: {
          'main': colors["wi-accent-green"]["500"],
          'hover': colors["wi-accent-green"]["900"],
          'disabled': colors["wi-accent-green"]["100"]
        },
        warning: {
          'main': colors["wi-accent-yellow"]["500"],
          'hover': colors["wi-accent-yellow"]["700"],
          'disabled': colors["wi-accent-yellow"]["100"],
        },
        danger: {
          'main': colors["wi-accent-red"]["500"],
          'hover': colors["wi-accent-red"]["900"],
          'disabled': colors["wi-accent-red"]["100"],
        },
        info: {
          'main': colors["wi-sand"]["700"],
          'hover': colors["wi-sand"]["900"],
          'disabled': colors["wi-sand"]["100"],
        },
        default: {
          'main': colors["wi-stone"]["300"],
          'hover': colors["wi-stone"]["100"]
        }


      },
      inset: {
        'full': '100%',
        '1/10': '10%'
      },
      opacity: {
        '10': '0.1',
        '90': '0.9',
      },
    },
  },
  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive', 'group-hover', 'hover'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    fontSize: ['responsive'],
    fontStyle: ['responsive'],
    textTransform: ['responsive'],
    textDecoration: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive', 'hover', 'group-hover'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
    gradients: ['responsive', 'hover'],
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('tailwindcss-plugins/gradients'),
  ],
}