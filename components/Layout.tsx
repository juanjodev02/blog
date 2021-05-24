import { ReactNode } from 'react'
import { Container } from './Container'
import { NavBar } from './NavBar'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <Container width='100%' height='100vh' m='0' p='0' boxSizing='border-box'>
      <NavBar />
      <div className='principal-container'>
        {children}
      </div>
    </Container>
  )
}
