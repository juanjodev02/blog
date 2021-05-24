import { useColorMode, IconButton, Tooltip } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Tooltip hasArrow placement="bottom" label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <IconButton aria-label='Toggle theme' size="lg" variant='unstyled' onClick={toggleColorMode} icon={isDark ? <MoonIcon /> : <SunIcon />} />
    </Tooltip>
  )
}
