import { useRef } from 'react'
import { VStack, Input, Button, Spinner, Avatar, Text } from '@chakra-ui/react'
import { User } from '.prisma/client'
import { useUploadProfileImage } from '../hooks/useUploadProfileImage'

type Props = {
  user: User
}

export const ProfileImageEditable = ({ user }: Props) => {
  const { handleUpload, loading, error } = useUploadProfileImage(user)
  const uploadInput = useRef(null)

  const handleClick = () => {
    uploadInput.current.click()
  }

  return (
    <>
      <VStack>
          {loading ? <Spinner /> : <Avatar src={`/assets/users/${user.username}.jpg?${new Date().getTime()}`} size='2xl'/>}
          <Input accept="image/x-png,image/gif,image/jpg" onChange={handleUpload} ref={uploadInput} hidden type='file' name='file'/>
          <Button onClick={handleClick}>Seleccionar imagen</Button>
          <Text color='red.500'>{error}</Text>
        </VStack>
    </>
  )
}
