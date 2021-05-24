import { Flex, Box, Stack, Button, Spacer, Heading, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

import { DarkModeSwitch } from '../components/DarkModeSwitch'

type NavBarLink = {
  name: string,
  ref: string
}

const navBarLinks: NavBarLink[] = [
  {
    name: 'Home',
    ref: '/'
  },
  {
    name: 'About',
    ref: '/about'
  },
  {
    name: 'Posts',
    ref: '/posts'
  }
]

const NavBarOptions = () => {
  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {navBarLinks.map((navBarLink: NavBarLink) => (
        <Link href={navBarLink.ref} key={navBarLink.name}>
          <Button variant="ghost" key={navBarLink.name}>{navBarLink.name}</Button>
        </Link>
      ))}
      <DarkModeSwitch />
    </Stack>
  )
}

export const NavBar = () => {
  const bg = useColorModeValue('#FFFFFF', 'black')
  const color = useColorModeValue('#1B202B', '#FFFFFF')
  return (
    <Flex shadow='sm' justifyContent='space-between' width='100%' padding='.3em 15vw' position='sticky' top='0' left='0' right='0' background={bg} color={color}>
      <Box p="2">
        <Heading size='lg'>Club de Software EPN</Heading>
      </Box>
      <Spacer />
      <Box>
        <NavBarOptions />
      </Box>
    </Flex>
  )
}
