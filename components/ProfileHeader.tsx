import { Author, User } from '.prisma/client'
import { Avatar, HStack, Text, VStack } from '@chakra-ui/react'

type Props = {
  user: User,
  author: Author
}

const ProfileHeader = ({ user, author }: Props) => {
  return (
    <HStack spacing='30'>
      <Avatar src={`/assets/users/${user.username}.jpg?${new Date().getTime()}`} size='2xl'/>
      <VStack alignItems='flex-start'>
        <Text m='0' fontSize='4xl'>{`${author.name} ${author.lastName}`}</Text>
        <Text m='0' fontSize='xl'>{`@${user.username}`}</Text>
      </VStack>
    </HStack>
  )
}

export default ProfileHeader
