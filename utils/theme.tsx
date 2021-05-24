import { extendTheme, withDefaultProps } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: '\'Menlo\', monospace', body: 'Mulish, sans-serif', header: 'Prompt, sans-serif' }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
})

const theme = extendTheme({
  colors: {
    black: '#16161D'
  },
  fonts,
  breakpoints,
  styles: {
    global: {
      'body, html': {
        margin: 0,
        padding: 0,
        minHeight: '100vh'
      },
      '.remark-highlight': {
        backgroundColor: '#16161D !important',
        margin: '20px 0',
        border: '1px solid #16161D',
        borderRadius: '20px !important'
      },
      'pre, code': {
        backgroundColor: 'inherit !important',
        fontFamily: '\'Menlo\', monospace !important',
        fontWeight: 'bold !important'
      },
      'p code': {
        fontFamily: '\'Menlo\', monospace',
        fontWeight: 'bold',
        wordSpacing: '1px'
      },
      p: {
        margin: '1em 0'
      },
      '.principal-container': {
        width: '60vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      iframe: {
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%'
      },
      '.remark-oembed-you-tube': {
        position: 'relative !important',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '56.25% !important',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center'
      },
      '.remark-oembed-inline': {
        position: 'relative !important',
        overflow: 'hidden',
        borderRadius: '20px',
        border: '1px solid #16161D',
        objectFit: 'cover',
        width: '100%',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center'
      },
      img: {
        objectFit: 'cover'
      }
    }
  }
},
withDefaultProps({
  defaultProps: {
    size: 'lg',
    color: 'red.500'
  },
  components: ['h2', 'h1']
})
)

export default theme
