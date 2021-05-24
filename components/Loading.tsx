import { Spinner, Center } from '@chakra-ui/react'

export const Loading = () => {
  return (
    <Center w='100%' h='100%' >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Center>
  )
}
