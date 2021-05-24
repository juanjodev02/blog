import { useState } from 'react'
import { HStack, VStack, Box, Avatar, Text, Icon } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { AiFillLike, AiOutlineShareAlt } from 'react-icons/ai'

type Props = {
  avatarSrc: string,
  name: string,
  lastName: string
}

export const AuthorCard = ({ avatarSrc, name, lastName }: Props) => {
  const [like, setLike] = useState(false)

  return (
    <HStack position='fixed' left='2em' bottom='2em'>
      <VStack spacing='3' alignItems='center' p='1em'>
        <HStack>
          <Avatar size='md' name={`${name} ${lastName}`} src={avatarSrc} />
          <Box>
            <Text m='0' fontSize='m'>{`${name} ${lastName}`}</Text>
            <Text as='em' fontSize='sm'>Autor</Text>
          </Box>
        </HStack>
        <HStack spacing='5'>
          <HStack>
            <ViewIcon />
            <Text fontSize='sm'>{1}</Text>
          </HStack>
          <HStack cursor='pointer' onClick={() => setLike(!like)}>
            {like ? <Icon as={AiFillLike} color='teal.300'/> : <Icon as={AiFillLike} />}
            <Text fontSize='sm'>{1}</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineShareAlt} />
          </HStack>
        </HStack>
      </VStack>
      <Box bg='teal.300' w='1px' h='85px'/>
    </HStack>
  )
}
