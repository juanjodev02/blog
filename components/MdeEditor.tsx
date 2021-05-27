import { Box } from '@chakra-ui/layout'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'

type Props = {
  value: string
  setValue: any
}

const MdeEditor = ({ value, setValue }: Props) => {
  return (
    <Box w='50%' h='100%'>
      <ReactMde
        value={value}
        onChange={setValue}
        disablePreview={true}
      />
    </Box>
  )
}

export default MdeEditor
